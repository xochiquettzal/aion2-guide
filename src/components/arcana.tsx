"use client";
import { useState } from "react";
import {
  Wine,
  Scroll,
  Compass,
  Bell,
  ScanEye,
  RotateCcw,
  Check,
  ArrowRight,
} from "lucide-react";
import { cards } from "@/data/equipment";
import type { CardType } from "@/data/types";
import { getPool, suggestedLines, validateCard } from "@/lib/engine";
import { useGuideStore } from "./store";
import { classById } from "@/data/classes";
import { Badge, Evidence, Notice, PageTitle, SectionTitle } from "./common";
const icons = {
  chalice: Wine,
  parchment: Scroll,
  compass: Compass,
  bell: Bell,
  mirror: ScanEye,
};
export function Arcana() {
  const { state, change } = useGuideStore();
  const [active, setActive] = useState<CardType>("chalice");
  const [error, setError] = useState("");
  const c = classById[state.classId];
  const config = (type: CardType) =>
    state.arcana[`${c.id}:${type}`] || {
      set: cards.find((x) => x.type === type)!.recommended,
      lines: suggestedLines(c.id, type),
    };
  const card = cards.find((x) => x.type === active)!;
  const current = config(active);
  const pool = getPool(c.id, active);
  const vigor = cards.filter((x) => config(x.type).set === "Vigor").length;
  const magic = 5 - vigor;
  function update(lines: string[], set: "Vigor" | "Magic" = current.set) {
    const problem = validateCard(c.id, active, lines);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    change((s) => ({
      ...s,
      arcana: { ...s.arcana, [`${c.id}:${active}`]: { set, lines } },
    }));
  }
  const totals: Record<string, number> = {};
  cards.forEach((card) =>
    config(card.type)
      .lines.filter(Boolean)
      .forEach((s) => (totals[s] = (totals[s] || 0) + 1)),
  );
  return (
    <>
      <PageTitle
        title="Beş kart. Uyumlu bir yapı."
        description="Geçerli beceri havuzlarıyla Unique kalitesinde kurulum planla. Değişikliklerin her sınıf için ayrı kaydedilir."
        kicker="ARCANA / KURULUM PLANLAYICI"
      />
      <Notice>
        {" "}
        Önerilen satırlar geçici bir başlangıçtır: önce belgelenmiş sınıf
        öncelikleri, sonra geçerli alternatifler. Her kart için kesin dört satır
        BiS sıralaması doğrulanmış değildir. Bunlar +0 kart planlarıdır;
        rastgele geliştirme simülasyonu değildir.{" "}
      </Notice>
      <div className="arcana-deck">
        {cards.map((card, i) => {
          const Icon = icons[card.type];
          const cfg = config(card.type);
          return (
            <button
              key={card.type}
              onClick={() => {
                setActive(card.type);
                setError("");
              }}
              className={`arcana-card ${active === card.type ? "selected" : ""} ${cfg.set === "Magic" ? "magic" : ""}`}
              aria-pressed={active === card.type}
            >
              <div className="arcana-border">
                <span className="card-number">0{i + 1}</span>
                <span className="card-type">{card.name}</span>
                <div className="card-glyph">
                  <div />
                  <Icon size={49} strokeWidth={1} />
                </div>
                <span className="pantheon">
                  {cfg.set === "Vigor" ? card.vigor : card.magic}
                </span>
                <span className="card-set">
                  {cfg.set === "Vigor" ? "PRIMAL VIGOR" : "MAGIC ARMOR"}
                </span>
                <div className="card-lines">
                  {cfg.lines.map((line, j) => (
                    <span key={j}>
                      <i>+</i>
                      {line || "Satır seç"}
                    </span>
                  ))}
                </div>
                <span className="card-bottom">
                  UNIQUE <span>◇ ◇ ◇ ◇</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="two-col arcana-editor">
        <section className="panel">
          <SectionTitle
            eyebrow={`${c.name.toUpperCase()} / ${card.poolLabel.toUpperCase()}`}
            title={`${card.name} ayarları`}
          />
          <p>{card.reason}</p>
          <label className="field-label">
            {" "}
            Kart seti{" "}
            <select
              value={current.set}
              onChange={(e) =>
                update(current.lines, e.target.value as "Vigor" | "Magic")
              }
            >
              <option value="Vigor">Primal Vigor · {card.vigor}</option>
              <option value="Magic">Magic Armor · {card.magic}</option>
            </select>
          </label>
          <div className="two-col compact">
            {Array.from({ length: 4 }, (_, i) => (
              <label className="field-label" key={`${c.id}-${active}-${i}`}>
                {" "}
                Beceri satırı {i + 1}
                <select
                  value={current.lines[i] || ""}
                  aria-label={`Arcana beceri satırı ${i + 1}`}
                  onChange={(e) =>
                    update(
                      Array.from({ length: 4 }, (_, j) =>
                        j === i ? e.target.value : current.lines[j] || "",
                      ),
                    )
                  }
                >
                  <option value=""> Boş satır </option>
                  {pool.map((s) => (
                    <option
                      key={s}
                      disabled={
                        current.lines.includes(s) && current.lines[i] !== s
                      }
                    >
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          {error && (
            <p role="alert" className="notice warning">
              {error}
            </p>
          )}
          <button
            className="button"
            onClick={() =>
              update(suggestedLines(c.id, active), card.recommended)
            }
          >
            <RotateCcw size={14} /> Önerilen kartı geri yükle{" "}
          </button>
          <details className="pool-details">
            <summary>
              {" "}
              Havuzdaki {pool.length} belgelenmiş becerinin tamamını gör{" "}
            </summary>
            <div className="tag-list">
              {pool.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </details>
          <Evidence
            ids={["pools", "pool-check", "arcana", `class-${c.id}`]}
            note="Hesaplayıcı verisindeki dört eksik, Global havuz referansından tamamlandı. Stigma seçilemez."
          />
        </section>
        <section className="panel">
          <SectionTitle title="Kurulumunun etkileri" />
          <div className="set-bonus">
            <span className="gold-text">Primal Vigor</span>
            <Badge tone={vigor >= 2 ? "gold" : "muted"}>
              {vigor} / 5 kart{" "}
            </Badge>
            <p>
              {vigor >= 4
                ? "HP en az %70 iken +150 PvE Attack."
                : vigor >= 2
                  ? "HP en az %70 iken +60 PvE Attack."
                  : "İlk set etkisi için iki kart gerekir."}
            </p>
          </div>
          <div className="set-bonus">
            <span className="teal-text">Magic Armor</span>
            <Badge tone={magic >= 2 ? "teal" : "muted"}>
              {magic} / 5 kart{" "}
            </Badge>
            <p>
              {magic >= 2
                ? "MP %20 veya altına düşünce 1.500 MP yeniler; bekleme süresi 30 sn."
                : "İlk set etkisi için iki kart gerekir."}
              {magic >= 4
                ? " Dört kart, MP en az %50 iken ayrıca 1.000 PvE Defense sağlar."
                : ""}
            </p>
          </div>
          <h3> +0 için planlanan beceri seviyeleri </h3>
          <div className="skill-totals">
            {Object.entries(totals)
              .sort((a, b) => b[1] - a[1])
              .map(([name, n]) => (
                <div key={name}>
                  <span>{name}</span>
                  <b>+{n}</b>
                </div>
              ))}
          </div>
          <Evidence ids={["arcana"]} />
        </section>
      </div>
      <div className="three-col">
        <section className="panel">
          <Check size={19} className="gold-text" />
          <h3> Hedef belirleyerek üret </h3>
          <p>
            {" "}
            Chalice’ın geniş havuzu, onu ilk hedefli üretim için iyi bir aday
            yapar. Gerçek bir eşiği tamamlayan beceriyle başla.{" "}
          </p>
        </section>
        <section className="panel">
          <ArrowRight size={19} className="teal-text" />
          <h3> Kusursuzluktan önce bütçe </h3>
          <p>
            {" "}
            Ana becerini taşıyan geçici kart, yanlış satırlı kusursuz bir setten
            daha yararlı olabilir.{" "}
          </p>
        </section>
        <section className="panel">
          <h3> Malzeme yapmadan önce kontrol et </h3>
          <p>
            {" "}
            Kaynaklar EXP geri kazanımı ve aynı tür besleme bonuslarında
            uyuşmuyor. Güncel geliştirme önizlemesini incele; burada aktarım
            kayıp yüzdesi varsayılmıyor.{" "}
          </p>
        </section>
      </div>
    </>
  );
}
