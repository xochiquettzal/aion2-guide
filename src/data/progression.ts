import type { Milestone } from "./types";
export const milestones: Milestone[] = [
  {
    min: 700,
    max: 1000,
    name: "Temelleri tamamla",
    unlock:
      "Abyss için 1000 Item Level hedefle; karakter seviyesi ve görev koşullarını da kontrol et.",
    gear: "45. seviye hikâye ekipman setini tamamla ve boş yuvaları kontrol et.",
    enhance:
      "Silah ve guard için ekonomik geliştirmeleri seç; her adımın maliyetini kontrol et.",
    daily:
      "Mühürlü zindanları ve yan görevleri tamamla; Nightmare ve Shugo ödüllerine bak.",
    weekly:
      "Sıfırlanmadan önce haftalık mağazalardaki beceri ve gelişim malzemelerini incele.",
    energy:
      "Doğal yenilenen enerjiyi düzenli bitirebildiğin içeriklerde kullan. Tüketilebilir enerjiyi belirli bir yükseltmeye ayır.",
    arcana:
      "Karakter seviyesi 45 olduğunda beş Arcana yuvasını kontrol et. Transcendence farmı daha sonra açılır.",
    horizontal: "Tılsım ve kemer gelişimi için tüy ve kale ödüllerini topla.",
    avoid:
      "Kısa süre kullanacağın görev ekipmanında kusursuz yuva satırları arama.",
    steps: [
      "45. seviye hikâyeyi tamamla ve ödüllerini kuşan.",
      "Tüy ve kale parşömenlerini topla.",
      "İki rün yuvasını incele ve eksik ekipmanı tamamla.",
      "Görünen Item Level değerini 1000 yap, ardından Abyss giriş ekranını kontrol et.",
    ],
    sources: ["roadmap", "kanon"],
  },
  {
    min: 1000,
    max: 1400,
    name: "Dengeli bir ekipman düzeni kur",
    unlock:
      "Abyss 1000 seviyesinde açılır; sonraki Conquest kademesi 1400 olarak listeleniyor.",
    gear: "Kemer ve tılsımı kendi parşömen ve dönüştürme sistemleriyle Unique kalitesine ilerlet.",
    enhance:
      "Pahalı üst seviye denemelerden önce kullanmaya devam edeceğin zayıf yuvaları geliştir.",
    daily: "Yan görevler, mühürlü zindanlar ve düzenli Conquest tamamlamaları.",
    weekly:
      "Erişebildiğin mağazalarda yararlı Wisdom Stone ve Stigma kaynaklarına öncelik ver.",
    energy:
      "İhtiyacın olan eşya veya malzemeyi veren içeriğe harca. Doğal yenilenmenin dolup taşmasını önle.",
    arcana:
      "Farm erişimi açılmadan yalnızca puanı şişirmek için kusursuz kartlar satın alma.",
    horizontal: "Genel Daevanion puanlarını temel beceri düğümlerine ayır.",
    avoid:
      "Bir PvP tablosu, zindan hasarını geliştirmeden Item Level artırabilir.",
    steps: [
      "Kalan yan görevleri ve mühürlü zindanları tamamla.",
      "Kemer ve tılsımı doğru parşömenlerle geliştir.",
      "Genel Daevanion beceri düğümlerine puan ver.",
      "1400 seviyesine ulaş ve sonraki Conquest kademesini oyun içinde doğrula.",
    ],
    sources: ["roadmap", "kanon"],
  },
  {
    min: 1400,
    max: 1600,
    name: "Transcendence için hazırlan",
    unlock:
      "Mevcut yol 2. kademe Conquest; Transcendence 1. aşama 1600 olarak listeleniyor.",
    gear: "Ekipman değişimleri için Vakron Sky Island ödüllerine bak; yararlı bağlama satırlarını koru.",
    enhance:
      "Maliyet uygunsa önce silah ve guard; boş yuvaları ve düşük kaliteli parçaları tamamla.",
    daily:
      "Düzenli bitirebildiğin Conquest içeriğini tekrarla ve beceri puanı ödüllerini al.",
    weekly: "Transfer Fragment biriktir ve malzeme mağazalarını kontrol et.",
    energy: "Transcendence açılana kadar düzenli Conquest ödüllerini seç.",
    arcana: "Kristal harcamadan önce ana becerinin çıkabildiği kartı planla.",
    horizontal:
      "Temel aktif beceri eşikleri, içeriği rahat bitirmek için ek puandan daha önemli olabilir.",
    avoid: "Küçük ve geçici bir değişim için Heroic aktarım malzemesi harcama.",
    steps: [
      "İhtiyacın olan 2. kademe Conquest ödüllerini topla.",
      "Kemer, tılsım ve rünlerde ihmal edilen geliştirmeleri kontrol et.",
      "Yükseltmeden önce nadir ve yararlı bağlama satırlarını koru.",
      "1600 seviyesine ulaş; 1. aşamanın seviye ve giriş koşullarını doğrula.",
    ],
    sources: ["roadmap", "kanon"],
  },
  {
    min: 1600,
    max: 1900,
    name: "Arcana kurulumunu tamamla",
    unlock: "Transcendence 1. aşama; 2. aşama 1900 olarak listeleniyor.",
    gear: "Beş Arcana yuvasını doldururken Conquest ekipmanını kullan.",
    enhance:
      "Yararlı becerili kartları adım adım geliştir; bütün kaynakları kötü bir karta yatırma.",
    daily:
      "Eksik kart türlerine göre Transcendence zindanları arasında seçim yap.",
    weekly:
      "İlk hedefli kartın için eğitim malzemelerini ve üretim ilerlemesini kontrol et.",
    energy:
      "Ödülleri eksik ekipman ve Arcana arasında paylaştır; düzenli bitirilen içerik daha verimlidir.",
    arcana:
      "Temel beceri eşiğini tamamlıyorsa ekonomik kart kullan. Uygun olduğunda Chalice üretimini hedefle.",
    horizontal: "Enerji yenilenirken pet ve genel Daevanion gelişimini sürdür.",
    avoid:
      "Kart geliştirme rastgele bir satırı artırır; ana beceriyi garanti etmez.",
    steps: [
      "Beş Arcana yuvasını kullanılabilir kartlarla doldur.",
      "Temel becerinin doğru kart havuzunda olduğunu kontrol et.",
      "Ulaşılabilir bir beceri eşiğini tamamla.",
      "1900 seviyesine ulaş ve puanın başarıyı garanti etmediğini bilerek 2. aşamayı öğren.",
    ],
    sources: ["roadmap", "arcana", "kanon"],
  },
  {
    min: 1900,
    max: 2100,
    name: "Hasarını sağlamlaştır",
    unlock:
      "Transcendence 2. aşama; 3. kademe Conquest 2100 olarak listeleniyor.",
    gear: "Üretilen aksesuarları ve mevcut ekipmanı değişim maliyetiyle birlikte karşılaştır.",
    enhance:
      "Aktarım bütçesini tüketmeden yararlı kartları ve temel ekipmanı geliştir.",
    daily:
      "Beceri seviyeleri ve üretim malzemeleri için Transcendence tekrarla.",
    weekly:
      "Stigma alışverişlerini kontrol et ve nadir aktarım kaynaklarını koru.",
    energy: "Rastgele farm yerine eksik kartının düştüğü zindanı hedefle.",
    arcana:
      "Beceri eşiğini tamamlayan ekonomik birleşimleri koru; zayıf kartları tek tek değiştir.",
    horizontal:
      "Temel Stigma’yı geliştir ve az kilitle Genus seviyelerini yükselt.",
    avoid:
      "Petlerden gelen Combat Power artışını Item Level giriş eşiği ilerlemesiyle karıştırma.",
    steps: [
      "Sonraki aktif ve Stigma eşiğini gözden geçir.",
      "Malzeme harcamadan önce aksesuar geliştirmelerini karşılaştır.",
      "Arcana satırlarını geçerli havuzları içinde iyileştir.",
      "2100 seviyesine ulaş ve 3. kademe Conquest ödüllerini incele.",
    ],
    sources: ["roadmap", "kanon", "arcana"],
  },
  {
    min: 2100,
    max: 2500,
    name: "Puanı tamamlama hızına dönüştür",
    unlock:
      "3. kademe Conquest. Transcendence 4. aşama 2500 olarak listeleniyor.",
    gear: "Teorik en yüksek iLvl listesi yerine gerçek düşen eşya ve tariflere göre uzun ömürlü parçalar seç.",
    enhance:
      "Kalıcı ekipman geliştirmelerini beceri ve Arcana gelişimiyle dengele.",
    daily:
      "Grubunun düzenli bitirebildiği en yüksek yararlı kademeyi tekrarla.",
    weekly: "Kinah, Stigma malzemeleri ve aktarım bütçesini birlikte planla.",
    energy:
      "Somut bir ödül hedefi seç; yalnızca ekrandaki puan için harcama yapma.",
    arcana:
      "Hedefli Chalice ve güçlü pasif kartlar uzun vadeli projeler hâline gelir.",
    horizontal:
      "Gerçek savaş performansı için pet, Genus ve temel pasifleri geliştir.",
    avoid: "İçeriğin giriş eşiği, önerilen Combat Power gereksinimi değildir.",
    steps: [
      "İçeriği bitirmeni sınırlayan mekanik veya hasar sorununu belirle.",
      "O sorunu çözen beceri, pasif veya savunma satırını geliştir.",
      "Belirli bir ekipman veya Arcana ödülünü hedefle.",
      "Dengeli hasar döngüsüyle 2500 seviyesine ulaş.",
    ],
    sources: ["roadmap", "kanon"],
  },
  {
    min: 2500,
    max: 2800,
    name: "Hard Expedition hazırlığı",
    unlock:
      "2500 seviyesinde 4. aşama Transcendence; 2600 seviyesinde Krao Cave ve Draupnir Hard.",
    gear: "Hard Expedition ödülleri ve üretim malzemelerini mevcut ekipmanınla karşılaştır.",
    enhance:
      "Kaynaklarını bir sonraki aktarımdan sonra da değerini koruyacak geliştirmelere ayır.",
    daily:
      "2600 seviyesinde, dört dakikalık Frenzy ve üç dirilme sınırına göre Hard Expedition pratiği yap.",
    weekly:
      "Ariel kristali dönüştürme sınırlarını ve yararlı üretim malzemelerini takip et.",
    energy:
      "Grup düzenli tamamlıyorsa Ariel Fragment için Hard farmı yap; aksi hâlde güvenilir alt kademeleri kullan.",
    arcana:
      "Kusursuz dört satır birleşimlerinden önce eksik beceri eşiklerini tamamla.",
    horizontal: "Ariel, 21 Ekim yamasında eklenen ayrı bir PvE tablosudur.",
    avoid: "Araştırma tarihi itibarıyla Ludra güncel bir farm hedefi değildir.",
    steps: [
      "2600 seviyesine ulaş ve Hard Expedition koşullarını karşıla.",
      "Düzenli Hard tamamlamalarından Ariel Fragment topla.",
      "Substance Morph ile Ariel kristali üret ve tablo puanlarını kullan.",
      "Duyurulan Ludra normal girişi için 2800 hazırlığını yap.",
    ],
    sources: ["patch", "roadmap", "ludra"],
  },
  {
    min: 2800,
    max: null,
    name: "Yapını iyileştir, baskına hazırlan",
    unlock:
      "Ludra normal 2800 / hard 3000, 4 Kasım için duyuruldu. 27 Ekim itibarıyla erişime açık değil.",
    gear: "Mevcut ekipmanını hazırla; gelecekteki Ludra ödülleri elde edilebilir BiS olarak gösterilmez.",
    enhance: "Aktarım ve yuva bütçesini koruyarak kalıcı parçaları iyileştir.",
    daily:
      "Düzenli bitirdiğin Hard Expedition ve Transcendence içeriklerine devam et.",
    weekly:
      "Ariel ilerlemesini, malzeme birikimini ve grup ihtiyaçlarını gözden geçir.",
    energy:
      "Mevcut yararlı ödüllere harca; tüketilebilir kaynakları yalnızca son kullanım süresi içinde değerlendirebileceksen sakla.",
    arcana:
      "Mevcut beş kartla güçlü setler kur. Yalnızca KR kart türlerini plana katma.",
    horizontal:
      "Çok sayıda ikincil yuvayı kilitlemeden önce Genus 4. yuvayı iyileştir.",
    avoid:
      "KR değerlerinin Global ile aynı olacağını varsayarak gelecekteki bir baskın yapısına yatırım yapma.",
    steps: [
      "Güncel resmî baskın duyurusunu doğrula.",
      "Temel aktif, pasif ve Stigma önceliklerini tamamla.",
      "Tüketilebilir eşyaları hazırla ve grup rollerini koordine et.",
      "Çıkış gününde erişimi ve giriş koşullarını yeniden kontrol et.",
    ],
    sources: ["ludra", "updates", "kanon"],
  },
];
