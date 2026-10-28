"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers, Gem, Orbit } from "lucide-react";
import { classes, classById } from "@/data/classes";
import type { ClassId } from "@/data/types";
import { useGuideStore } from "./store";
import {
  Badge,
  ClassIcon,
  Evidence,
  Notice,
  PageTitle,
  SectionTitle,
} from "./common";
export function ClassIndex() {
  return (
    <>
      <PageTitle
        title="Oyun tarzını bul."
        description="Sekiz Global sınıf. Farklı beceri döngüleri, eşikler ve tercihler."
      />
      <div className="class-index">
        {classes.map((c) => (
          <Link
            className="panel class-index-card"
            key={c.id}
            href={`/classes/${c.id}/`}
            style={{ "--class-color": c.color } as React.CSSProperties}
          >
            <ClassIcon id={c.id} size={39} />
            <Badge>{c.weapon}</Badge>
            <h2>{c.name}</h2>
            <span className="muted">{c.role}</span>
            <p>{c.summary}</p>
            <span className="text-link">
              {" "}
              Yapı rehberini oku <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
export function ClassGuide({ id }: { id: ClassId }) {
  const { change, ready } = useGuideStore();
  const c = classById[id];
  const [tab, setTab] = useState("Genel bakış");
  const [kind, setKind] = useState("Tümü");
  const [variant, setVariant] = useState(0);
  useEffect(() => {
    if (ready) change((s) => (s.classId === id ? s : { ...s, classId: id }));
  }, [id, ready, change]);
  return (
    <>
      <div className="class-page-title">
        <div className="class-emblem large" style={{ color: c.color }}>
          <ClassIcon id={id} size={58} />
        </div>
        <PageTitle
          title={`${c.name} rehberi`}
          description={c.role + " · " + c.weapon}
          kicker="SINIF REHBERLERİ / GLOBAL PVE"
        />
        <Badge tone="gold"> Topluluk önerisi </Badge>
      </div>
      <div className="tabs" role="tablist" aria-label="Sınıf rehberi bölümleri">
        {["Genel bakış", "Beceriler", "Ekipman", "Arcana ve Genus"].map((t) => (
          <button
            role="tab"
            aria-selected={tab === t}
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Genel bakış" && (
        <>
          <div className="two-col">
            <section className="panel">
              <SectionTitle title="Yapının temeli" />
              <p className="lead">{c.summary}</p>
              <label className="field-label">
                {" "}
                Yapı seçeneği{" "}
                <select
                  value={variant}
                  onChange={(e) => setVariant(+e.target.value)}
                >
                  {c.variants.map((v, i) => (
                    <option value={i} key={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </label>
              <Notice>{c.variants[variant].detail}</Notice>
              <Evidence ids={c.evidence.sources} />
            </section>
            <section className="panel">
              <SectionTitle title="Beceri döngüsü" />
              <ol className="numbered-list">
                {c.rotation.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p className="muted">
                {" "}
                Bu sırayı karşılaşmanın mekaniklerine göre uygula. Sabit bir
                döngü her boss’a uymaz.{" "}
              </p>
            </section>
          </div>
          <SectionTitle title="Seninle gelişen bir yapı" />
          <div className="three-col">
            {[
              { name: "Başlangıç", text: c.early },
              { name: "Orta aşama", text: c.mid },
              { name: "Son aşama hedefi", text: c.late },
            ].map((s, i) => (
              <section className="panel stage-card" key={s.name}>
                <span className="stage-number">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </section>
            ))}
          </div>
          <Notice tone="warning">
            {" "}
            Burada yaması doğrulanmış, eşya eşya eksiksiz bir BiS listesi
            sunulmuyor. Öneriler belgelenmiş beceri ve yararlı statlara dayanır;
            gelecekteki baskın eşyaları elde edilebilir gösterilmez.{" "}
          </Notice>
        </>
      )}
      {tab === "Beceriler" && (
        <>
          <SectionTitle
            title="Yapıyı değiştiren eşiklere yatırım yap"
            description="Aktif, pasif ve Stigma önceliklerinin kaynak maliyetleri ayrıdır."
          />
          <div className="filter-row">
            {["Tümü", "Aktif", "Pasif", "Stigma"].map((k) => (
              <button
                className={`chip ${k === kind ? "selected" : ""}`}
                onClick={() => setKind(k)}
                key={k}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th> Öncelik </th>
                  <th> Beceri </th>
                  <th> Tür </th>
                  <th> Hedef </th>
                  <th> Neden önemli? </th>
                </tr>
              </thead>
              <tbody>
                {c.skills
                  .filter((s) => kind === "Tümü" || s.kind === kind)
                  .map((s, i) => (
                    <tr key={s.name}>
                      <td className="muted">
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <strong>{s.name}</strong>
                      </td>
                      <td>
                        <Badge>{s.kind}</Badge>
                      </td>
                      <td className="gold-text">
                        {s.target ? `Sv. ${s.target}` : "Sabit hedef yok"}
                      </td>
                      <td>{s.why}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Evidence ids={c.evidence.sources} />
          <div className="breakpoint-grid">
            {[
              {
                n: 12,
                t: "İkinci uzmanlık yuvası",
                d: "12. seviye seçeneğini aç ve ikinci uzmanlığı kuşan.",
              },
              {
                n: 16,
                t: "Son uzmanlık seçeneği",
                d: "Yapıyı belirleyen 16. seviye seçeneğini seç; hâlâ iki yuvan vardır.",
              },
              {
                n: 20,
                t: "Üçüncü uzmanlık yuvası",
                d: "Üç uzmanlık seçeneğini birlikte kuşan.",
              },
            ].map((b) => (
              <div className="panel" key={b.n}>
                <b className="big-number">{b.n}</b>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
          <Notice>
            {" "}
            Bu eşikler aktif beceriler içindir. Pasiflerin uzmanlığı yoktur;
            Stigma kendi özellik basamaklarını izler. Ek aktif seviyeler
            ekipman, Arcana ve Daevanion’dan gelir.{" "}
          </Notice>
        </>
      )}
      {tab === "Ekipman" && (
        <>
          <SectionTitle title="Yapını sonraki eşiğe göre kur" />
          <div className="two-col">
            <section className="panel">
              <h3> Silah, guard ve yüzükler </h3>
              <p>
                {" "}
                Bu yuvalar aktif beceri seviyesi taşıyabilir. Şu becerinin
                satırını değerlendir: <strong>{c.skills[0].name}</strong> Bir
                statla değiştirmeden önce sonraki beceri eşiğini kontrol
                et.{" "}
              </p>
              <Link href="/soul-binding/" className="button">
                <Gem size={16} /> Tüm yuvaları incele{" "}
              </Link>
            </section>
            <section className="panel">
              <h3> Zırh, kolye ve küpeler </h3>
              <p>
                {" "}
                Bunlar pasif beceri seviyesi taşır. Sınıf öncelikleri:{" "}
                {c.skills
                  .filter((s) => s.kind === "Pasif")
                  .map((s) => s.name)
                  .join(" ve ")}{" "}
                . Kesin pasif hedefleri geçicidir.{" "}
              </p>
              <p className="muted">
                {" "}
                Yararlı bir Attack satırı ekonomik alternatiftir. İsabet ve
                savunmayı karşılaşmaya göre ayarla.{" "}
              </p>
            </section>
          </div>
          <Notice tone="warning">
            {" "}
            Normal bağlama satırları ve ek Philosopher satırı aktarımda farklı
            davranır. Yuvalar ve Theostone için yenileme bütçesi gerekir. Oyun
            içindeki önizlemeyi incele.{" "}
          </Notice>
          <Evidence ids={["kanon", `class-${id}`]} />
        </>
      )}
      {tab === "Arcana ve Genus" && (
        <>
          <div className="two-col">
            <section className="panel">
              <Layers className="gold-text" />
              <h2> Arcana kurulumu </h2>
              <p>
                {" "}
                Şu beceriyi taşıyan kartlara öncelik ver: {c.skills[0].name} .
                Planlayıcı kartları bu sınıfın belgelenmiş havuzuyla sınırlar ve
                yinelenen satırları engeller.{" "}
              </p>
              <Link href="/arcana/" className="button primary">
                {" "}
                Planla: {c.name} Arcana <ArrowRight size={16} />
              </Link>
            </section>
            <section className="panel">
              <Orbit className="teal-text" />
              <h2> Genus öncelikleri </h2>
              <p>
                {id === "assassin"
                  ? "Tutarlı biçimde arkadan saldırabiliyorsan Varian'da Back Attack Damage Boost yararlıdır."
                  : ["gladiator", "templar"].includes(id)
                    ? "Konumlanman tutarlıysa Varian önden hasarı destekleyebilir."
                    : "PvE Damage Boost, konum koşulu olmadan esnek bir Varian hedefi sunar."}{" "}
                Special 4. yuva hedefi Double Chance’tir.{" "}
              </p>
              <Link href="/genus/" className="button">
                {" "}
                Beş tablo planlayıcısını aç <ArrowUpRight size={16} />
              </Link>
            </section>
          </div>
          <Evidence ids={["kanon", "genus-advice", "pools", "pool-check"]} />
        </>
      )}
    </>
  );
}
