"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  LayoutDashboard,
  Swords,
  Gem,
  Layers,
  Orbit,
  Route,
  BookOpen,
  Library,
  Menu,
  X,
  ChevronRight,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { useGuideStore } from "./store";
import { classes, classById } from "@/data/classes";
import { guides } from "@/data/guides";
import { equipment } from "@/data/equipment";
import { ClassIcon } from "./common";
import { messages, searchText } from "@/i18n";
export const nav = [
  { href: "/", label: messages.navigation.overview, icon: LayoutDashboard },
  { href: "/classes/", label: messages.navigation.classes, icon: Swords },
  { href: "/soul-binding/", label: messages.navigation.binding, icon: Gem },
  { href: "/arcana/", label: messages.navigation.arcana, icon: Layers },
  { href: "/genus/", label: messages.navigation.genus, icon: Orbit },
  {
    href: "/progression/",
    label: messages.navigation.progression,
    icon: Route,
  },
  { href: "/guides/", label: messages.navigation.guides, icon: BookOpen },
  { href: "/sources/", label: messages.navigation.sources, icon: Library },
];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { state, change, ready, storageError, openAssessment } =
    useGuideStore();
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const c = classById[state.classId];
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        input.current?.focus();
        setSearch(true);
      }
      if (e.key === "Escape") {
        setSearch(false);
        setMobile(false);
        input.current?.blur();
      }
    }
    function outside(e: PointerEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node))
        setSearch(false);
    }
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", outside);
    };
  }, []);
  const corpus = [
    ...classes.map((c) => ({
      title: c.name,
      detail: c.role,
      href: `/classes/${c.id}/`,
    })),
    ...classes.flatMap((c) =>
      c.skills.map((s) => ({
        title: s.name,
        detail: `${c.name} · ${s.kind}`,
        href: `/classes/${c.id}/`,
      })),
    ),
    ...guides.map((g) => ({
      title: g.title,
      detail: g.summary,
      href: `/guides/#${g.id}`,
    })),
    ...equipment.map((s) => ({
      title: s.name,
      detail: s.stats.join(" · "),
      href: `/soul-binding/?slot=${s.id}`,
    })),
    ...nav.map((n) => ({ title: n.label, detail: "Bölüm", href: n.href })),
  ];
  const results = corpus
    .filter((i) =>
      searchText(i.title + " " + i.detail).includes(searchText(query)),
    )
    .slice(0, 10);
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {" "}
        İçeriğe geç{" "}
      </a>
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <Link href="/" className="brand" onClick={() => setMobile(false)}>
          <Compass size={34} strokeWidth={1} />
          <span>
            AION <b>2</b>
            <small> GELİŞİM MERKEZİ </small>
          </span>
        </Link>
        <div className="side-label"> KARAKTERİNE ODAKLAN </div>
        <nav aria-label="Ana gezinme">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMobile(false)}
              className={
                (n.href === "/" ? path === "/" : path.startsWith(n.href))
                  ? "active"
                  : ""
              }
            >
              <n.icon size={18} />
              {n.label}
              {n.href === "/classes/" && <span className="nav-count">08</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="version-dot" />
          <strong>Global · PvE</strong>
          <p>
            {" "}
            Araştırma tarihi <br /> 27 Ekim 2026{" "}
          </p>
          <Link href="/sources/">
            {" "}
            Kaynaklar ve sürüm notları <ChevronRight size={13} />
          </Link>
        </div>
      </aside>
      {mobile && (
        <button
          className="mobile-scrim"
          aria-label="Gezinmeyi kapat"
          onClick={() => setMobile(false)}
        />
      )}
      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label={mobile ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
          <div className="breadcrumb">
            <Link href="/"> Rehber </Link>
            <ChevronRight size={13} />
            <span>
              {nav.find((n) => n.href !== "/" && path.startsWith(n.href))
                ?.label || "Gelişim planım"}
            </span>
          </div>
          <div className="search-wrap" ref={wrap}>
            <Search size={16} />
            <input
              ref={input}
              aria-label="Rehber, beceri ve ekipman ara"
              placeholder="Rehberde ara…"
              value={query}
              onFocus={() => setSearch(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearch(true);
              }}
            />
            <kbd>Ctrl K</kbd>
            {search && (
              <div className="search-results">
                <div className="search-caption">
                  {query ? `${results.length} sonuç` : "HIZLI ARAMA"}
                </div>
                {results.length ? (
                  results.map((r, i) => (
                    <Link
                      key={r.href + r.title + i}
                      href={r.href}
                      onClick={() => {
                        setSearch(false);
                        setQuery("");
                      }}
                    >
                      <span>
                        {r.title}
                        <small>{r.detail}</small>
                      </span>
                      <ChevronRight size={14} />
                    </Link>
                  ))
                ) : (
                  <p>
                    {" "}
                    Sonuç bulunamadı. Bir sınıf, beceri veya ekipman yuvası
                    dene.{" "}
                  </p>
                )}
              </div>
            )}
          </div>
          <span className="top-status">
            <span className="version-dot" />
            GLOBAL
          </span>
        </header>
        <div className="context-bar">
          <span>
            <ClassIcon id={c.id} size={17} /> Sınıfın{" "}
          </span>
          <select
            aria-label="Sınıfın"
            value={state.classId}
            onChange={(e) => {
              const id = e.target.value as typeof state.classId;
              change((s) => ({ ...s, classId: id }));
              if (path.startsWith("/classes/") && path !== "/classes/")
                router.push(`/classes/${id}/`);
            }}
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <span className="context-mode"> PvE · Global kuralları </span>
          <button className="context-assessment" onClick={openAssessment}>
            Karakter analizi
          </button>
          <span className="saved">
            <CheckCircle2 size={13} />
            {ready ? messages.saved : messages.loading}
          </span>
        </div>
        <main id="main">
          {storageError && (
            <p role="status" className="notice warning">
              {storageError}
            </p>
          )}
          {children}
        </main>
        <footer>
          {" "}
          Bağımsız AION 2 oyuncu rehberi. Oyun adları © NC Corporation.{" "}
          <span>
            {" "}
            Kaynaklı öneriler · Harcamadan önce güncel oyun sürümünü kontrol
            et.{" "}
          </span>
        </footer>
      </div>
    </div>
  );
}
