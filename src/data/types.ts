export type ClassId =
  | "gladiator"
  | "templar"
  | "assassin"
  | "ranger"
  | "sorcerer"
  | "spiritmaster"
  | "cleric"
  | "chanter";
export type Confidence = "Doğrulandı" | "Topluluk" | "Doğrulanmadı";
export type Evidence = {
  sources: string[];
  confidence: Confidence;
  region: "Global" | "KR" | "Mixed";
  note?: string;
};
export type Source = {
  id: string;
  title: string;
  url?: string;
  document?: string;
  region: string;
  patch: string;
  checked: string;
  confidence: Confidence;
  note: string;
};
export type SkillPriority = {
  name: string;
  kind: "Aktif" | "Pasif" | "Stigma";
  target?: number;
  why: string;
};
export type ClassGuide = {
  id: ClassId;
  name: string;
  role: string;
  weapon: string;
  color: string;
  summary: string;
  early: string;
  mid: string;
  late: string;
  rotation: string[];
  skills: SkillPriority[];
  variants: { name: string; detail: string }[];
  evidence: Evidence;
};
export type EquipmentSlot = {
  id: string;
  name: string;
  category: "Silah" | "Zırh" | "Aksesuar" | "Special";
  skills: "Aktif" | "Pasif" | "Yok";
  stats: string[];
  note?: string;
  availability?: string;
};
export type CardType = "chalice" | "parchment" | "compass" | "bell" | "mirror";
export type ArcanaCard = {
  type: CardType;
  name: string;
  poolLabel: string;
  vigor: string;
  magic: string;
  recommended: "Vigor" | "Magic";
  reason: string;
};
export type Genus = "Cogni" | "Fera" | "Natura" | "Varian" | "Special";
export type Milestone = {
  min: number;
  max: number | null;
  name: string;
  unlock: string;
  gear: string;
  enhance: string;
  daily: string;
  weekly: string;
  energy: string;
  arcana: string;
  horizontal: string;
  avoid: string;
  steps: string[];
  sources: string[];
};
export type Guide = {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
  evidence: Evidence;
};
