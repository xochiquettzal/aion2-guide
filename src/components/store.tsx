"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { classes } from "@/data/classes";
import { defaultProfile, getPool, type Profile } from "@/lib/engine";
import type { ClassId, CardType } from "@/data/types";
export type SavedState = {
  classId: ClassId;
  profile: Profile;
  checked: string[];
  arcana: Record<string, { set: "Vigor" | "Magic"; lines: string[] }>;
  genus: Record<string, { level: number; locks: number[] }>;
};
const initial: SavedState = {
  classId: "gladiator",
  profile: defaultProfile,
  checked: [],
  arcana: {},
  genus: {},
};
const Store = createContext<{
  state: SavedState;
  change: (fn: (s: SavedState) => SavedState) => void;
  ready: boolean;
  storageError: string;
}>({ state: initial, change: () => {}, ready: false, storageError: "" });
export const STORAGE_KEY = "aion2-fieldguide-v1";
export function sanitizeSaved(raw: unknown): SavedState {
  if (!raw || typeof raw !== "object") return initial;
  const r = raw as Partial<SavedState>;
  const p =
    r.profile && typeof r.profile === "object" ? r.profile : defaultProfile;
  const number = (v: unknown, d: number, max: number) =>
    typeof v === "number" && Number.isFinite(v)
      ? Math.max(0, Math.min(max, v))
      : d;
  const arcana: SavedState["arcana"] = {};
  if (r.arcana && typeof r.arcana === "object")
    for (const [k, v] of Object.entries(r.arcana)) {
      const [classId, type] = k.split(":");
      if (
        classes.some((c) => c.id === classId) &&
        ["chalice", "parchment", "compass", "bell", "mirror"].includes(type) &&
        v &&
        ["Vigor", "Magic"].includes(v.set) &&
        Array.isArray(v.lines)
      ) {
        const pool = getPool(classId as ClassId, type as CardType);
        const seen = new Set<string>();
        arcana[k] = {
          set: v.set,
          lines: v.lines.slice(0, 4).map((x) => {
            if (typeof x !== "string" || !pool.includes(x) || seen.has(x))
              return "";
            seen.add(x);
            return x;
          }),
        };
      }
    }
  const genus: SavedState["genus"] = {};
  if (r.genus && typeof r.genus === "object")
    for (const [k, v] of Object.entries(r.genus))
      if (v && Array.isArray(v.locks))
        genus[k] = {
          level: Math.max(1, Math.floor(number(v.level, 1, 10))),
          locks: [
            ...new Set(
              v.locks.filter(
                (x) =>
                  Number.isInteger(x) && x > 0 && x <= Math.min(v.level, 9),
              ),
            ),
          ].slice(0, 8),
        };
  return {
    classId: classes.some((c) => c.id === r.classId) ? r.classId! : "gladiator",
    profile: {
      gs: number(p.gs, 1400, 20000),
      cp: number(p.cp, 0, 10000000),
      enhance: number(p.enhance, 10, 25),
      arcana: Math.floor(number(p.arcana, 0, 5)),
      genus: Math.max(1, Math.floor(number(p.genus, 1, 10))),
      tier: ["Quest", "Unique", "Heroic"].includes(p.tier) ? p.tier : "Unique",
      story: p.story === true,
      coreSkill: p.coreSkill === true,
      accuracy: p.accuracy === true,
    },
    checked: Array.isArray(r.checked)
      ? r.checked.filter((x) => typeof x === "string")
      : [],
    arcana,
    genus,
  };
}
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const [storageError, setError] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(sanitizeSaved(JSON.parse(raw)));
    } catch {
      setError(
        "Kayıtlı veriler okunamadı. Bu oturum varsayılanlarla başlatıldı.",
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        setError(
          "Tarayıcı depolaması kullanılamıyor. Değişiklikler yalnızca bu oturumda tutulacak.",
        );
      }
  }, [ready, state]);
  const change = useCallback(
    (fn: (s: SavedState) => SavedState) =>
      setState((s) => {
        const next = fn(s);
        return next === s ? s : sanitizeSaved(next);
      }),
    [],
  );
  return (
    <Store.Provider value={{ state, change, ready, storageError }}>
      {children}
    </Store.Provider>
  );
}
export const useGuideStore = () => useContext(Store);
