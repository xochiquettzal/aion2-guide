import pools from "@/data/arcana-pools.json";
import { classById } from "@/data/classes";
import { milestones } from "@/data/progression";
import type { CardType, ClassId, EquipmentSlot } from "@/data/types";
export function getPool(c: ClassId, type: CardType): string[] {
  return type === "chalice" ? Object.values(pools[c]).flat() : pools[c][type];
}
export function suggestedLines(c: ClassId, type: CardType): string[] {
  const pool = getPool(c, type);
  const priorities = classById[c].skills
    .filter((s) => s.kind !== "Stigma")
    .map((s) => s.name);
  return [
    ...priorities.filter((s) => pool.includes(s)),
    ...pool.filter((s) => !priorities.includes(s)),
  ].slice(0, 4);
}
export function validateCard(
  c: ClassId,
  type: CardType,
  lines: string[],
): string | null {
  const chosen = lines.filter(Boolean);
  if (chosen.length > 4)
    return "Unique kartta en fazla dört farklı satır olabilir.";
  if (new Set(chosen).size !== chosen.length)
    return "Bir kartta her beceriyi yalnızca bir kez seç.";
  if (chosen.some((s) => !getPool(c, type).includes(s)))
    return "Bu beceri kartın belgelenmiş sınıf havuzunda bulunmuyor.";
  return null;
}
export function bindingAdvice(
  slot: EquipmentSlot,
  line: string,
  c: ClassId,
  stage: string,
  extra: boolean,
) {
  if (slot.availability || slot.category === "Special")
    return {
      status: "Erişimi kontrol et",
      why:
        slot.note ||
        slot.availability ||
        "Normal Soul Binding havuzu doğrulanmadı.",
    };
  if (!line)
    return {
      status: "Satır seç",
      why: "Değerlendirmek için mevcut bir satır seç.",
    };
  const skill = classById[c].skills.find(
    (s) => s.name === line && s.kind === slot.skills,
  );
  if (skill)
    return {
      status: "Koru",
      why: `${classById[c].name} için yararlı bir ${slot.skills.toLocaleLowerCase("tr-TR")} beceri seviyesi. ${extra ? "Ek Philosopher satırı aktarımda kaybolur; yenileme planı yap." : "Sonraki beceri eşiğinle karşılaştır."}`,
    };
  if (slot.stats.includes(line))
    return {
      status: stage === "Başlangıç" ? "Şimdilik koru" : "Koru",
      why:
        line === "Accuracy" || line === "Precision"
          ? "Yalnızca karşılaşmanın isabet/kritik ihtiyacını desteklediği sürece koru. Evrensel sayısal sınır varsayılmıyor."
          : `${line}, referansın yararlı özellik havuzunda yer alıyor. Sırası nadirlik önceliğini gösterir; DPS sıralaması değildir.${extra ? " Ek satır aktarılmaz." : ""}`,
    };
  return {
    status: "İncele / yenile",
    why:
      stage === "Başlangıç"
        ? "Düşük öncelikli satır bekleyebilir. Ekipman değişecekse kaynaklarını koru."
        : "Bu satır belgelenmiş PvE kısa listesinde yok. Yenilemeden önce oyun havuzunu doğrula ve yeterli savunmayı koru.",
  };
}
export type Profile = {
  gs: number;
  cp: number;
  tier: string;
  enhance: number;
  arcana: number;
  genus: number;
  coreSkill: boolean;
  story: boolean;
  accuracy: boolean;
};
export const defaultProfile: Profile = {
  gs: 1400,
  cp: 0,
  tier: "Unique",
  enhance: 10,
  arcana: 0,
  genus: 1,
  coreSkill: false,
  story: true,
  accuracy: false,
};
export const getMilestone = (gs: number) =>
  milestones.find((m) => gs >= m.min && (m.max === null || gs < m.max)) ||
  milestones[0];
export function nextActions(p: Profile, c: ClassId) {
  const actions: {
    title: string;
    why: string;
    href: string;
    impact: string;
    sources: string[];
  }[] = [];
  if (!p.story)
    actions.push({
      title: "45. seviye hikâyeyi tamamla",
      why: "Eksik ekipmanları al ve gelişimin temelini aç.",
      href: "/progression/",
      impact: "Temel gelişim",
      sources: ["kanon", "roadmap"],
    });
  if (!p.coreSkill)
    actions.push({
      title: `${classById[c].skills[0].name} için ${classById[c].skills[0].target}. seviyeyi hedefle`,
      why: classById[c].skills[0].why,
      href: `/classes/${c}/`,
      impact: "Savaş gücü / performans",
      sources: [`class-${c}`],
    });
  if (p.gs >= 1600 && p.arcana < 5)
    actions.push({
      title: `${5 - p.arcana} boş Arcana yuvasını doldur`,
      why: "Kusursuz satırlardan önce sınıfının temel becerilerini taşıyan kartları seç.",
      href: "/arcana/",
      impact: "Eşya seviyesi + savaş gücü",
      sources: ["arcana"],
    });
  if (p.enhance < 10)
    actions.push({
      title: "Silah ve guard geliştirmesini incele",
      why: "Malzeme harcamadan önce ekonomik geliştirmeleri bir sonraki eşya değişimiyle karşılaştır.",
      href: "/soul-binding/",
      impact: "Eşya seviyesi + savaş gücü",
      sources: ["kanon"],
    });
  if (p.tier === "Heroic")
    actions.push({
      title: "Heroic aktarım bütçeni koru",
      why: "Küçük kazanımlar için tekrar aktarımdan kaçın; yuva ve ek satır kayıpları yenileme bütçesi gerektirir.",
      href: "/guides/",
      impact: "Kaynak verimliliği",
      sources: ["kanon"],
    });
  if (!p.accuracy)
    actions.push({
      title: "Hedef karşılaşma için isabeti kontrol et",
      why: "İsabeti başka hasar statıyla değiştirmeden önce engellenen veya kaçan saldırılara bak.",
      href: "/genus/",
      impact: "Performans",
      sources: ["kanon", "genus-advice"],
    });
  if (p.genus < 9)
    actions.push({
      title: "Çok satır kilitlemeden önce Genus seviyesini artır",
      why: "Ekonomik biçimde 9–10 seviyesine ilerle. Seviyeler yuva açar ve elde edilebilir kaliteleri iyileştirir.",
      href: "/genus/",
      impact: "Yalnızca savaş gücü",
      sources: ["kanon"],
    });
  actions.push({
    title: getMilestone(p.gs).name,
    why: getMilestone(p.gs).steps[0],
    href: "/progression/",
    impact: p.gs >= 2800 ? "Baskın hazırlığı" : "Sonraki eşya seviyesi aralığı",
    sources: getMilestone(p.gs).sources,
  });
  return actions;
}
