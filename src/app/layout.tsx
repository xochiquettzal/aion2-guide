import type { Metadata } from "next";
import { StoreProvider } from "@/components/store";
import { Shell } from "@/components/shell";
import "./globals.css";
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
          <Shell>{children}</Shell>
        </StoreProvider>
      </body>
    </html>
  );
}
