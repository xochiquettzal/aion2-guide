import type { Genus, ClassId } from "./types";
export const genera: Genus[] = ["Cogni", "Fera", "Natura", "Varian", "Special"];
export const offensivePools: Record<Genus, string[]> = {
  Cogni: [
    "PvE Damage Boost",
    "Damage Boost",
    "Critical Damage Boost",
    "Cogni Damage Boost",
    "Status Effect Chance",
    "Endurance Penetration",
    "Regeneration Penetration",
  ],
  Fera: [
    "PvE Damage Boost",
    "Damage Boost",
    "Weapon Damage Boost",
    "Fera Damage Boost",
    "Status Effect Chance",
    "Endurance Penetration",
    "Regeneration Penetration",
  ],
  Natura: [
    "PvE Damage Boost",
    "Multi-hit Chance",
    "Perfect Chance",
    "Natura Damage Boost",
    "Status Effect Chance",
    "Endurance Penetration",
    "Regeneration Penetration",
  ],
  Varian: [
    "PvE Damage Boost",
    "Front Attack Damage Boost",
    "Back Attack Damage Boost",
    "Varian Damage Boost",
    "Status Effect Chance",
    "Endurance Penetration",
    "Regeneration Penetration",
  ],
  Special: [
    "Double Chance",
    "Damage Boost",
    "Critical Damage Boost",
    "Front Attack Damage Boost",
    "Back Attack Damage Boost",
    "Status Effect Chance",
    "Endurance Penetration",
  ],
};
export function genusSlot(
  genus: Genus,
  slot: number,
  c: ClassId,
  needsAccuracy: boolean,
) {
  if (slot === 4) {
    const target =
      genus === "Special"
        ? "Double Chance"
        : genus === "Varian" && c === "assassin"
          ? "Back Attack Damage Boost"
          : genus === "Varian" && ["templar", "gladiator"].includes(c)
            ? "Front Attack Damage Boost"
            : genus === "Fera"
              ? "Weapon Damage Boost"
              : genus === "Cogni" && c === "gladiator"
                ? "Critical Damage Boost"
                : "PvE Damage Boost";
    return {
      category: "Saldırı çarpanı",
      priority: 1,
      target,
      budget:
        genus === "Special"
          ? "Double Chance için biriktirirken yararlı bir saldırı satırı"
          : "Yararlı bir PvE Damage Boost satırı",
      pool: offensivePools[genus],
      why: "İkincil satırları kilitlemeden önce bu yuvayı iyileştir. Konuma bağlı hedefler tutarlı konumlanma gerektirir.",
      range:
        genus === "Special"
          ? "Double Chance: Heroic %1,5–3 (topluluğun oyun verisi tablosu)"
          : "PvE Damage Boost: Heroic %2–4 (topluluğun oyun verisi tablosu)",
      dispute:
        genus === "Fera" || genus === "Cogni"
          ? "Kanon özel çarpanı önerirken diğer Global analizleri sıklıkla PvE Damage Boost'u tercih ediyor. Mevcut statlarını ve kritik sürekliliğini karşılaştır."
          : "",
    };
  }
  if ([1, 5].includes(slot))
    return {
      category: "Saldırı",
      priority: 2,
      target: "Max Attack",
      budget: "Attack Bonus, PvE Attack veya Boss Attack",
      pool: [
        "Max Attack",
        "Attack Bonus",
        "PvE Attack",
        "Boss Attack",
        "Back Attack",
        "Front Attack",
        "Critical Attack",
        "Penetration",
        "HP",
        "MP",
      ],
      why: "Tabloyu geliştirirken yararlı saldırı satırını koru. Saldırı türünün değeri mevcut çarpanlarına bağlıdır.",
      range:
        "Doğrudan oyun doğrulaması yapılana kadar kesin satır değerleri gösterilmiyor.",
      dispute:
        "Kanon Max Attack'ı öneriyor; bazı Global testleri düşük çarpanlarda PvE/Boss Attack'ı tercih ediyor.",
    };
  if ([3, 6, 9].includes(slot))
    return {
      category: "İsabet / kritik",
      priority: 3,
      target: needsAccuracy ? "Accuracy Bonus" : "Power Shard Damage Bonus",
      budget: needsAccuracy
        ? "PvE Accuracy veya Critical Hit"
        : "Karşılaşmanın ihtiyacının altındaysa Critical Hit",
      pool: [
        "Accuracy Bonus",
        "PvE Accuracy",
        "Critical Hit",
        "Power Shard Damage Bonus",
        "Back Attack Critical Hit",
        "Front Attack Critical Hit",
        "Block",
        "Evasion Bonus",
        "HP",
        "MP",
      ],
      why: "Önce engellenen veya kaçan saldırıları düzelt. İsabet/kritikten ancak karşılaşmayı kontrol ettikten sonra vazgeç.",
      range:
        "Doğrudan oyun doğrulaması yapılana kadar kesin satır değerleri gösterilmiyor.",
      dispute: "",
    };
  if (slot === 7)
    return {
      category: "Hayatta kalma",
      priority: 4,
      target:
        genus === "Special"
          ? "Damage Tolerance"
          : c === "templar" && genus === "Varian"
            ? "Endurance"
            : "PvE Damage Tolerance",
      budget: "Endurance",
      pool:
        genus === "Special"
          ? [
              "Damage Tolerance",
              "Endurance",
              "Double Resist",
              "Critical Damage Tolerance",
              "Front Attack Damage Tolerance",
              "Back Attack Damage Tolerance",
              "Status Effect Resist",
            ]
          : [
              "PvE Damage Tolerance",
              "Endurance",
              "Regeneration",
              "Status Effect Resist",
            ],
      why: "Ölümü önleyen savunma satırı değerlidir. Tank ve destek ihtiyaçları daha erken yatırımı gerektirebilir.",
      range:
        "Doğrudan oyun doğrulaması yapılana kadar kesin satır değerleri gösterilmiyor.",
      dispute: "",
    };
  return {
    category: "Savunma",
    priority: 5,
    target: "HP Increase",
    budget: "HP veya Defense Bonus",
    pool: [
      "HP Increase",
      "HP",
      "Defense Bonus",
      "MP",
      "PvE Defense",
      "Boss Defense",
      "Critical Hit Resist",
    ],
    why: "Saldırı yapın oturana kadar ekonomik geçici satırları koru. Çok kilitle kusursuzluk aramak pahalıdır.",
    range:
      "Doğrudan oyun doğrulaması yapılana kadar kesin satır değerleri gösterilmiyor.",
    dispute: "",
  };
}
