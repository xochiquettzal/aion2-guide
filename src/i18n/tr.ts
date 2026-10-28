// Türkçe varsayılan arayüz ve sayı biçimleri.
export const tr = {
  language: "tr",
  numberLocale: "tr-TR",
  navigation: {
    overview: "Genel bakış",
    classes: "Sınıf rehberleri",
    binding: "Soul Binding",
    arcana: "Arcana planlayıcı",
    genus: "Genus Insight",
    progression: "İlerleme",
    guides: "Rehber kütüphanesi",
    sources: "Kaynaklar ve güncellemeler",
  },
  saved: "Bu cihazda kaydedildi",
  loading: "Tercihler yükleniyor…",
} as const;
export type Messages = {
  language: string;
  numberLocale: string;
  navigation: { [K in keyof typeof tr.navigation]: string };
  saved: string;
  loading: string;
};
