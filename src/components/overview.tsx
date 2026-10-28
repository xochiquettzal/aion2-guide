"use client";
import Link from "next/link";
import {
  ArrowRight,
  Gem,
  Layers,
  Orbit,
  Route,
  ArrowUpRight,
  Compass,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { classes, classById } from "@/data/classes";
import { getMilestone, nextActions } from "@/lib/engine";
import { useGuideStore } from "./store";
import { Badge, ClassIcon, Evidence, SectionTitle } from "./common";
export function Overview() {
  const { state, change } = useGuideStore();
  const c = classById[state.classId];
  const m = getMilestone(state.profile.gs);
  return (
    <>
      <div className="overview-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> GLOBAL SÜRÜM · PVE REHBERİ{" "}
          </div>
          <h1>
            {" "}
            Her geliştirmede <br />
            <em> daha net bir yol. </em>
          </h1>
          <p>
            {" "}
            Yapın, sıradaki beceri eşiğin, Atreia’daki yolculuğun. <br /> Her
            kararın dayanağını gösteren pratik öneriler.{" "}
          </p>
          <Link href={`/classes/${c.id}/`} className="button primary">
            {" "}
            İncele: {c.name} <ArrowRight size={16} />
          </Link>
          <Link className="hero-secondary" href="/progression/">
            {" "}
            İlerlemeni planla <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="hero-seal" aria-hidden="true">
          <div className="seal-ring outer" />
          <div className="seal-ring inner" />
          <Compass size={158} strokeWidth={0.55} />
          <span> BİLGİ GÜÇTÜR </span>
          <i>I · II · III · IV · V</i>
        </div>
        <div className="hero-edition">
          {" "}
          REHBER NOTLARI <b>01</b>
          <span>ATREIA / GLOBAL</span>
        </div>
      </div>
      <div className="update-strip">
        <Badge tone="gold"> YAMA TAKİBİ </Badge>
        <p>
          {" "}
          Hard Expedition eşiği: <strong>2600</strong> · Ariel Daevanion artık
          PvE gelişiminin bir parçası.{" "}
        </p>
        <Link href="/sources/">
          {" "}
          21 Ekim güncellemesi <ArrowUpRight size={14} />
        </Link>
      </div>
      <SectionTitle
        eyebrow="01 / KARAKTERİN"
        title="Sınıfını seç"
        description="Tek seçimle rehberler ve planlayıcılar sınıfına uyarlanır."
        action={<span className="muted tiny"> 8 GLOBAL SINIF </span>}
      />
      <div className="class-grid">
        {classes.map((cl) => (
          <button
            className={`class-tile ${cl.id === state.classId ? "selected" : ""}`}
            style={{ "--class-color": cl.color } as React.CSSProperties}
            key={cl.id}
            onClick={() => change((s) => ({ ...s, classId: cl.id }))}
            aria-pressed={cl.id === state.classId}
          >
            <ClassIcon id={cl.id} size={29} />
            <strong>{cl.name}</strong>
            <small>{cl.weapon}</small>
            {cl.id === state.classId && (
              <CheckCircle2 className="class-check" size={12} />
            )}
          </button>
        ))}
      </div>
      <div className="dashboard-columns">
        <section className="panel current-build">
          <div className="panel-top">
            <span className="eyebrow"> YAPINA GENEL BAKIŞ </span>
            <Badge tone="teal">PVE</Badge>
          </div>
          <div className="build-title">
            <div className="class-emblem" style={{ color: c.color }}>
              <ClassIcon id={c.id} size={35} />
            </div>
            <div>
              <h2>{c.name}</h2>
              <p>{c.role}</p>
            </div>
          </div>
          <p>{c.summary}</p>
          <div className="breakpoint">
            <span> SIRADAKİ BECERİ HEDEFİ </span>
            <strong>
              {c.skills[0].name}
              <b> Sv. {c.skills[0].target}</b>
            </strong>
            <small>{c.skills[0].why}</small>
          </div>
          <Link href={`/classes/${c.id}/`} className="text-link">
            {" "}
            Sınıf rehberini aç <ArrowRight size={16} />
          </Link>
          <Evidence ids={[`class-${c.id}`]} />
        </section>
        <section className="panel next-up">
          <div className="panel-top">
            <span className="eyebrow"> SONRAKİ ADIMINI BELİRLE </span>
            <Route size={17} />
          </div>
          <h2> Neyi geliştirmeliyim? </h2>
          <p> Kaydettiğin ilerleme profiline göre. </p>
          <div className="mini-progress">
            <span>
              {" "}
              EŞYA SEVİYESİ{" "}
              <strong>{state.profile.gs.toLocaleString("tr-TR")}</strong>
            </span>
            <ArrowRight size={18} />
            <span>
              {" "}
              SONRAKİ EŞİK{" "}
              <strong>
                {m.max?.toLocaleString("tr-TR") || "Baskın hazırlığı"}
              </strong>
            </span>
          </div>
          <div className="action-preview">
            {nextActions(state.profile, c.id)
              .slice(0, 2)
              .map((a, i) => (
                <Link key={a.title} href={a.href}>
                  <span className="number">0{i + 1}</span>
                  <div>
                    <strong>{a.title}</strong>
                    <small>{a.impact}</small>
                  </div>
                  <ChevronArrow />
                </Link>
              ))}
          </div>
          <Link href="/progression/" className="text-link">
            {" "}
            Profili düzenle, yol haritasını gör <ArrowRight size={16} />
          </Link>
        </section>
        <section className="panel field-notes">
          <div className="panel-top">
            <span className="eyebrow"> REHBERDEN NOTLAR </span>
            <BookOpen size={17} />
          </div>
          <h2> Kaynaklarını bilinçli kullan. </h2>
          <Link href="/guides/#transfer">
            <span>01</span>
            <div>
              <strong> Aktarımdan önce </strong>
              <small> Hangi satır ve yuvaların kaybolduğunu öğren. </small>
            </div>
            <ArrowUpRight size={15} />
          </Link>
          <Link href="/genus/">
            <span>02</span>
            <div>
              <strong> Önce seviye, sonra ince ayar. </strong>
              <small>
                {" "}
                Genus kilitleri erken denemeleri pahalılaştırabilir.{" "}
              </small>
            </div>
            <ArrowUpRight size={15} />
          </Link>
          <Link href="/sources/">
            <span>03</span>
            <div>
              <strong> Global’in kuralları ayrı </strong>
              <small> Yalnızca KR’de bulunan sistemler yapına eklenmez. </small>
            </div>
            <ArrowUpRight size={15} />
          </Link>
          <div className="source-credit">
            {" "}
            Başlıca referans: <br />
            <strong>Kanon’s Aion 2 Bible</strong>
            <span> ve güncel Global kaynakları </span>
          </div>
        </section>
      </div>
      <SectionTitle
        eyebrow="02 / PLANLAMA ARAÇLARI"
        title="Yapını bilinçli kur"
        action={
          <Link className="text-link" href="/guides/">
            {" "}
            Tüm rehberler <ArrowRight size={14} />
          </Link>
        }
      />
      <div className="tool-grid">
        {[
          {
            name: "Soul Binding danışmanı",
            desc: "Doğru satırları koru. Ne zaman yenileyeceğini bil.",
            href: "/soul-binding/",
            icon: Gem,
            tag: "EKİPMAN",
          },
          {
            name: "Arcana kurulum planlayıcı",
            desc: "Beş kart. Sınıfa özel beceri havuzları.",
            href: "/arcana/",
            icon: Layers,
            tag: "BECERİLER VE SETLER",
          },
          {
            name: "Genus Insight planlayıcı",
            desc: "Beş tablo, dokuz yuva, net öncelikler.",
            href: "/genus/",
            icon: Orbit,
            tag: "EK GÜÇ KAYNAKLARI",
          },
        ].map((t) => (
          <Link href={t.href} className="tool-card" key={t.name}>
            <div className="tool-ornament">
              <t.icon size={30} strokeWidth={1.2} />
            </div>
            <span className="eyebrow">{t.tag}</span>
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
            <ArrowUpRight className="tool-arrow" size={19} />
          </Link>
        ))}
      </div>
    </>
  );
}
function ChevronArrow() {
  return <ArrowUpRight size={15} />;
}
