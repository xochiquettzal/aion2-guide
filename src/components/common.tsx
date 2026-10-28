"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Info,
  Swords,
  Shield,
  Scissors,
  Crosshair,
  Flame,
  Orbit,
  Sun,
  Music2,
  type LucideIcon,
} from "lucide-react";
import type { ClassId, Confidence } from "@/data/types";
import { sourceById } from "@/data/sources";
export const classIcons: Record<ClassId, LucideIcon> = {
  gladiator: Swords,
  templar: Shield,
  assassin: Scissors,
  ranger: Crosshair,
  sorcerer: Flame,
  spiritmaster: Orbit,
  cleric: Sun,
  chanter: Music2,
};
export function ClassIcon({ id, size = 24 }: { id: ClassId; size?: number }) {
  const Icon = classIcons[id];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
export function Badge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
export function Evidence({
  ids,
  confidence = "Topluluk",
  note,
}: {
  ids: string[];
  confidence?: Confidence;
  note?: string;
}) {
  return (
    <details className="evidence">
      <summary>
        <BookOpen size={13} />
        {confidence === "Topluluk" ? "Topluluk kaynakları" : confidence}{" "}
        <span>· {ids.length} kaynak </span>
      </summary>
      <div>
        {note && <p>{note}</p>}
        {ids.map((id) => {
          const s = sourceById[id];
          return s ? (
            <p key={id}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title} <ArrowUpRight size={12} />
              </a>
              <small>
                {s.region} · {s.patch} · Kontrol: {s.checked}
              </small>
            </p>
          ) : null;
        })}
        <Link href="/sources/"> Doğrulama notlarını oku → </Link>
      </div>
    </details>
  );
}
export function Notice({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <div className={`notice ${tone}`}>
      <Info size={17} />
      <div>{children}</div>
    </div>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function PageTitle({
  title,
  description,
  kicker = "DAEVA REHBERİ",
}: {
  title: string;
  description: string;
  kicker?: string;
}) {
  return (
    <header className="page-title">
      <div className="eyebrow">{kicker}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
export function CheckItem({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className={`check-item ${checked ? "completed" : ""}`}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="check-box">{checked && <Check size={13} />}</span>
      <span>{children}</span>
    </label>
  );
}
