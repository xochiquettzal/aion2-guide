# AION 2 — Daeva Rehberi

Varsayılan dili **Türkçe** olan bağımsız Global PvE rehberi. Next.js App Router, React, TypeScript ve Tailwind CSS ile geliştirildi. Araştırma tarihi: **27 Ekim 2026**. Hesap, sunucu veritabanı veya ücretli API gerekmez.

**Yeni başlangıç deneyimi:** İlk girişte üç adımlı karakter değerlendirmesi açılır. Sınıf, GS, ekipman boşlukları, ana beceri seviyesi, Arcana, Genus, Soul Binding, Stigma ve isabet durumundan kişisel gelişim planı oluşturulur. Hedef, kaynak yaklaşımı ve süre tercihi plana yön verir. Ana sayfa ilk önceliği, günlük odağı ve sekiz alanın durumunu gösterir. Koyu panel tasarımı, mint vurgu ve okunaklı kartlarla yenilendi.

Bilmediğin bilgileri boş bırakabilirsin: bunlar eksik veya tamamlanmış sayılmaz. Değerlendirme sınıfa göre kaydedilir; sonraki ziyarette planın açılır. **Durumumu güncelle** ile bilgileri yenileyebilirsin. İstersen ilk değerlendirmeyi atlayıp rehberleri keşfedebilirsin. Ayrıntılar: [Gelişim koçu teslim notu](docs/GELISIM-KOCU.md).

**Yayınlamak için:** [GitHub Pages kurulum rehberini aç](docs/GITHUB-PAGES.md). Depo oluşturma, ilk yükleme, Pages ayarı ve sonraki güncellemeler adım adım anlatılıyor. Bu proje henüz yayınlanmadı.

## Bilgisayarında çalıştır

Node.js 22.9 veya üstü ve npm gerekir. Proje klasöründe:

```powershell
npm.cmd ci
npm.cmd run dev
```

[Yerel önizleme](http://127.0.0.1:3000) adresini aç. Durdurmak için terminalde Ctrl+C kullan. Normal üretim önizlemesi için `npm.cmd run build`, ardından `npm.cmd run start` çalıştır.

## İçerik ve araçlar

- Sekiz sınıfa özel rehber, beceri öncelikleri, rol seçenekleri ve ekipman önerileri.
- 18 ekipman kategorisi için Soul Binding kısa listeleri ve koru/yenile danışmanı.
- Beş kartlı Arcana planlayıcı; sınıfa göre havuz, benzersiz satır kontrolü ve kayıtlı kart setleri.
- Beş Genus tablosunda toplam 45 yuva, seviyeye bağlı kilitler ve öneriler.
- Sekiz GS aşaması, karakter profili, sıradaki geliştirmeler ve işaretlenebilir hedefler.
- 14 sistem rehberi, Türkçe karakterlere duyarlı arama ve 21 kaynak kaydı.
- Mobil menü, klavye erişimi ve cihazda saklanan tercihler.

Arayüz, rehber açıklamaları ve planlayıcı mesajları Türkçedir. Oyun içinde eşleştirebilmen için sınıf, beceri, istatistik ve kart adları özgün biçimleriyle korunur. İngilizce dil seçeneği sunulmaz.

## GitHub Pages çıktısını yerelde dene

PowerShell ile örnek depo yolu altında derle:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/aion2-guide"
npm.cmd run build:pages
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
npm.cmd run preview:pages
```

[Statik önizlemeyi aç](http://127.0.0.1:4173/aion2-guide/). `out/` klasörü yayın çıktısıdır. GitHub Actions gerçek depo yolunu Pages ayarlarından otomatik alır; kaynak kodda kullanıcı adı veya depo adı değiştirmen gerekmez. Statik önizleme için `npm run start` kullanılmaz.

## Kontroller

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run test:e2e
npm.cmd run format:check
```

`test:e2e`, normal üretim derlemesini 3000 portunda açar ve yedi tarayıcı senaryosu çalıştırır. Önce çalışan geliştirme sunucusunu kapat. Testler kurulu Google Chrome kullanır.

Statik derlemeden sonra `npm.cmd run test:pages`, 4173 portunda GitHub Pages davranışını sınar: 16 içerik sayfası, masaüstü/mobil taşma kontrolü, alt dizin bağlantıları, ön yükleme dosyaları, doğrudan açılış, yenileme ve kayıtlı sınıf. Test sunucularını Playwright kendisi açıp kapatır; bu komut sırasında ayrı bir Pages önizlemesi çalışmasın.

## Proje yapısı

| Dizin                         | İçerik                                                             |
| ----------------------------- | ------------------------------------------------------------------ |
| `src/data/`                   | Türkçe rehber metinleri, sınıflar, havuzlar, ilerleme ve kaynaklar |
| `src/components/`             | Sayfalar, ortak arayüz ve tarayıcı kayıtları                       |
| `src/lib/engine.ts`           | Doğrulama ve nitel öneri kuralları                                 |
| `src/i18n/`                   | Türkçe ortak mesajlar, sayı biçimi ve arama normalleştirmesi       |
| `src/app/`                    | Sayfa yolları, meta veriler ve stiller                             |
| `tests/`                      | Veri, davranış ve statik yayın testleri                            |
| `.github/workflows/pages.yml` | GitHub Pages derleme ve yayın akışı                                |
| `scripts/`                    | Pages derleme/önizleme ve isteğe bağlı belge çıkarma araçları      |
| `docs/`                       | Yayın talimatları, araştırma ve tasarım notları                    |

## Kayıtlar ve içerik sınırları

`aion2-fieldguide-v1` localStorage kaydı; seçili sınıfı, karakter profilini, sınıfa özel Arcana planlarını, Genus seviyelerini/kilitlerini ve hedef işaretlerini tutar. Hesap veya bulut senkronizasyonu yoktur. Yerel önizleme ile GitHub alan adı farklı olduğundan tarayıcı kayıtları kendiliğinden taşınmaz. Çeviri sırasında kayıt anahtarı ve oyun kimlikleri korundu.

Bu çalışma eksiksiz, bağımsız ölçülmüş eşya bazında BiS veritabanı değildir. Topluluk önerileri etiketlenir; kesin DPS sıralamaları, yenileme olasılıkları, çelişkili Genus maliyetleri veya garantili GS kazançları uydurulmaz. [Araştırma notları](docs/RESEARCH.md) ve site içindeki kaynak sayfası sınırları açıklar.

Kanon’un referans DOCX dosyası, çıkarılan ham metinler ve oyun görselleri Git dışında tutulur. Site özgün açıklamalar, Lucide simgeleri ve CSS süslemeleri kullanır. [Atıflar](docs/ATTRIBUTION.md). Araştırma tarihi, içeriğin gelecekteki yamalar için otomatik olarak güncel olduğu anlamına gelmez.
