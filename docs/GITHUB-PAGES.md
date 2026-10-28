# AION 2 rehberini GitHub Pages ile yayınlama

Site Türkçe ve GitHub Pages için hazır. Aşağıdaki adımları sen tamamladığında yayınlanacak. Henüz bir GitHub deposu oluşturulmadı veya dosya yüklenmedi.

## 1. Boş bir GitHub deposu oluştur

1. GitHub hesabınla giriş yap ve [yeni depo sayfasını](https://github.com/new) aç.
2. **Repository name:** `aion2-guide` yaz. Başka bir ad da kullanabilirsin; yayın akışı yolu otomatik bulur.
3. **Public** seç. GitHub Free planında Pages herkese açık depolarda kullanılabilir. Kaynak: [GitHub Pages yayın koşulları](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
4. **Add a README file**, **Add .gitignore** ve **Choose a license** seçeneklerini boş bırak; mevcut projeyi yükleyeceğiz.
5. **Create repository** düğmesine bas.
6. Açılan sayfadaki HTTPS depo adresini kopyala. Biçimi `https://github.com/KULLANICI_ADIN/aion2-guide.git` olacaktır.

## 2. Bu projeyi depoya yükle

PowerShell aç. Aşağıdaki komutları sırayla çalıştır:

```powershell
Set-Location 'C:\Users\Emre\Documents\ChatGPT\aion2-guide'
git status
git add .
git commit -m "Turkce AION 2 rehberi ve GitHub Pages yayini"
git branch -M main
```

Proje klasöründe Git deposu zaten başlatılmıştır. `git add .` kaynak kodu ve yayın ayarlarını ekler. `.gitignore`, `node_modules`, `out`, `.next`, referans DOCX ve `research` dosyalarını dışarıda tutar.

Commit sırasında **Author identity unknown** hatası alırsan aşağıdaki iki komutta kendi adını ve GitHub hesabında kullandığın e-posta adresini yaz; ardından `git commit` ve `git branch` komutlarını tekrar çalıştır. GitHub Settings → Emails bölümündeki noreply adresini de kullanabilirsin.

```powershell
git config user.name "Adin"
git config user.email "GitHub-eposta-adresin"
```

Şimdi aşağıdaki örnek URL yerine 1. adımda kopyaladığın gerçek HTTPS adresini yaz:

```powershell
git remote add origin https://github.com/KULLANICI_ADIN/aion2-guide.git
git push -u origin main
```

GitHub oturum açma penceresi gelirse tarayıcıda hesabınla giriş yap. GitHub hesap şifresini terminale yazman gerekmez. `remote origin already exists` hatası alırsan `git remote -v` ile adresi kontrol et; yanlışsa `git remote set-url origin GERCEK_DEPO_ADRESI` kullanıp push komutunu tekrarla.

## 3. GitHub Pages ayarını aç

1. GitHub’da deponun sayfasına dön ve dosyaların yüklendiğini kontrol et.
2. **Settings → Pages** bölümünü aç.
3. **Build and deployment → Source** alanında **GitHub Actions** seç.

Projede yayın dosyası zaten var: `.github/workflows/pages.yml`. GitHub’ın önerdiği yeni bir Next.js şablonunu eklemene veya `gh-pages` dalı oluşturmana gerek yok. Resmî adımlar: [Yayın kaynağını yapılandırma](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 4. İlk yayını başlat

1. Deponun **Actions** sekmesine gir.
2. Soldan **GitHub Pages yayını** iş akışını seç.
3. **Run workflow → Branch: main → Run workflow** seç.
4. Açılan çalıştırmada `build` ve `deploy` işlerinin yeşil olmasını bekle.
5. `deploy` işinin **github-pages** bağlantısından veya **Settings → Pages → Visit site** üzerinden siteyi aç.

İlk push, Pages henüz etkin olmadığı için başarısız bir çalışma oluşturmuş olabilir. 3. adımdan sonra yeni bir **Run workflow** çalıştırman yeterlidir.

Normal bir proje deposunun adresi `https://KULLANICI_ADIN.github.io/aion2-guide/` biçimindedir. Depoya farklı bir ad verdiysen son bölüm o ad olur. Kesin adresi GitHub’ın **Visit site** bağlantısından al.

Akış bağımlılıkları kurar, lint ve veri testlerini çalıştırır, statik dosyaları üretir ve Pages’e yükler. Kendi sunucunu açık tutman gerekmez. Ayrı bir API anahtarı veya secret eklemene gerek yoktur; yayın izinleri iş akışında tanımlıdır. [GitHub’ın özel Pages iş akışı belgeleri](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 5. Yayını kontrol et

- Ana sayfa Türkçe açılmalı.
- Bir sınıf seç; sınıf rehberine git ve sayfayı yenile.
- Arcana planlayıcıda bir kartı değiştir; yenileyince kaydın korunmalı.
- Telefonunda menüyü açıp İlerleme ve Kaynaklar sayfalarına geç.
- Bir alt sayfanın adresini yeni sekmede doğrudan aç; örneğin sitenin adresinin sonuna `arcana/` ekle.

Seçimler her ziyaretçinin kendi tarayıcısında tutulur. Bu bilgisayardaki yerel önizleme kayıtları yayın adresine otomatik taşınmaz.

## Sonraki güncellemeler

Proje dosyalarında değişiklik yaptıktan sonra:

```powershell
Set-Location 'C:\Users\Emre\Documents\ChatGPT\aion2-guide'
git add .
git commit -m "Rehber icerigini guncelle"
git push
```

Her `main` push işlemi yeni yayını otomatik başlatır. Durumu **Actions** bölümünden görebilirsin. Oyun içeriği 27 Ekim 2026 araştırma tarihini taşır; ilerideki yamaları kaynaklara göre ayrıca güncelle.

## Sorun giderme

| Belirti                            | Yapılacak işlem                                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `configure-pages` adımı başarısız  | Settings → Pages → Source: GitHub Actions ayarını doğrula ve akışı yeniden çalıştır.                                         |
| Actions kapalı görünüyor           | Depoda Settings → Actions → General üzerinden iş akışlarına izin ver; kuruluş deposunda yöneticinin kuralı geçerli olabilir. |
| Ana sayfa 404                      | `deploy` işinin yeşil olduğunu ve Visit site adresini kullandığını kontrol et.                                               |
| CSS veya alt sayfalar 404          | `out` klasörünü elle yüklemek yerine hazırlanan Actions akışını çalıştır; depo yolu derleme sırasında otomatik eklenir.      |
| Push reddediliyor                  | Remote adresini ve hesabının yazma yetkisini kontrol et. İlk adımda boş depo kullan; force push yapma.                       |
| `git` komutu bulunamıyor           | Git for Windows kurulumunu tamamla, yeni PowerShell aç ve 2. adımdan devam et.                                               |
| Yerelde `npm.ps1` çalıştırılamıyor | Rehberdeki gibi `npm.cmd` kullan.                                                                                            |

## İsteğe bağlı: yayın çıktısını bilgisayarında dene

Bu işlem GitHub’a dosya göndermez. Node.js 22.9 veya üstü gerekir.

```powershell
Set-Location 'C:\Users\Emre\Documents\ChatGPT\aion2-guide'
npm.cmd ci
$env:NEXT_PUBLIC_BASE_PATH = "/aion2-guide"
npm.cmd run build:pages
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
npm.cmd run preview:pages
```

[Statik önizlemeyi aç](http://127.0.0.1:4173/aion2-guide/). Önizlemeyi Ctrl+C ile kapat. `build:pages` çıktısı `out/` içindedir; Git’e eklenmesi gerekmez.
