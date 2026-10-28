"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Crosshair,
  Gem,
  Layers,
  Orbit,
  Pencil,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { classById } from "@/data/classes";
import { analyzeCharacter } from "@/lib/assessment";
import { useGuideStore } from "./store";
import { ClassIcon, Evidence } from "./common";

const statusLabels = {
  gap: "Geliştir",
  check: "Kontrol et",
  ready: "Şimdilik yeterli",
  later: "Sonraki aşama",
};
const goals = {
  damage: "Hasarını artır",
  gear: "Yeni içeriğe eriş",
  survival: "İçeriği rahat bitir",
};
export function Overview() {
  const { state, openAssessment } = useGuideStore();
  const c = classById[state.classId];
  const a = state.assessments[state.classId];
  const result = a ? analyzeCharacter(a, state.classId) : null;
  const first = result?.next[0];
  return (
    <div className="coach-dashboard">
      <div className="coach-page-heading">
        <div>
          <span className="coach-kicker">KİŞİSEL GELİŞİM MERKEZİN</span>
          <h1>
            Bir sonraki adımın <span>net olsun.</span>
          </h1>
          <p>
            {a
              ? "Mevcut durumuna göre önceliklerin. Her yükseltmenin bir nedeni var."
              : "Karakterini değerlendir, kaynaklarını doğru gelişime ayır."}
          </p>
        </div>
        <button className="button coach-edit" onClick={openAssessment}>
          <Pencil size={16} />
          {a ? "Durumumu güncelle" : "Karakterimi değerlendir"}
        </button>
      </div>
      {!a || !result ? (
        <section className="coach-welcome">
          <div className="coach-orbit" aria-hidden="true">
            <Crosshair size={88} strokeWidth={1} />
            <span>
              <Zap size={20} />
            </span>
          </div>
          <span className="coach-kicker">ÖNCE SENİ TANIYALIM</span>
          <h2>{c.name} için yolunu çizelim.</h2>
          <p>
            Sınıfını seçmek başlangıç. GS, ekipman ve beceri durumunu gir;
            geliştirilmesi gereken alanları ve ilk adımını görelim.
          </p>
          <button className="button primary" onClick={openAssessment}>
            Gelişim analizini başlat <ArrowRight size={18} />
          </button>
          <small>
            Yaklaşık 2 dakika · Hesap gerekmez · Bilmediklerini boş bırak
          </small>
        </section>
      ) : (
        <>
          <section className="coach-profile-strip">
            <div className="coach-avatar">
              <ClassIcon id={c.id} size={27} />
            </div>
            <div>
              <strong>{c.name}</strong>
              <span>{goals[a.goal]}</span>
            </div>
            <div className="profile-stat">
              <small>EŞYA SEVİYESİ</small>
              <strong>
                {a.gs.toLocaleString("tr-TR")} <span>GS</span>
              </strong>
            </div>
            <div className="profile-stat">
              <small>SONRAKİ EŞİK</small>
              <strong>
                {result.milestone.max?.toLocaleString("tr-TR") ?? "İnce ayar"}
              </strong>
            </div>
            <div className="profile-timestamp">
              <span className="status-dot" />
              {a.updatedAt
                ? `Son kayıt: ${new Date(a.updatedAt).toLocaleDateString("tr-TR")}`
                : "Kayıtlı değerlendirme"}
            </div>
          </section>
          <div className="coach-primary-grid">
            <section className="coach-focus">
              <div className="coach-focus-top">
                <span className="coach-kicker">
                  <Sparkles size={14} />{" "}
                  {result.gaps.length
                    ? "İLK ODAĞIN"
                    : result.checks.length
                      ? "ÖNCE NETLEŞTİRELİM"
                      : "TEMEL KONTROLLER TAMAM"}
                </span>
                <span className="coach-priority">
                  {first ? "01 / ÖNCELİK" : "İYİ GİDİYORSUN"}
                </span>
              </div>
              <h2>{first?.title || "Şimdi ince ayar zamanı."}</h2>
              <p>
                {first?.why ||
                  "Bildirdiğin temel alanlarda açık görünmüyor. Kart satırlarını, karşılaşmaya uygun beceri seçimlerini ve güncel içerik koşullarını gözden geçir."}
              </p>
              <div className="coach-focus-bottom">
                <Link
                  className="button primary"
                  href={first?.href || `/classes/${c.id}/`}
                >
                  {first?.action || "Sınıf yapını gözden geçir"}
                  <ArrowRight size={18} />
                </Link>
                <span>
                  {first?.status === "check"
                    ? "Bilgi eksik · Henüz sorun sayılmadı"
                    : "Bildirdiğin duruma göre"}
                </span>
              </div>
              <Evidence ids={first?.sources || [`class-${c.id}`]} />
            </section>
            <aside className="coach-health">
              <span className="coach-kicker">GELİŞİM ÖZETİN</span>
              <div className="health-total">
                <strong>{result.gaps.length}</strong>
                <div>
                  <b>gelişim alanı</b>
                  <span>8 temel kontrol içinde</span>
                </div>
              </div>
              <div className="health-bars" aria-hidden="true">
                {result.findings.map((f) => (
                  <i key={f.id} className={f.status} />
                ))}
              </div>
              <div className="health-legend">
                <span>
                  <i className="gap" />
                  {result.gaps.length} geliştir
                </span>
                <span>
                  <i className="check" />
                  {result.checks.length} kontrol et
                </span>
                <span>
                  <i className="ready" />
                  {result.ready.length} yeterli
                </span>
                {result.findings.some((f) => f.status === "later") && (
                  <span>
                    <i className="later" />
                    Sonraya bırak
                  </span>
                )}
              </div>
              <p>Bu bir güç puanı değil. Bildirdiğin durumun kontrol özeti.</p>
            </aside>
          </div>
          <div className="coach-section-title">
            <div>
              <span className="coach-kicker">AZ AMA DOĞRU İŞ</span>
              <h2>Bugünkü planın</h2>
            </div>
            <span className="coach-time">
              <Clock3 size={15} />
              {a.minutes === 60 ? "60+" : a.minutes} dk ayırıyorsun
            </span>
          </div>
          <div className="coach-session-list">
            {result.next.length ? (
              result.next.slice(0, result.sessionCount).map((f, i) => (
                <article key={f.id} className="coach-task">
                  <span className="coach-task-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className={`coach-status ${f.status}`}>
                      {statusLabels[f.status]} · {f.area}
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.why}</p>
                  </div>
                  <Link href={f.href} aria-label={f.action}>
                    <ArrowUpRight size={21} />
                  </Link>
                </article>
              ))
            ) : (
              <article className="coach-maintenance">
                <ShieldCheck size={25} />
                <div>
                  <h3>Yeni bir eksik bildirmedin.</h3>
                  <p>
                    Sonraki içerik koşullarını incele ve karakterin değiştikçe
                    değerlendirmeyi güncelle.
                  </p>
                </div>
                <Link href="/progression/" className="text-link">
                  Yol haritası <ArrowRight size={16} />
                </Link>
              </article>
            )}
          </div>
          <div className="coach-resource-note">
            <ShieldCheck size={19} />
            <p>
              <strong>
                {a.budget === "save"
                  ? "Kaynaklarını koruyarak ilerle."
                  : "Kalıcı gelişime yatırım yap."}
              </strong>{" "}
              {a.tier === "Heroic" &&
                "Heroic ekipmanında küçük değişimler için aktarım bütçeni tüketme. "}
              {a.budget === "save"
                ? "Önce mevcut eşya ve kartlarını karşılaştır. Erken kusursuz satır arayışını ertele; harcamadan önce oyun içindeki maliyeti kontrol et."
                : "Yakında değişecek ekipmana yüklenmeden beceri eşiği ve uzun süre kullanacağın parçaları birlikte değerlendir."}{" "}
              Süre tercihin planın kapsamını belirler; bitirme süresi tahmini
              değildir.
            </p>
          </div>
          <div className="coach-section-title">
            <div>
              <span className="coach-kicker">BÜTÜN RESMİ GÖR</span>
              <h2>Hangi alanın ne durumda?</h2>
            </div>
            <button className="text-link" onClick={openAssessment}>
              Bilgileri düzenle <Pencil size={14} />
            </button>
          </div>
          <div className="coach-area-grid">
            {result.findings.map((f) => (
              <article className={`coach-area ${f.status}`} key={f.id}>
                <div>
                  <span className={`coach-status ${f.status}`}>
                    {f.status === "ready" ? (
                      <CheckCircle2 size={14} />
                    ) : f.status === "check" ? (
                      <CircleHelp size={14} />
                    ) : (
                      <TrendingUp size={14} />
                    )}
                    {statusLabels[f.status]}
                  </span>
                  <small>{f.area}</small>
                </div>
                <h3>{f.title}</h3>
                <p>{f.why}</p>
                <Link href={f.href}>
                  {f.action}
                  <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </>
      )}
      <div className="coach-section-title">
        <div>
          <span className="coach-kicker">İHTİYACIN OLDUĞUNDA</span>
          <h2>Gelişim araçların</h2>
        </div>
        <Link className="text-link" href="/guides/">
          Tüm rehberler <ArrowRight size={15} />
        </Link>
      </div>
      <div className="coach-tools">
        {[
          {
            name: "Soul Binding",
            detail: "Hangi satırı korumalısın?",
            href: "/soul-binding/",
            icon: Gem,
          },
          {
            name: "Arcana planlayıcı",
            detail: "Beceri eşiklerini kartlarla tamamla.",
            href: "/arcana/",
            icon: Layers,
          },
          {
            name: "Genus Insight",
            detail: "Yuvalarını ve kaynaklarını planla.",
            href: "/genus/",
            icon: Orbit,
          },
          {
            name: `${c.name} rehberi`,
            detail: "Beceri öncelikleri ve sınıf yapın.",
            href: `/classes/${c.id}/`,
            icon: Zap,
          },
        ].map((t) => (
          <Link href={t.href} key={t.name}>
            <t.icon size={23} />
            <div>
              <strong>{t.name}</strong>
              <small>{t.detail}</small>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>
    </div>
  );
}
