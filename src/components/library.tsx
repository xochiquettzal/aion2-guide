"use client";
import { searchText } from "@/i18n";
import { useState } from "react";
import { Search, ArrowUpRight, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import { sources } from "@/data/sources";
import { Badge, Evidence, Notice, PageTitle, SectionTitle } from "./common";
export function GuideLibrary() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("Tümü");
  const filtered = guides.filter(
    (g) =>
      (category === "Tümü" || category === g.category) &&
      searchText(`${g.title} ${g.summary} ${g.steps.join(" ")}`).includes(
        searchText(q),
      ),
  );
  return (
    <>
      <PageTitle
        title="Sistemleri tanı."
        description="Karakter gelişimindeki kararlar için kısa ve pratik rehberler."
        kicker="KAYNAK / REHBER KÜTÜPHANESİ"
      />
      <div className="library-filters">
        <label className="filter-search">
          <Search size={16} />
          <input
            aria-label="Rehber kütüphanesinde ara"
            placeholder="Bir mekanik ara…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <div className="filter-row">
          {[
            "Tümü",
            "Ekipman",
            "Beceriler",
            "Sistemler",
            "Kaynak toplama",
            "İlerleme",
          ].map((c) => (
            <button
              className={`chip ${category === c ? "selected" : ""}`}
              onClick={() => setCategory(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="muted tiny">{filtered.length} rehber </p>
      <div className="guide-library">
        {filtered.map((g) => (
          <article className="panel guide-article" id={g.id} key={g.id}>
            <div className="panel-top">
              <Badge>{g.category}</Badge>
              <BookOpen size={17} />
            </div>
            <h2>{g.title}</h2>
            <p className="lead">{g.summary}</p>
            <ol>
              {g.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <Evidence ids={g.evidence.sources} />
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Search size={32} />
          <h2> Eşleşen rehber yok </h2>
          <p> Başka bir mekanik dene veya kategori filtresini temizle. </p>
          <button
            className="button"
            onClick={() => {
              setQ("");
              setCategory("Tümü");
            }}
          >
            {" "}
            Filtreleri temizle{" "}
          </button>
        </div>
      )}
    </>
  );
}
export function SourcesPage() {
  const [filter, setFilter] = useState("Tümü");
  const [region, setRegion] = useState("Tümü");
  return (
    <>
      <PageTitle
        title="İyi öneri dayanağını gösterir."
        description="Kaynaklar, sürüm sınırları ve açık sorular. Araştırma kontrol tarihi: 27 Ekim 2026."
        kicker="KAYNAK / GÜNCELLEMELER"
      />
      <div className="two-col">
        <section className="panel">
          <Badge tone="teal"> Doğrulanmış resmî yama </Badge>
          <h2> 21 Ekim · Hard Expedition </h2>
          <p>
            {" "}
            Krao Cave ve Draupnir Hard 2600 Item Level gerektirir. Ariel
            Fragment yeni PvE Daevanion tablosunu geliştirir. Boss Frenzy süresi
            dört dakika; oyuncu başına üç dirilme vardır.{" "}
          </p>
          <p>
            {" "}
            Sorcerer’ın Cold Storm ve Fire Wall becerileri düzeltildi;
            Chanter’ın Spinning Strike görsel efekti onarıldı.{" "}
          </p>
          <Evidence ids={["patch"]} confidence="Doğrulandı" />
        </section>
        <section className="panel">
          <Badge tone="gold"> Yaklaşan · 4 Kasım </Badge>
          <h2> Ludra bir hazırlık hedefi </h2>
          <p>
            {" "}
            Resmî duyuru 4 Kasım tarihini veriyor. Bildirilen eşikler normal
            için 2800, hard için 3000; yol haritası ödülleri şu anda
            toplanabilir saymıyor.{" "}
          </p>
          <Evidence ids={["ludra", "updates"]} />
        </section>
      </div>
      <SectionTitle title="Etiketler ne anlama geliyor?" />
      <div className="three-col">
        <div className="panel">
          <Badge tone="teal"> Doğrulandı </Badge>
          <p>
            {" "}
            Araştırmada doğrudan okunan resmî kanıt. Bir yamanın doğrulanması
            her yapı önerisinin doğrulandığı anlamına gelmez.{" "}
          </p>
        </div>
        <div className="panel">
          <Badge tone="gold"> Topluluk </Badge>
          <p>
            {" "}
            Belgelenmiş içerik üreticisi önerisi veya yayımlanmış oyun verisi.
            Sınırları olan yararlı kanıt; otomatik olarak fikir birliği veya
            ölçülmüş BiS değildir.{" "}
          </p>
        </div>
        <div className="panel">
          <Badge> Doğrulanmadı </Badge>
          <p>
            {" "}
            Eksik erişim, çelişkili veri veya sürüm farkı. Kesin hesap ve
            iddialı sıralama sunulmaz.{" "}
          </p>
        </div>
      </div>
      <SectionTitle title="Açık sorular ve kaynak uyuşmazlıkları" />
      <div className="disputes">
        <details open>
          <summary> Genus maliyetleri ve öncelikleri </summary>
          <p>
            {" "}
            Analiz tabloları maliyetin yuva mı analiz başına mı olduğu ve taban
            ücretin kilitlerle nasıl birleştiği konusunda uyuşmuyor. Kanon ile
            diğer Global rehberleri Max Attack / PvE-Boss Attack ve 4. yuva
            çarpanlarında da farklılaşıyor. Planlayıcı tercihleri açıklar;
            maliyet veya beklenen deneme hesaplamaz.{" "}
          </p>
        </details>
        <details>
          <summary> Arcana havuz düzeltmeleri ve EXP aktarımı </summary>
          <p>
            {" "}
            Hesaplayıcı verisinde Gladiator Defiance, Sorcerer Frost, Assassin
            Defense Break ve Chanter Impact Hit eksikti. Global havuz
            referansında bulunan bu beceriler eklendi. Kanon EXP kaybı ve aynı
            tür besleme bonusu anlatırken yeni Global rehberi farklı davranış
            belirtiyor. Kartı tüketmeden önce geliştirme önizlemesine bak.{" "}
          </p>
        </details>
        <details>
          <summary> BiS, güncel erişim ve KR referansları </summary>
          <p>
            {" "}
            Veritabanındaki en yüksek eşya seviyesi güncel elde edilebilirliği
            veya en iyi performansı kanıtlamaz. Eksiksiz eşya BiS sıralamaları,
            kesin destek yapıları ve bazı pasif öncelikleri doğrulanmadı. KR
            kanat sıralamaları, 50. seviye Pendant, ek Arcana türleri ve 25.
            seviye Stigma Global önerisi olarak etkin değil.{" "}
          </p>
        </details>
        <details>
          <summary> Birincil sınıf kanıtı ve referans belge </summary>
          <p>
            {" "}
            Kanon’un 12. bölümü NotMeter’a bağlantı verir. Araştırmada erişilen
            sayfa kullanılabilir önbellek yapı verisi sunmadı. Bu yüzden sınıf
            rehberleri ayrıca işaretlenmiş topluluk sentezini kullanıyor.
            Belgedeki bazı görseller KR verisidir; örneğin image51 eski KR yuva
            sırasını gösterir ve Global tablosu olarak kullanılmaz.{" "}
          </p>
        </details>
      </div>
      <div className="filter-row">
        <label className="field-label">
          {" "}
          Kanıt düzeyi{" "}
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {["Tümü", "Doğrulandı", "Topluluk", "Doğrulanmadı"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          {" "}
          Bölge{" "}
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            {["Tümü", "Global", "KR"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="source-registry">
        {sources
          .filter(
            (s) =>
              (filter === "Tümü" || s.confidence === filter) &&
              (region === "Tümü" || s.region.includes(region)),
          )
          .map((s) => (
            <article className="panel source-entry" key={s.id}>
              <div className="panel-top">
                <h3>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title} <ArrowUpRight size={14} />
                  </a>
                </h3>
                <Badge
                  tone={
                    s.confidence === "Doğrulandı"
                      ? "teal"
                      : s.confidence === "Topluluk"
                        ? "gold"
                        : "muted"
                  }
                >
                  {s.confidence}
                </Badge>
              </div>
              <div className="source-meta">
                <span>{s.region}</span>
                <span>{s.patch}</span>
                <span> Kontrol: {s.checked}</span>
              </div>
              <p>{s.note}</p>
              {s.document && <small>{s.document}</small>}
            </article>
          ))}
      </div>
      <Notice>
        {" "}
        Atıf: Kanon ve bağlantı verilen araştırmacılar çalışmalarının
        sahipleridir. Site özgün açıklamalar, olgusal veriler, nötr Lucide
        simgeleri ve özgün CSS süslemeleri kullanır. Oyun ekran görüntüleri veya
        üçüncü taraf çizimler yeniden dağıtılmaz.{" "}
      </Notice>
    </>
  );
}
