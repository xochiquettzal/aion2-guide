"use client";
import { useState } from "react";
import {
  LockKeyhole,
  Unlock,
  Orbit,
  Target,
  Shield,
  Swords,
  Crosshair,
} from "lucide-react";
import { genera, genusSlot } from "@/data/genus";
import type { Genus } from "@/data/types";
import { useGuideStore } from "./store";
import { Badge, Evidence, Notice, PageTitle, SectionTitle } from "./common";
export function GenusPlanner() {
  const { state, change } = useGuideStore();
  const [genus, setGenus] = useState<Genus>("Special");
  const [slot, setSlot] = useState(4);
  const [accuracy, setAccuracy] = useState(true);
  const [roll, setRoll] = useState("");
  const [grade, setGrade] = useState("Unique");
  const [msg, setMsg] = useState("");
  const key = `${state.classId}:${genus}`;
  const board = state.genus[key] || { level: 1, locks: [] };
  const info = genusSlot(genus, slot, state.classId, accuracy);
  const open = slot <= Math.min(board.level, 9);
  function toggleLock() {
    if (!open) {
      setMsg(`${slot}. yuva, tablo ${slot}. seviyeye geldiğinde açılır.`);
      return;
    }
    if (!board.locks.includes(slot) && board.locks.length >= 8) {
      setMsg("Analiz için en az bir yuvayı kilitsiz bırak.");
      return;
    }
    setMsg("");
    change((s) => ({
      ...s,
      genus: {
        ...s.genus,
        [key]: {
          ...board,
          locks: board.locks.includes(slot)
            ? board.locks.filter((x) => x !== slot)
            : [...board.locks, slot],
        },
      },
    }));
  }
  return (
    <>
      <PageTitle
        title="Küçük seçimler. Kalıcı güç."
        description="Beş Genus tablosunu yuva yuva planla. Seviye yükseltme ve satır iyileştirme ayrı hedeflerdir."
        kicker="GENUS INSIGHT / BEŞ TABLO PLANLAYICI"
      />
      <div
        className="tabs genus-tabs"
        role="tablist"
        aria-label="Genus tabloları"
      >
        {genera.map((g) => (
          <button
            role="tab"
            aria-selected={genus === g}
            key={g}
            onClick={() => {
              setGenus(g);
              setRoll("");
              setMsg("");
            }}
          >
            <Orbit size={17} />
            {g}
          </button>
        ))}
      </div>
      <div className="genus-layout">
        <section className="panel board-panel">
          <div className="panel-top">
            <div>
              <span className="eyebrow">
                {genus.toUpperCase()} INSIGHT TABLOSU{" "}
              </span>
              <h2> Dokuz yuvalı tablon </h2>
            </div>
            <Badge tone="teal"> Sv. {board.level}</Badge>
          </div>
          <label className="range-label">
            {" "}
            Tablo seviyesi{" "}
            <input
              type="range"
              min="1"
              max="10"
              value={board.level}
              aria-label="Tablo seviyesi"
              onChange={(e) => {
                const level = +e.target.value;
                change((s) => ({
                  ...s,
                  genus: {
                    ...s.genus,
                    [key]: {
                      level,
                      locks: board.locks.filter((x) => x <= level),
                    },
                  },
                }));
              }}
            />
            <span>1 — 10</span>
          </label>
          <div className="insight-board">
            {Array.from({ length: 9 }, (_, i) => {
              const n = i + 1;
              const data = genusSlot(genus, n, state.classId, accuracy);
              const locked = board.locks.includes(n);
              const isOpen = n <= Math.min(board.level, 9);
              const Icon =
                n === 4
                  ? Target
                  : [1, 5].includes(n)
                    ? Swords
                    : [3, 6, 9].includes(n)
                      ? Crosshair
                      : Shield;
              return (
                <button
                  key={n}
                  className={`insight-slot ${slot === n ? "selected" : ""} ${n === 4 ? "core" : ""} ${!isOpen ? "unopened" : ""}`}
                  aria-label={`Yuva ${n}: ${data.category}${!isOpen ? " (henüz açık değil)" : ""}`}
                  aria-pressed={slot === n}
                  onClick={() => {
                    setSlot(n);
                    setRoll("");
                    setMsg("");
                  }}
                >
                  <span className="slot-number">0{n}</span>
                  {locked ? (
                    <LockKeyhole size={23} />
                  ) : (
                    <Icon size={26} strokeWidth={1.2} />
                  )}
                  <strong>{data.category}</strong>
                  <small>
                    {isOpen
                      ? `Öncelik ${data.priority}`
                      : `${n}. seviyede açılır`}
                  </small>
                </button>
              );
            })}
          </div>
          <div className="board-legend">
            <span>
              <i className="legend-dot" /> Seçili yuva{" "}
            </span>
            <span>
              <LockKeyhole size={12} /> {board.locks.length} kayıtlı kilit{" "}
            </span>
          </div>
          <p className="tiny muted">
            {" "}
            Bu şematik bir planlayıcıdır; oyun arayüzünün kopyası değildir.
            Belgelenmiş ad “Cogni”; bazı rehberlerde “Cognis” kullanılır.{" "}
          </p>
        </section>
        <section className="panel">
          <SectionTitle
            eyebrow={`YUVA ${slot} / ÖNCELİK ${info.priority}`}
            title={info.category}
          />
          <div className="target-box">
            <span> SON AŞAMA HEDEFİ </span>
            <h3>{info.target}</h3>
            <p>{info.why}</p>
          </div>
          <div className="budget-line">
            <Badge> Ekonomik </Badge>
            <span>{info.budget}</span>
          </div>
          <p className="muted tiny">{info.range}</p>
          <p className="muted tiny">
            {" "}
            Aşağıdakiler belgelenmiş bir kısa listedir; güncel oyun havuzunun
            tamamı bağımsız olarak doğrulanmış değildir.{" "}
          </p>
          {info.dispute && <Notice tone="warning">{info.dispute}</Notice>}
          <label className="inline-check">
            <input
              type="checkbox"
              checked={accuracy}
              onChange={(e) => setAccuracy(e.target.checked)}
            />{" "}
            Hâlâ isabet veya karşılaşmaya özel kritik ihtiyacım var{" "}
          </label>
          <div className="two-col compact">
            <label className="field-label">
              {" "}
              Mevcut satır{" "}
              <select value={roll} onChange={(e) => setRoll(e.target.value)}>
                <option value=""> Satırını seç… </option>
                {info.pool.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              {" "}
              Mevcut kalite{" "}
              <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                {["Common", "Rare", "Epic", "Unique", "Heroic"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          {roll && (
            <div className="roll-assessment" aria-live="polite">
              <strong>
                {!open
                  ? "Bu yuva henüz açılmadı."
                  : board.level < 9
                    ? "Düzenli kilitlemeye başlamadan önce seviye yükselt."
                    : roll === info.target &&
                        ["Unique", "Heroic"].includes(grade)
                      ? "Bu satırı korumayı düşün."
                      : "Geçici satır; kilitlemeden önce karşılaştır."}
              </strong>
              <p>
                {board.level < 9
                  ? "Erken kilitler tekrar analiz maliyetini artırır. Çok iyi bir temel satır istisna olabilir."
                  : "Stat, gerçek değeri, rolün ve ek kilit maliyeti birlikte önemlidir. Kalite tek başına değeri belirlemez."}
              </p>
            </div>
          )}
          <button className="button" disabled={!open} onClick={toggleLock}>
            {board.locks.includes(slot) ? (
              <Unlock size={15} />
            ) : (
              <LockKeyhole size={15} />
            )}{" "}
            {board.locks.includes(slot)
              ? "Kayıtlı kilidi kaldır"
              : "Yuvayı kilitli işaretle"}
          </button>
          {msg && <p role="status">{msg}</p>}
          <Evidence ids={["kanon", "genus", "genus-advice"]} />
        </section>
      </div>
      <div className="three-col">
        <section className="panel">
          <span className="eyebrow"> 01 / SEVİYE </span>
          <h3> 9–10 seviyesine ilerle </h3>
          <p>
            {" "}
            Kanon’un Global yolu 9’da iyileştirmeye başlar; diğer öneriler 10’u
            bekler. Normal pet ruhlarını ayrı toplarken kristalleri erken
            aşamada Special’a ayır.{" "}
          </p>
        </section>
        <section className="panel">
          <span className="eyebrow"> 02 / İYİLEŞTİR </span>
          <h3> Önce 4. yuva </h3>
          <p>
            {" "}
            Ardından saldırı, isabet ve savunmayı ele al. Ölümler ilerlemeyi
            engelliyorsa tank ve destek için savunma daha erken gelebilir.{" "}
          </p>
        </section>
        <section className="panel">
          <span className="eyebrow"> 03 / TASARRUF </span>
          <h3> Kilit bütçesini düşük tut </h3>
          <p>
            {" "}
            Yayımlanan analiz maliyetleri taban ücret ve yuva başına ücret
            konusunda uyuşmuyor. Uzlaşılana kadar kesin Kinah, kristal veya
            beklenen deneme tahmini gösterilmiyor.{" "}
          </p>
        </section>
      </div>
    </>
  );
}
