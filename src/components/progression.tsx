"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Route,
  Coins,
  Layers,
  Calendar,
  Target,
} from "lucide-react";
import { milestones } from "@/data/progression";
import { getMilestone, nextActions, type Profile } from "@/lib/engine";
import { useGuideStore } from "./store";
import {
  Badge,
  CheckItem,
  Evidence,
  Notice,
  PageTitle,
  SectionTitle,
} from "./common";
export function Progression() {
  const { state, change } = useGuideStore();
  const p = state.profile;
  const [current, setCurrent] = useState<number | null>(null);
  const m = milestones.find((x) => x.min === current) || getMilestone(p.gs);
  const actions = nextActions(p, state.classId);
  const update = (key: keyof Profile, value: Profile[keyof Profile]) =>
    change((s) => ({ ...s, profile: { ...s.profile, [key]: value } }));
  const checked = (i: number) =>
    state.checked.includes(`${state.classId}:${m.min}:${i}`);
  const toggle = (i: number) =>
    change((s) => {
      const k = `${s.classId}:${m.min}:${i}`;
      return {
        ...s,
        checked: s.checked.includes(k)
          ? s.checked.filter((x) => x !== k)
          : [...s.checked, k],
      };
    });
  return (
    <>
      <PageTitle
        title="Atreia'da sıradaki adımın."
        description="Mevcut karakterine göre pratik bir geliştirme sırası oluştur. Uydurma GS artışı veya hasar tahmini yok."
        kicker="İLERLEME / GELİŞTİRME PLANLAYICI"
      />
      <div className="score-explainer">
        <div>
          <Route size={21} />
          <strong> Eşya seviyesi / GS </strong>
          <p> İçerik girişini belirler. Ekipman ve Arcana artırabilir. </p>
        </div>
        <div>
          <Target size={21} />
          <strong>Combat Power</strong>
          <p>
            {" "}
            Ayrı bir puandır. Beceri, bağlama ve Genus, GS girişini açmadan
            savaş gücünü artırabilir.{" "}
          </p>
        </div>
        <Evidence ids={["roadmap"]} />
      </div>
      <div className="planner-layout">
        <section className="panel profile-panel">
          <SectionTitle
            title="Karakter profilin"
            description="Yerel kaydedilir. Düzenledikçe öneriler güncellenir."
          />
          <div className="two-col compact">
            {[
              { key: "gs", label: "Mevcut GS / eşya seviyesi", max: 20000 },
              {
                key: "cp",
                label: "Combat Power (isteğe bağlı)",
                max: 10000000,
              },
              { key: "enhance", label: "Silah geliştirme seviyesi", max: 25 },
              { key: "arcana", label: "Dolu Arcana yuvası", max: 5 },
              { key: "genus", label: "En düşük Genus seviyesi", max: 10 },
            ].map((f) => (
              <label className="field-label" key={f.key}>
                {f.label}
                <input
                  type="number"
                  min={f.key === "genus" ? 1 : 0}
                  max={f.max}
                  step="1"
                  value={p[f.key as keyof Profile] as number}
                  onChange={(e) =>
                    update(
                      f.key as keyof Profile,
                      Math.floor(Number(e.target.value) || 0),
                    )
                  }
                />
              </label>
            ))}
            <label className="field-label">
              {" "}
              Mevcut ekipman kalitesi{" "}
              <select
                value={p.tier}
                onChange={(e) => update("tier", e.target.value)}
              >
                {["Quest", "Unique", "Heroic"].map((s) => (
                  <option key={s} value={s}>
                    {s === "Quest" ? "Görev" : s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <CheckItem
            checked={p.story}
            onChange={() => update("story", !p.story)}
          >
            {" "}
            45. seviye hikâye tamamlandı{" "}
          </CheckItem>
          <CheckItem
            checked={p.coreSkill}
            onChange={() => update("coreSkill", !p.coreSkill)}
          >
            {" "}
            Temel aktif beceri eşiğine ulaşıldı{" "}
          </CheckItem>
          <CheckItem
            checked={p.accuracy}
            onChange={() => update("accuracy", !p.accuracy)}
          >
            {" "}
            Hedef boss için isabet kontrol edildi{" "}
          </CheckItem>
          <p className="tiny muted">
            {" "}
            Combat Power yalnızca bilgi için kaydedilir. Evrensel ve doğrulanmış
            bir CP–başarı formülü olmadığından hazır olma kararı üretmez.{" "}
          </p>
        </section>
        <section className="panel action-queue">
          <SectionTitle
            title="Geliştirme sıran"
            action={<Badge tone="teal">{actions.length} adım </Badge>}
          />
          {actions.map((a, i) => (
            <div className="queue-item" key={a.title}>
              <span className="number">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <Link href={a.href}>
                  <h3>
                    {a.title} <ArrowRight size={14} />
                  </h3>
                </Link>
                <Badge>{a.impact}</Badge>
                <p>{a.why}</p>
                <Evidence ids={a.sources} />
              </div>
            </div>
          ))}
        </section>
      </div>
      <SectionTitle
        eyebrow="YOL HARİTASI"
        title="İlk setten son aşamaya"
        description="Topluluk giriş eşikleri ve son doğrulanmış Hard Expedition eklemesi. Tüm seviye ve görev koşullarını oyunda doğrula."
      />
      <div className="milestone-tabs" aria-label="GS aşamaları">
        {milestones.map((x) => (
          <button
            key={x.min}
            className={m.min === x.min ? "selected" : ""}
            onClick={() => setCurrent(x.min)}
          >
            <span>{x.min.toLocaleString("tr-TR")}</span>
            <small>
              {x.max ? `→ ${x.max.toLocaleString("tr-TR")}` : "SON AŞAMA"}
            </small>
            {p.gs >= x.min && (x.max === null || p.gs < x.max) && <i />}
          </button>
        ))}
      </div>
      <section className="panel milestone-detail">
        <div className="panel-top">
          <div>
            <span className="eyebrow">
              {m.min.toLocaleString("tr-TR")}{" "}
              {m.max ? `— ${m.max.toLocaleString("tr-TR")}` : "+"} EŞYA
              SEVİYESİ{" "}
            </span>
            <h2>{m.name}</h2>
          </div>
          <Badge tone="gold">
            {m.min >= 2800 ? "Yaklaşan baskın" : "İlerleme yolu"}
          </Badge>
        </div>
        <Notice>{m.unlock}</Notice>
        <div className="roadmap-facts">
          {[
            { icon: Target, title: "Ekipman hedefi", text: m.gear },
            { icon: Coins, title: "Önce geliştir", text: m.enhance },
            { icon: Calendar, title: "Günlük öncelikler", text: m.daily },
            { icon: Calendar, title: "Haftalık öncelikler", text: m.weekly },
            { icon: Coins, title: "Odyle enerjisi", text: m.energy },
            { icon: Layers, title: "Arcana yatırımı", text: m.arcana },
            {
              icon: Route,
              title: "Beceri, pet ve tablolar",
              text: m.horizontal,
            },
            { icon: Target, title: "Kaynak israfından kaçın", text: m.avoid },
          ].map((f) => (
            <div key={f.title}>
              <f.icon size={17} />
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="milestone-checklist">
          <SectionTitle
            title="Sonraki eşiğe giden yolun"
            action={
              <Badge tone="teal">
                {m.steps.filter((_, i) => checked(i)).length} / {m.steps.length}
              </Badge>
            }
          />
          {m.steps.map((step, i) => (
            <CheckItem
              checked={checked(i)}
              onChange={() => toggle(i)}
              key={`${m.min}-${i}`}
            >
              {step}
            </CheckItem>
          ))}
        </div>
        <Evidence
          ids={m.sources}
          note="Kontrol listesi, kaynaklardaki mekaniklerin editoryal yorumudur. Belirli sayıda koşuyu veya hesaplanmış GS artışını garanti etmez."
        />
      </section>
    </>
  );
}
