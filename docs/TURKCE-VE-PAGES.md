# Türkçe ve GitHub Pages teslim notu

28 Ekim 2026. Varsayılan sayfa dili `tr`; sayı biçimi `tr-TR`. Menüler, sekiz sınıfın açıklamaları, 14 sistem rehberi, sekiz ilerleme aşaması, kaynak notları, form etiketleri ve planlayıcı mesajları Türkçeleştirildi. Oyun içindeki sınıf, beceri, stat, kart ve tablo adları ile kayıt kimlikleri korundu.

Arama, `İ/i` ve `I/ı` farklılıklarını ve aksanları normalleştirir; örneğin `İLERLEME` ve `ilerleme` aynı sonuçları bulur. Tarayıcı kayıt anahtarı değişmedi.

## Yayın hazırlığı

- `build:pages`, statik `out/` çıktısını üretir. Depo alt yolu `NEXT_PUBLIC_BASE_PATH` ile derleme sırasında eklenir.
- `.github/workflows/pages.yml`, `main` push veya elle başlatma ile derler ve yayınlar. Gerçek depo yolu GitHub Pages ayarlarından alınır.
- Windows dışa aktarımında iç içe oluşan Next segment ön yükleme dosyaları için, tarayıcının istediği noktalı adlarla kopyalar üretilir. Doğru adla zaten oluşturulan dosyalar değiştirilmez.
- `preview:pages`, statik dosyaları gerçek dizin yollarıyla sunar; eksik sayfaları ana sayfaya yönlendiren bir SPA hilesi kullanmaz.
- [Yayın rehberi](GITHUB-PAGES.md), sıfırdan boş depo oluşturmayı ve siteyi açmayı anlatır.

## Doğrulama

- ESLint, TypeScript ve biçim kontrolü geçti.
- Yedi veri/kural testi geçti.
- Türkçe normal üretim sürümünde yedi tarayıcı senaryosu geçti: sınıf ve sekme seçimi, Soul Binding, Arcana, Genus, ilerleme kayıtları, filtreler ve mobil gezinme.
- `/aion2-guide/` altında son statik derlemede iki Pages tarayıcı senaryosu geçti. 16 içerik rotası 1440 ve 390 pikselde açıldı; yatay taşma, sayfa çalışma hatası veya başarısız varlık isteği görülmedi. Menü geçişleri, aktif menü, sınıf değiştirme, doğrudan sayfa açma, yenileme, Türkçe arama ve kayıtlı sınıf doğrulandı.
- Masaüstü ve mobil görünüm görsel olarak incelendi. Yeni görüntüler: `reports/turkce-masaustu.png` ve `reports/turkce-mobil.png`.

GitHub üzerinde çalıştırılmış bir Actions sonucu veya canlı yayın doğrulaması henüz yoktur. Kullanıcının isteğiyle depo oluşturma, push ve yayın işlemleri kullanıcıya bırakıldı. Oyun araştırma tarihi **27 Ekim 2026** olarak korunur; bu güncelleme yeni oyun araştırması yapıldığı anlamına gelmez.
