import type { ClassId } from "@/data/types";
import { classById } from "@/data/classes";
import { getMilestone, type Profile } from "./engine";

export type Answer = "yes" | "no" | "unknown";
export type Assessment = {
  gs: number;
  tier: "Quest" | "Unique" | "Heroic";
  enhance: number | null;
  emptySlots: number | null;
  skillLevel: number | null;
  arcana: number | null;
  genus: number | null;
  story: Answer;
  binding: Answer;
  stigma: Answer;
  accuracy: Answer;
  goal: "damage" | "gear" | "survival";
  budget: "save" | "balanced";
  minutes: 15 | 30 | 60;
  updatedAt: string;
};
export const blankAssessment: Assessment = {
  gs: 0,
  tier: "Quest",
  enhance: null,
  emptySlots: null,
  skillLevel: null,
  arcana: null,
  genus: null,
  story: "unknown",
  binding: "unknown",
  stigma: "unknown",
  accuracy: "unknown",
  goal: "damage",
  budget: "save",
  minutes: 30,
  updatedAt: "",
};
export function sanitizeAssessment(raw: unknown): Assessment | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.gs !== "number" || !Number.isFinite(r.gs) || r.gs <= 0)
    return null;
  const n = (key: string, max: number, min = 0) =>
    typeof r[key] === "number" && Number.isFinite(r[key])
      ? Math.max(min, Math.min(max, Math.floor(r[key] as number)))
      : null;
  const answer = (key: string): Answer =>
    r[key] === "yes" || r[key] === "no" ? r[key] : "unknown";
  return {
    gs: Math.min(20000, Math.floor(r.gs)),
    tier: r.tier === "Heroic" || r.tier === "Unique" ? r.tier : "Quest",
    enhance: n("enhance", 25),
    emptySlots: n("emptySlots", 18),
    skillLevel: n("skillLevel", 30),
    arcana: n("arcana", 5),
    genus: n("genus", 10, 1),
    story: answer("story"),
    binding: answer("binding"),
    stigma: answer("stigma"),
    accuracy: answer("accuracy"),
    goal: r.goal === "gear" || r.goal === "survival" ? r.goal : "damage",
    budget: r.budget === "balanced" ? "balanced" : "save",
    minutes: r.minutes === 15 || r.minutes === 60 ? r.minutes : 30,
    updatedAt:
      typeof r.updatedAt === "string" && !Number.isNaN(Date.parse(r.updatedAt))
        ? r.updatedAt
        : "",
  };
}
export function assessmentProfile(
  a: Assessment,
  previous: Profile,
  c: ClassId,
): Profile {
  return {
    ...previous,
    gs: a.gs,
    tier: a.tier,
    enhance: a.enhance ?? previous.enhance,
    arcana: a.arcana ?? previous.arcana,
    genus: a.genus ?? previous.genus,
    story: a.story === "yes",
    coreSkill:
      a.skillLevel !== null &&
      a.skillLevel >= (classById[c].skills[0].target ?? 16),
    accuracy: a.accuracy === "yes",
  };
}
export type Finding = {
  id: string;
  area: string;
  status: "gap" | "check" | "ready" | "later";
  title: string;
  why: string;
  action: string;
  href: string;
  sources: string[];
  priority: number;
};
export function analyzeCharacter(a: Assessment, c: ClassId) {
  const skill = classById[c].skills[0];
  const target = skill.target ?? 16;
  const f: Finding[] = [];
  const add = (
    id: string,
    area: string,
    status: Finding["status"],
    title: string,
    why: string,
    action: string,
    href: string,
    sources: string[],
    priority: number,
  ) =>
    f.push({ id, area, status, title, why, action, href, sources, priority });
  add(
    "story",
    "Temel gelişim",
    a.story === "unknown" ? "check" : a.story === "no" ? "gap" : "ready",
    a.story === "yes"
      ? "Hikâye temelin tamam"
      : "45. seviye hikâye durumunu tamamla",
    a.story === "unknown"
      ? "Hikâye durumunu henüz bilmiyoruz. Görev günlüğünü kontrol et."
      : "Hikâye ödülleri ve açılımlar sonraki gelişimin temelini oluşturur.",
    "Hikâye ve açılımlara bak",
    "/progression/",
    ["kanon", "roadmap"],
    0,
  );
  add(
    "equipment",
    "Ekipman",
    a.emptySlots === null || a.enhance === null
      ? "check"
      : a.emptySlots > 0 || a.enhance < 10
        ? "gap"
        : "ready",
    a.emptySlots !== null && a.emptySlots > 0
      ? `${a.emptySlots} boş ekipman yuvan var`
      : a.enhance !== null && a.enhance < 10
        ? `Silahın +${a.enhance}: ekonomik geliştirmeleri incele`
        : "Ekipman temelini kontrol et",
    `${a.emptySlots === null ? "Boş ekipman yuvaları belirtilmedi." : `${a.emptySlots} boş yuva bildirdin.`} ${a.enhance === null ? "Silah geliştirmesi belirtilmedi." : `Silahın +${a.enhance}.`} Pahalı denemelerden önce boşlukları ve yakında değişecek parçaları değerlendir.`,
    "Ekipmanını incele",
    "/soul-binding/",
    ["kanon"],
    a.emptySlots !== null && a.emptySlots > 0 ? 1 : a.goal === "gear" ? 2 : 5,
  );
  // A known gap remains a gap even if another equipment detail is unknown.
  if (
    (a.emptySlots !== null && a.emptySlots > 0) ||
    (a.enhance !== null && a.enhance < 10)
  )
    f[f.length - 1].status = "gap";
  add(
    "skill",
    "Temel beceri",
    a.skillLevel === null ? "check" : a.skillLevel < target ? "gap" : "ready",
    a.skillLevel === null
      ? `${skill.name} seviyeni kontrol et`
      : a.skillLevel < target
        ? `${skill.name}: ${a.skillLevel} → ${target}`
        : `${skill.name} ilk eşiğe ulaştı`,
    a.skillLevel === null
      ? `İlk rehber hedefi ${target}. seviye. Mevcut seviyeni girdiğinde farkı göstereceğiz.`
      : skill.why,
    "Beceri önceliklerini aç",
    `/classes/${c}/`,
    [`class-${c}`],
    a.goal === "damage" ? 2 : 4,
  );
  add(
    "arcana",
    "Arcana",
    a.gs < 1600
      ? "later"
      : a.arcana === null
        ? "check"
        : a.arcana < 5
          ? "gap"
          : "ready",
    a.gs < 1600
      ? "Arcana farmını sonraya planla"
      : a.arcana === null
        ? "Dolu Arcana yuvalarını say"
        : a.arcana < 5
          ? `${5 - a.arcana} boş Arcana yuvasını doldur`
          : "Beş Arcana yuvan dolu",
    a.gs < 1600
      ? "Mevcut yol haritasında Transcendence başlangıcı 1600. Önce mevcut aşamanın gelişimine odaklan."
      : "Dolu yuva sayısı kart kalitesini kanıtlamaz. Sınıfının temel becerilerini taşıyan satırları ayrıca kontrol et.",
    "Arcana planını aç",
    "/arcana/",
    ["arcana", "roadmap"],
    a.goal === "gear" ? 2 : 3,
  );
  add(
    "binding",
    "Soul Binding",
    a.binding === "unknown" ? "check" : a.binding === "no" ? "gap" : "ready",
    a.binding === "yes"
      ? "Bağlama satırların kontrol edilmiş"
      : "Ekipmandaki yararlı satırları ayır",
    "Her yuvanın havuzu farklı. Önce mevcut satırlarını incele; işe yarayan satırı korumak kaynak tasarrufu sağlar.",
    "Koru / yenile danışmanını aç",
    "/soul-binding/",
    ["kanon"],
    6,
  );
  add(
    "genus",
    "Genus Insight",
    a.genus === null ? "check" : a.genus < 9 ? "gap" : "ready",
    a.genus === null
      ? "Genus tablo seviyelerini kontrol et"
      : a.genus < 9
        ? `En düşük Genus tablon ${a.genus}. seviyede`
        : "Genus yuva açılımların ilerlemiş",
    "Önce düşük maliyetle yuvaları aç. Çok sayıda satırı erken kilitlemek kaynak tüketimini artırabilir.",
    "Genus gelişimini planla",
    "/genus/",
    ["kanon", "genus-advice"],
    7,
  );
  add(
    "stigma",
    "Stigma",
    a.stigma === "unknown" ? "check" : a.stigma === "no" ? "gap" : "ready",
    a.stigma === "yes"
      ? "Stigma önceliklerin kontrol edilmiş"
      : "Sınıfının Stigma önceliklerini gözden geçir",
    "Ana aktif becerinin ardından sınıf rehberindeki Stigma hedeflerini ve kaynaklarını karşılaştır.",
    "Sınıf rehberini aç",
    `/classes/${c}/`,
    [`class-${c}`],
    a.goal === "damage" ? 5 : 8,
  );
  add(
    "accuracy",
    "Karşılaşma hazırlığı",
    a.accuracy === "unknown" ? "check" : a.accuracy === "no" ? "gap" : "ready",
    a.accuracy === "yes"
      ? "Hedef karşılaşmada isabeti kontrol ettin"
      : "Hedef boss üzerinde isabetini kontrol et",
    a.goal === "survival"
      ? "Kaçan saldırıları, mekanikleri ve savunma ihtiyacını birlikte değerlendir. Sadece GS artırmak karşılaşmayı çözmeyebilir."
      : "Evrensel bir isabet sınırı varsaymıyoruz. Kaçan veya engellenen saldırıları hedef karşılaşmada gözlemle.",
    "Karşılaşma önerilerine bak",
    `/classes/${c}/`,
    ["kanon", `class-${c}`],
    a.goal === "survival" ? 2 : 9,
  );
  const ordered = [...f].sort((x, y) => x.priority - y.priority);
  const gaps = ordered.filter((x) => x.status === "gap"),
    checks = ordered.filter((x) => x.status === "check");
  return {
    findings: f,
    gaps,
    checks,
    ready: f.filter((x) => x.status === "ready"),
    next: [...gaps, ...checks],
    milestone: getMilestone(a.gs),
    sessionCount: a.minutes === 15 ? 1 : a.minutes === 30 ? 2 : 3,
  };
}
