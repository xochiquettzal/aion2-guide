import { notFound } from "next/navigation";
import { classes } from "@/data/classes";
import { ClassGuide } from "@/components/class-guide";
export function generateStaticParams() {
  return classes.map((c) => ({ id: c.id }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `${classes.find((c) => c.id === id)?.name || "Class"} PvE rehberi`,
  };
}
export default async function ClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = classes.find((c) => c.id === id);
  if (!c) notFound();
  return <ClassGuide key={c.id} id={c.id} />;
}
