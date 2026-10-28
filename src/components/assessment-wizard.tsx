"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Crosshair,
  Shield,
  Swords,
  Zap,
} from "lucide-react";
import { classes, classById } from "@/data/classes";
import type { ClassId } from "@/data/types";
import {
  blankAssessment,
  assessmentProfile,
  type Assessment,
  type Answer,
} from "@/lib/assessment";
import { useGuideStore } from "./store";
import { ClassIcon } from "./common";

export function AssessmentGate({ children }: { children: ReactNode }) {
  const { state, ready, assessmentOpen } = useGuideStore();
  if (!ready)
    return (
      <div className="coach-loading" role="status">
        <Zap size={32} />
        <span>Gelişim alanın hazırlanıyor…</span>
      </div>
    );
  if (
    assessmentOpen ||
    (!state.onboardingDismissed && !state.assessments[state.classId])
  )
    return <AssessmentWizard />;
  return children;
}

function AssessmentWizard() {
  const { state, change, closeAssessment, storageError } = useGuideStore();
  const router = useRouter();
  const [classId, setClass] = useState<ClassId>(state.classId);
  const [draft, setDraft] = useState<Assessment>(() => ({
    ...(state.assessments[state.classId] || blankAssessment),
  }));
  const [step, setStep] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
    window.scrollTo(0, 0);
  }, [step]);
  const c = classById[classId];
  const put = <K extends keyof Assessment>(key: K, value: Assessment[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));
  function choose(id: ClassId) {
    setClass(id);
    setDraft({ ...(state.assessments[id] || blankAssessment) });
  }
  function finish() {
    const a = { ...draft, updatedAt: new Date().toISOString() };
    change((s) => ({
      ...s,
      classId,
      profile: assessmentProfile(a, s.profile, classId),
      assessments: { ...s.assessments, [classId]: a },
      onboardingDismissed: true,
    }));
    closeAssessment();
    router.push("/");
  }
  const numberField = (
    key: "enhance" | "emptySlots" | "skillLevel" | "arcana" | "genus",
    label: string,
    max: number,
    hint: string,
    min = 0,
  ) => (
    <label className="coach-field" key={key}>
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step="1"
        value={draft[key] ?? ""}
        placeholder="Bilmiyorum"
        onChange={(e) =>
          put(key, e.target.value === "" ? null : Number(e.target.value))
        }
      />
      <small>{hint}</small>
    </label>
  );
  const answerField = (
    key: "story" | "binding" | "stigma" | "accuracy",
    label: string,
    hint: string,
  ) => (
    <label className="coach-field" key={key}>
      <span>{label}</span>
      <select
        value={draft[key]}
        onChange={(e) => put(key, e.target.value as Answer)}
      >
        <option value="unknown">Bilmiyorum / kontrol etmedim</option>
        <option value="yes">Evet</option>
        <option value="no">Hayır</option>
      </select>
      <small>{hint}</small>
    </label>
  );
  return (
    <div className="onboarding">
      <header className="onboarding-header">
        <a className="coach-wordmark" href="#assessment">
          <Zap size={25} fill="currentColor" /> AION<span>2</span>
          <small>GELİŞİM MERKEZİ</small>
        </a>
        <span>Global · PvE</span>
      </header>
      <main id="assessment" className="onboarding-layout">
        <aside className="onboarding-intro">
          <span className="coach-kicker">
            KARAKTERİN. HEDEFİN. SONRAKİ ADIMIN.
          </span>
          <h2>
            Daha çok grind değil.
            <br />
            <span>Daha doğru adım.</span>
          </h2>
          <p>
            Karakterini tanıyalım. Kaynaklarını nereye ayıracağını birlikte
            netleştirelim.
          </p>
          <ol className="onboarding-steps">
            {[
              "Karakterini tanıtalım",
              "Gelişim durumuna bakalım",
              "Önceliklerini belirleyelim",
            ].map((label, i) => (
              <li
                key={label}
                className={step === i ? "current" : step > i ? "complete" : ""}
                aria-current={step === i ? "step" : undefined}
              >
                <span>{step > i ? <Check size={16} /> : `0${i + 1}`}</span>
                <div>
                  <small>ADIM {i + 1}</small>
                  <strong>{label}</strong>
                </div>
              </li>
            ))}
          </ol>
          <div className="onboarding-note">
            <Shield size={19} />
            <p>
              Hesap gerekmez. Bilgilerin bu tarayıcıda saklanır. Bilmediğin
              alanları boş bırakabilirsin.
            </p>
          </div>
        </aside>
        <form
          className="assessment-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) setStep(step + 1);
            else finish();
          }}
        >
          <div className="assessment-form-head">
            <span className="coach-kicker">
              {step + 1} / 3 · YAKLAŞIK 2 DAKİKA
            </span>
            <span className="assessment-step-dots" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <i className={i <= step ? "on" : ""} key={i} />
              ))}
            </span>
          </div>
          <h1 ref={heading} tabIndex={-1}>
            {
              [
                "Karakterini tanıyalım.",
                "Gücün nerede eksik?",
                "Nasıl ilerlemek istersin?",
              ][step]
            }
          </h1>
          <p className="assessment-description">
            {
              [
                "Sınıfını ve mevcut eşya seviyeni seç. Planını bu bilgiler üzerine kuracağız.",
                "Oyundaki mevcut durumunu gir. Bilmediğin değerler eksik sayılmaz; kontrol listene alınır.",
                "Aynı eksiklerin önceliği, hedefe ve ayırabildiğin zamana göre değişebilir.",
              ][step]
            }
          </p>
          {step === 0 && (
            <>
              <fieldset className="class-picker">
                <legend>Sınıfın</legend>
                <div>
                  {classes.map((cl) => (
                    <button
                      type="button"
                      key={cl.id}
                      className={classId === cl.id ? "selected" : ""}
                      aria-pressed={classId === cl.id}
                      onClick={() => choose(cl.id)}
                    >
                      <ClassIcon id={cl.id} size={24} />
                      <strong>{cl.name}</strong>
                      <small>{cl.weapon}</small>
                      {classId === cl.id && (
                        <Check className="picked" size={14} />
                      )}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="assessment-fields">
                <label className="coach-field">
                  <span>
                    Mevcut GS / eşya seviyesi <b>*</b>
                  </span>
                  <input
                    required
                    type="number"
                    min="1"
                    max="20000"
                    step="1"
                    placeholder="Örn. 1600"
                    value={draft.gs || ""}
                    onChange={(e) => put("gs", Number(e.target.value))}
                  />
                  <small>
                    Karakter ekranındaki Item Level. Combat Power değil.
                  </small>
                </label>
                <label className="coach-field">
                  <span>Ağırlıklı ekipman kalitesi</span>
                  <select
                    value={draft.tier}
                    onChange={(e) =>
                      put("tier", e.target.value as Assessment["tier"])
                    }
                  >
                    <option value="Quest">Görev ekipmanı</option>
                    <option value="Unique">Unique</option>
                    <option value="Heroic">Heroic</option>
                  </select>
                  <small>Kaynak ve aktarım önerileri için.</small>
                </label>
                {answerField(
                  "story",
                  "45. seviye hikâyeyi tamamladın mı?",
                  "Ödülleri ve temel sistem açılımlarını kapsar.",
                )}
                {numberField(
                  "emptySlots",
                  "Boş ekipman yuvası",
                  18,
                  "Ekipman ekranında boş olan yuvaları say.",
                )}
              </div>
            </>
          )}
          {step === 1 && (
            <div className="assessment-fields">
              {numberField(
                "skillLevel",
                `${c.skills[0].name} seviyesi`,
                30,
                `Sınıf rehberindeki ilk hedef: ${c.skills[0].target ?? 16}. seviye.`,
              )}
              {numberField(
                "enhance",
                "Silah geliştirme seviyesi",
                25,
                "Örn. +8 için 8 gir.",
              )}
              {numberField(
                "arcana",
                "Dolu Arcana yuvası",
                5,
                "Şu an taktığın kartlar: 0–5.",
              )}
              {numberField(
                "genus",
                "En düşük Genus tablo seviyesi",
                10,
                "Beş tablon arasında en düşük seviye.",
                1,
              )}
              {answerField(
                "binding",
                "Soul Binding satırların sınıfına uygun mu?",
                "Mevcut satırlarını yuva önerileriyle karşılaştırdın mı?",
              )}
              {answerField(
                "stigma",
                "Öncelikli Stigma hedeflerini tamamladın mı?",
                "Sınıf rehberindeki beceri ve seviye hedefleri.",
              )}
              {answerField(
                "accuracy",
                "Hedef boss için isabetin yeterli mi?",
                "Kaçan veya engellenen saldırıları kontrol ettin mi?",
              )}
            </div>
          )}
          {step === 2 && (
            <>
              <fieldset className="goal-picker">
                <legend>Şu an en önemli hedefin</legend>
                {(
                  [
                    {
                      id: "damage",
                      icon: Swords,
                      title: "Daha fazla hasar",
                      detail: "Beceri eşikleri ve savaş performansı.",
                    },
                    {
                      id: "gear",
                      icon: Zap,
                      title: "Yeni içeriğe erişim",
                      detail: "Ekipman boşlukları ve sonraki GS eşiği.",
                    },
                    {
                      id: "survival",
                      icon: Shield,
                      title: "İçeriği daha rahat bitirmek",
                      detail: "Karşılaşma hazırlığı ve dengeli gelişim.",
                    },
                  ] as const
                ).map((g) => (
                  <label
                    key={g.id}
                    className={draft.goal === g.id ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={g.id}
                      checked={draft.goal === g.id}
                      onChange={() => put("goal", g.id)}
                    />
                    <g.icon size={23} />
                    <span>
                      <strong>{g.title}</strong>
                      <small>{g.detail}</small>
                    </span>
                    <span className="radio-dot" />
                  </label>
                ))}
              </fieldset>
              <div className="assessment-fields">
                <label className="coach-field">
                  <span>Bugün ayırabileceğin süre</span>
                  <select
                    value={draft.minutes}
                    onChange={(e) =>
                      put(
                        "minutes",
                        Number(e.target.value) as Assessment["minutes"],
                      )
                    }
                  >
                    <option value="15">15 dakika · Tek odak</option>
                    <option value="30">30 dakika · İki öncelik</option>
                    <option value="60">60+ dakika · Üç öncelik</option>
                  </select>
                  <small>
                    Planın kapsamını daraltır; bitirme süresi garantisi
                    değildir.
                  </small>
                </label>
                <label className="coach-field">
                  <span>Kaynak yaklaşımın</span>
                  <select
                    value={draft.budget}
                    onChange={(e) =>
                      put("budget", e.target.value as Assessment["budget"])
                    }
                  >
                    <option value="save">
                      Tasarruf · Mevcutları değerlendir
                    </option>
                    <option value="balanced">
                      Dengeli · Kalıcı yükseltmelere yatırım
                    </option>
                  </select>
                  <small>Önerilerin harcama yaklaşımını belirler.</small>
                </label>
              </div>
              <div className="assessment-summary">
                <Crosshair size={21} />
                <span>
                  <strong>
                    {c.name} · {draft.gs.toLocaleString("tr-TR")} GS
                  </strong>
                  <small>
                    Önceliklerin, eksiklerin ve sonraki adımın hazır olacak.
                  </small>
                </span>
              </div>
            </>
          )}
          {storageError && <p role="status">{storageError}</p>}
          <div className="assessment-actions">
            {step > 0 ? (
              <button
                type="button"
                className="button ghost"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={16} /> Geri
              </button>
            ) : (
              <button
                type="button"
                className="button ghost"
                onClick={() => {
                  change((s) => ({ ...s, onboardingDismissed: true }));
                  closeAssessment();
                }}
              >
                {state.assessments[state.classId]
                  ? "Değişikliklerden vazgeç"
                  : "Şimdilik rehberleri keşfet"}
              </button>
            )}
            <button className="button primary" type="submit">
              {step === 2 ? "Gelişim planımı oluştur" : "Devam et"}
              <ArrowRight size={17} />
            </button>
          </div>
        </form>
      </main>
      <footer className="onboarding-footer">
        Bağımsız oyuncu rehberi · Kaynaklı öneriler · Veriler: 27 Ekim 2026
      </footer>
    </div>
  );
}
