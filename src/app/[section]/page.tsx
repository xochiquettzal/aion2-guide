import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClassIndex } from "@/components/class-guide";
import { SoulBinding } from "@/components/soul-binding";
import { Arcana } from "@/components/arcana";
import { GenusPlanner } from "@/components/genus";
import { Progression } from "@/components/progression";
import { GuideLibrary, SourcesPage } from "@/components/library";
const pages = {
  classes: ClassIndex,
  "soul-binding": SoulBinding,
  arcana: Arcana,
  genus: GenusPlanner,
  progression: Progression,
  guides: GuideLibrary,
  sources: SourcesPage,
};
export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return {
    title:
      (
        {
          classes: "Sınıf rehberleri",
          "soul-binding": "Soul Binding",
          arcana: "Arcana planlayıcı",
          genus: "Genus Insight",
          progression: "İlerleme",
          guides: "Rehber kütüphanesi",
          sources: "Kaynaklar ve güncellemeler",
        } as Record<string, string>
      )[section] || "Rehber",
  };
}
export default async function Section({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const Component = pages[section as keyof typeof pages];
  if (!Component) notFound();
  return section === "soul-binding" ? (
    <Suspense fallback={<p role="status">Rehber yükleniyor…</p>}>
      <Component />
    </Suspense>
  ) : (
    <Component />
  );
}
