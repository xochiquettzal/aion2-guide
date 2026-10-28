import type { Metadata } from "next";
import { StoreProvider } from "@/components/store";
import { Shell } from "@/components/shell";
import { AssessmentGate } from "@/components/assessment-wizard";
import "./globals.css";
import "./coach.css";
export const metadata: Metadata = {
  title: {
    default: "AION 2 · Daeva Rehberi",
    template: "%s · AION 2 Rehberi",
  },
  description:
    "AION 2 için bağımsız Türkçe Global PvE rehberi. Kaynaklarıyla sınıf yapıları, Soul Binding, Arcana, Genus Insight ve karakter ilerlemesi.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <StoreProvider>
          <AssessmentGate>
            <Shell>{children}</Shell>
          </AssessmentGate>
        </StoreProvider>
      </body>
    </html>
  );
}
