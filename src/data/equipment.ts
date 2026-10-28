import type { EquipmentSlot, ArcanaCard } from "./types";
const slot = (
  id: string,
  name: string,
  category: EquipmentSlot["category"],
  skills: EquipmentSlot["skills"],
  stats: string[],
  note?: string,
  availability?: string,
): EquipmentSlot => ({ id, name, category, skills, stats, note, availability });
export const equipment: EquipmentSlot[] = [
  slot("weapon", "Silah", "Silah", "Aktif", [
    "Damage Boost",
    "Combat Speed",
    "Weapon Damage Boost",
    "Might",
    "Multi-hit Chance",
    "Precision",
    "Attack",
  ]),
  slot("guard", "Guard", "Silah", "Aktif", [
    "Damage Boost",
    "Combat Speed",
    "Weapon Damage Boost",
    "Might",
    "Multi-hit Chance",
    "Precision",
    "Attack",
  ]),
  slot("helmet", "Miğfer", "Zırh", "Pasif", [
    "Double Chance",
    "Attack Increase",
    "Attack",
  ]),
  slot("shoulders", "Omuzluk", "Zırh", "Pasif", [
    "Double Chance",
    "Critical Damage Boost",
    "Attack",
  ]),
  slot("chest", "Göğüslük", "Zırh", "Pasif", [
    "Perfect Chance",
    "Damage Boost",
    "Attack",
  ]),
  slot("gloves", "Eldiven", "Zırh", "Pasif", [
    "Perfect Chance",
    "Combat Speed",
    "Attack",
  ]),
  slot("pants", "Pantolon", "Zırh", "Pasif", [
    "Attack Increase",
    "Perfect Chance",
    "Damage Tolerance",
    "Attack",
  ]),
  slot("boots", "Çizme", "Zırh", "Pasif", [
    "Perfect Chance",
    "Movement Speed",
    "Attack",
  ]),
  slot("cloak", "Pelerin", "Zırh", "Pasif", [
    "Double Chance",
    "Attack Increase",
    "Perfect Chance",
    "Attack",
  ]),
  slot("necklace", "Kolye", "Aksesuar", "Pasif", [
    "Combat Speed",
    "Might",
    "Attack",
    "Accuracy",
  ]),
  slot("earrings", "Küpeler", "Aksesuar", "Pasif", [
    "Movement Speed",
    "Might",
    "Precision",
    "Attack",
    "Accuracy",
  ]),
  slot("rings", "Yüzükler", "Aksesuar", "Aktif", [
    "Might",
    "Precision",
    "Attack",
  ]),
  slot(
    "bracelet",
    "Bileklik",
    "Aksesuar",
    "Yok",
    ["Illusion", "Wisdom", "Destruction", "Time", "Justice", "Space", "Death"],
    "Pantheon stat öncelikleri; doğrulanmış normal Soul Binding havuzu değil. Assassin, Space yerine Death'i tercih edebilir.",
    "Ludra bağlantılı; güncel Global elde etme yolu doğrulanmadı",
  ),
  slot(
    "brooch",
    "Broş",
    "Aksesuar",
    "Yok",
    ["Might", "Precision", "Accuracy", "Constitution"],
    "Belge daha sonraki bir baskın eşyasını anlatıyor. Güncel Global önerisi yok.",
    "KR / gelecek içerik; bu veride Global için mevcut değil",
  ),
  slot(
    "belt",
    "Kemer",
    "Special",
    "Yok",
    [],
    "Kale parşömeniyle gelişir; güncel dönüştürme tarifini incele.",
  ),
  slot(
    "amulet",
    "Tılsım",
    "Special",
    "Yok",
    [],
    "Tüy toplama geliştirme parşömeni sağlar.",
  ),
  slot(
    "runes",
    "Rünler",
    "Special",
    "Yok",
    [],
    "Ayrı geliştirme sistemi; başarısızlık rünleri yok edebilir. Denemeden önce bütçe belirle.",
  ),
  slot(
    "wings",
    "Kanatlar",
    "Special",
    "Yok",
    [],
    "Sahiplik ve kuşanma etkileri farklıdır. KR kanat geliştirme önerilerini Global'e aktarma.",
  ),
];
export const cards: ArcanaCard[] = [
  {
    type: "chalice",
    name: "Chalice",
    poolLabel: "Aktif + pasif",
    vigor: "Time",
    magic: "Space",
    recommended: "Vigor",
    reason:
      "Time, Combat Speed'i destekler. Geniş beceri havuzu hedefli üretimi değerli kılar.",
  },
  {
    type: "parchment",
    name: "Parchment",
    poolLabel: "Aktif havuz A",
    vigor: "Life",
    magic: "Destiny",
    recommended: "Vigor",
    reason:
      "Primal Vigor için Chalice ile eşleşir; doğru beceri satırları önce gelir.",
  },
  {
    type: "compass",
    name: "Compass",
    poolLabel: "Aktif havuz B",
    vigor: "Freedom",
    magic: "Death",
    recommended: "Magic",
    reason:
      "Death, Critical Hit sağlar. Eksik olan isabetse Freedom'ı değerlendir.",
  },
  {
    type: "bell",
    name: "Bell",
    poolLabel: "Pasif havuz A",
    vigor: "Justice",
    magic: "Destruction",
    recommended: "Magic",
    reason: "Destruction saldırı odaklı Pantheon değeri ekler.",
  },
  {
    type: "mirror",
    name: "Mirror",
    poolLabel: "Pasif havuz B",
    vigor: "Illusion",
    magic: "Wisdom",
    recommended: "Magic",
    reason:
      "Wisdom, Double Chance sağlar. Bekleme süresi ihtiyacı için Illusion alternatiftir.",
  },
];
export const statDescriptions: Record<string, string> = {
  "Damage Boost":
    "Genel hasar çarpanı grubu. Nadirlik, ek DPS katkısıyla aynı şey değildir.",
  "Weapon Damage Boost":
    "Ayrı bir saldırı çarpanı; değeri hangi saldırı kaynaklarını etkilediğine bağlıdır.",
  "Combat Speed":
    "Savaş içindeki uygulama hızını artırır; gerçek fayda becerilere, gecikmeye ve saldırı sürekliliğine bağlıdır.",
  "Double Chance":
    "Çift hasar oluşma olasılığı. Mevcut değeri ve hedefin direncini karşılaştır.",
  "Perfect Chance":
    "Azami saldırı sonuçlarını destekler. Double Chance ile aynı değildir.",
  "Critical Damage Boost":
    "Değeri, saldırıların gerçekte ne sıklıkta kritik vurduğuna bağlıdır.",
  Accuracy:
    "Karşılaşmaya bağlıdır. Saldırı listesini kopyalamak için gereken isabetten vazgeçme.",
  Precision:
    "Yararlı eşiklerin ötesine yığmadan önce mevcut Critical Hit performansını kontrol et.",
  Might: "Saldırı odaklı ana stat; güncel dönüşümü oyun içi açıklamadan öğren.",
  Attack: "Yararlı sabit saldırı katkısı ve pratik ekonomik satır.",
  "Movement Speed":
    "Konumlanmayı ve mekaniklerden kaçınmayı kolaylaştırır; hasarı otomatik artırmaz.",
  "Damage Tolerance": "Saldırı sürekliliğini koruyabilen savunma yatırımı.",
};
