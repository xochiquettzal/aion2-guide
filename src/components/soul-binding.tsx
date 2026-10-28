"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Gem,
  Shield,
  Sword,
  ChevronRight,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";
import { equipment, statDescriptions } from "@/data/equipment";
import { classById } from "@/data/classes";
import { bindingAdvice } from "@/lib/engine";
import { useGuideStore } from "./store";
import { Badge, Evidence, Notice, PageTitle, SectionTitle } from "./common";
export function SoulBinding() {
  const { state } = useGuideStore();
  const [slotId, setSlot] = useState("weapon");
  const [category, setCategory] = useState("Tümü");
  const [stage, setStage] = useState("Başlangıç");
  const [lines, setLines] = useState<string[]>(["", "", "", ""]);
  const [extra, setExtra] = useState(false);
  const search = useSearchParams();
  useEffect(() => {
    const s = search.get("slot");
    if (s && equipment.some((e) => e.id === s)) {
      setSlot(s);
      setCategory("Tümü");
      setLines(["", "", "", ""]);
    }
  }, [search]);
  useEffect(() => {
    setLines(["", "", "", ""]);
  }, [state.classId]);
  const slot = equipment.find((s) => s.id === slotId)!;
  const c = classById[state.classId];
  const skillLines = c.skills
    .filter((s) => s.kind === slot.skills)
    .map((s) => s.name);
  const available = [
    ...slot.stats,
    ...skillLines,
    "Diğer / listelenmeyen satır",
  ];
  return (
    <>
      <PageTitle
        title="Neyi koruman gerektiğini bil."
        description="Ekipman yuvasını incele, yararlı satırları karşılaştır ve bütçene göre yenileme kararı ver."
        kicker="EKİPMAN / SOUL BINDING"
      />
      <div className="equipment-layout">
        <aside className="panel slot-panel">
          <SectionTitle title="Ekipmanın" />
          <label className="field-label">
            {" "}
            Yuva kategorisi{" "}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {["Tümü", "Silah", "Zırh", "Aksesuar", "Special"].map((x) => (
                <option key={x} value={x}>
                  {x === "Special" ? "Özel" : x}
                </option>
              ))}
            </select>
          </label>
          <div className="slot-list">
            {equipment
              .filter((s) => category === "Tümü" || s.category === category)
              .map((s) => (
                <button
                  className={s.id === slotId ? "selected" : ""}
                  onClick={() => {
                    setSlot(s.id);
                    setLines(["", "", "", ""]);
                  }}
                  key={s.id}
                  aria-pressed={s.id === slotId}
                >
                  {s.category === "Silah" ? (
                    <Sword size={17} />
                  ) : s.category === "Zırh" ? (
                    <Shield size={17} />
                  ) : (
                    <Gem size={17} />
                  )}
                  <span>{s.name}</span>
                  {s.availability ? (
                    <Badge> Sürüm </Badge>
                  ) : (
                    <ChevronRight size={13} />
                  )}
                </button>
              ))}
          </div>
        </aside>
        <div>
          <section className="panel">
            <div className="panel-top">
              <div>
                <span className="eyebrow">
                  {(slot.category === "Special"
                    ? "Özel"
                    : slot.category
                  ).toLocaleUpperCase("tr-TR")}{" "}
                  / {c.name.toUpperCase()}
                </span>
                <h2>{slot.name}</h2>
              </div>
              <Badge tone="teal">
                {slot.skills === "Yok"
                  ? "Özel kurallar"
                  : `${slot.skills} beceri satırları`}
              </Badge>
            </div>
            {slot.availability && (
              <Notice tone="warning">{slot.availability}</Notice>
            )}
            {slot.note && <p>{slot.note}</p>}
            {slot.stats.length > 0 && !slot.availability ? (
              <>
                <p className="muted">
                  {" "}
                  Referansın nadirlik önceliğine göre yararlı PvE listesi. Olası
                  stat havuzunun tamamı değildir.{" "}
                </p>
                <div className="stat-list">
                  {slot.stats.map((s, i) => (
                    <div key={s}>
                      <span className="rank">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <strong
                        title={
                          statDescriptions[s] ||
                          "Oyundaki güncel stat açıklamasına bak."
                        }
                      >
                        {s}
                      </strong>
                      <span className="stat-note">
                        {i < 2 ? "Yararlıysa koru" : "Koşula / bütçeye bağlı"}
                      </span>
                    </div>
                  ))}
                </div>
                <details className="stat-explanations">
                  <summary> Bu statlar ne anlama geliyor? </summary>
                  {slot.stats.map((s) => (
                    <p key={s}>
                      <strong>{s}:</strong>{" "}
                      {statDescriptions[s] ||
                        "Oyundaki güncel açıklamayı kontrol et. Referans, evrensel bir dönüşüm oranı veya sınır belirlemiyor."}
                    </p>
                  ))}
                </details>
                {skillLines.length > 0 && (
                  <div className="skill-shortlist">
                    <span className="eyebrow"> SINIF BECERİ HEDEFLERİ </span>
                    {skillLines.map((s) => (
                      <Badge key={s} tone="gold">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Notice>
                {" "}
                Bu yuva için normal Global satır yenileme önerisi etkin değil.
                Kendi geliştirme kurallarını kullan ve erişilebilirliğini
                doğrula.{" "}
              </Notice>
            )}
            <Evidence
              ids={["kanon", `class-${c.id}`]}
              note="Kanon, bölüm 2–5. Kaynak yaklaşık değerler verdiğinden kesin yenileme olasılıkları kullanılmıyor."
            />
          </section>
          <section className="panel advisor">
            <SectionTitle
              eyebrow="ETKİLEŞİMLİ ARAÇ"
              title="Koru / Yenile danışmanı"
              description="Mevcut satırlarını gir. Öneriler nitelikseldir; simüle edilmiş DPS puanı değildir."
            />
            <div className="filter-row">
              {["Başlangıç", "Orta aşama", "Son aşama"].map((s) => (
                <button
                  className={`chip ${stage === s ? "selected" : ""}`}
                  key={s}
                  onClick={() => setStage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="advisor-lines">
              {lines.map((line, i) => {
                const result = bindingAdvice(
                  slot,
                  line,
                  c.id,
                  stage,
                  extra && i === 3,
                );
                return (
                  <div key={`${slot.id}-${i}`}>
                    <label className="field-label">
                      {" "}
                      Satır {i + 1}
                      {extra && i === 3 ? " · bonus" : ""}
                      <select
                        aria-label={`Mevcut satır ${i + 1}`}
                        value={available.includes(line) ? line : ""}
                        onChange={(e) =>
                          setLines((a) =>
                            a.map((s, j) => (j === i ? e.target.value : s)),
                          )
                        }
                        disabled={
                          Boolean(slot.availability) ||
                          slot.category === "Special"
                        }
                      >
                        <option value=""> Stat veya beceri seç… </option>
                        {available.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    {line && (
                      <div className="line-verdict" aria-live="polite">
                        {result.status === "Koru" ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <RefreshCcw size={15} />
                        )}
                        <div>
                          <strong>{result.status}</strong>
                          <p>{result.why}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <label className="inline-check">
              <input
                type="checkbox"
                checked={extra}
                onChange={(e) => setExtra(e.target.checked)}
              />{" "}
              4. satır ek Philosopher satırıdır{" "}
            </label>
            <Notice tone="warning">
              {" "}
              Nadirlik ve hasar ayrı konulardır. Başka stat daha çok hasar verse
              bile zor çıkan bir satırı korumak değerli olabilir. Reset tüm
              satırları, Sync ise tek tek satırları yeniler.{" "}
            </Notice>
          </section>
        </div>
      </div>
    </>
  );
}
