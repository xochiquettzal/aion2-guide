import type { ClassGuide, ClassId, SkillPriority } from "./types";
const skill = (
  name: string,
  kind: SkillPriority["kind"],
  target: number | undefined,
  why: string,
): SkillPriority => ({ name, kind, target, why });
const raw: Omit<ClassGuide, "evidence">[] = [
  {
    id: "gladiator",
    name: "Gladiator",
    role: "Yakın dövüş hasarı / yardımcı tank",
    weapon: "Greatsword",
    color: "#d6a36a",
    summary:
      "Yapını Overhead Slam ve önden sürdürülen baskı üzerine kur. İlk bekleme süresi eşiği, puanları tüm becerilere dağıtmaktan daha önemlidir.",
    early:
      "Overhead Slam, Rending Blow ve Keen Strike üzerine yoğunlaş. Stigma kaynaklarını Lunge Stance için ayır.",
    mid: "Overhead Slam'i 16 yap; ardından mana kullanımını ve Rending Blow'u düzene oturt. Lunge Stance 20'yi hedefle.",
    late: "Üçüncü uzmanlık yuvası için Overhead Slam'i 20'ye çıkar. Temel döngü oturduktan sonra pasifleri geliştir.",
    rotation: [
      "Hasar aralığı başlamadan Ruinous Blow kullan.",
      "Overhead Slam ile Rending Blow'u dönüşümlü kullan.",
      "Mana için aralara Keen Strike ekle; Focused Block'u gerektiği anda kullan.",
    ],
    skills: [
      skill(
        "Overhead Slam",
        "Aktif",
        16,
        "Bekleme süresini kaldırır; sonraki hedef 20.",
      ),
      skill(
        "Rending Blow",
        "Aktif",
        16,
        "Temel döngüyü ve mana yenilenmesini destekler.",
      ),
      skill("Keen Strike", "Aktif", 10, "Temel saldırı için ekonomik yatırım."),
      skill(
        "Lunge Stance",
        "Stigma",
        20,
        "Yapının bekleme süresi döngüsünü sağlar.",
      ),
      skill(
        "Zikel’s Blessing",
        "Stigma",
        10,
        "Erken aşamada hasar güçlendirme eşiği.",
      ),
      skill("Rage Burst", "Stigma", 5, "Ekonomik başlangıç yatırımı."),
      skill("Focused Block", "Stigma", 5, "Faydalı savunma eşiği."),
      skill(
        "Experienced Counterstrike",
        "Pasif",
        undefined,
        "Önden saldırı ve grup hasarı; KR bilgisinden yararlanan öncelik.",
      ),
      skill(
        "Murderous Burst",
        "Pasif",
        undefined,
        "Kritik hasar uyumu; KR bilgisinden yararlanan öncelik.",
      ),
    ],
    variants: [
      { name: "Hasar", detail: "Temel döngüyü ve saldırı pasiflerini kullan." },
      {
        name: "Yardımcı tank",
        detail:
          "Focused Block hayatta kalmayı destekler; tehdit üretimi hasara ve grubun gücüne bağlıdır.",
      },
    ],
  },
  {
    id: "templar",
    name: "Templar",
    role: "Tank / yakın dövüş hasarı",
    weapon: "Longsword",
    color: "#8db7d5",
    summary:
      "Judgment, kalkan saldırılarını hasar ve tehdit üreten bir döngüye bağlar. Grubu korurken saldırı sürekliliğini de sürdür.",
    early:
      "Beceri puanları ve genel Daevanion düğümleriyle Judgment seviyesini artır.",
    mid: "İlk önemli hedef Judgment 16. Ardından Warding Strike ve Vicious Strike'ı yükselt.",
    late: "Hasarı grubunun ihtiyaç duyduğu korumayla dengele; kesin bir Global tank BiS listesi henüz doğrulanmış değil.",
    rotation: [
      "Judgment'ı etkinleştirmek için kalkan ve vuruş becerilerini kullan.",
      "Vicious Strike'ın sürekliliğini koru.",
      "Koruma becerilerini boss hasarının geleceği anlara sakla.",
    ],
    skills: [
      skill("Judgment", "Aktif", 16, "Bekleme süresini kaldırır."),
      skill(
        "Warding Strike",
        "Aktif",
        16,
        "Hasar döngüsünü ve grubun hayatta kalmasını destekler.",
      ),
      skill(
        "Vicious Strike",
        "Aktif",
        16,
        "Temel saldırı sürekliliğini destekler.",
      ),
      skill("Taunt", "Stigma", 20, "Topluluğun önerdiği hasar/tehdit hedefi."),
      skill("Noble Armor", "Stigma", 15, "Grup desteği yatırımı."),
      skill(
        "Shield of Protection",
        "Stigma",
        15,
        "Savunma amaçlı yardımcı beceri.",
      ),
      skill(
        "Doom Shield",
        "Stigma",
        15,
        "Topluluğun tank kurulumunun bir parçası.",
      ),
      skill(
        "Fury",
        "Pasif",
        undefined,
        "Grup hasarıyla uyum sağlar; eşdeğer güçlendirmeleri üst üste bindirme.",
      ),
    ],
    variants: [
      {
        name: "Hasar ve tehdit",
        detail: "Judgment sürekliliğine öncelik ver.",
      },
      {
        name: "Grup tankı",
        detail:
          "Koruma becerilerinin bekleme sürelerini koordine et; ayrıntılı Global tank verisi sınırlı.",
      },
    ],
  },
  {
    id: "assassin",
    name: "Assassin",
    role: "Yakın dövüşte ani hasar",
    weapon: "Daggers",
    color: "#bd94d8",
    summary:
      "Konumlanmaya dayalı, erken aşamada birden fazla güç eşiği bulunan bir sınıf. Güçlendirmeleri eşleştir ve hasara başlamadan boss'un arkasına geç.",
    early:
      "Kaynakları dağıtmak yerine Heart Gore, Quick Slice ve Insignia Explosion seviyelerini artır.",
    mid: "Üç temel beceriyi 16'ya, Illusive Clone'u 20'ye çıkar.",
    late: "Aynı ani hasar aralığını güçlendir. Savunma seçeneği daha uzun süre saldırmanı sağlıyorsa onu tercih et.",
    rotation: [
      "Swift Contract, Illusive Clone ve Triniel’s Dagger zamanlamalarını eşleştir.",
      "Insignia Explosion ve Heart Gore ile arkadan saldır.",
      "Saldırıların arasına Quick Slice ekle.",
    ],
    skills: [
      skill("Heart Gore", "Aktif", 16, "Temel ani hasar eşiği."),
      skill("Quick Slice", "Aktif", 16, "Temel saldırı döngüsünün merkezi."),
      skill(
        "Insignia Explosion",
        "Aktif",
        16,
        "Ani hasarı tamamlayan ana beceri.",
      ),
      skill("Illusive Clone", "Stigma", 20, "Öncelikli Stigma yatırımı."),
      skill("Swift Contract", "Stigma", 10, "Güçlendirme aralığını destekler."),
      skill("Triniel’s Dagger", "Stigma", 10, "Clone ile aynı zamana getir."),
      skill(
        "Savage Fang",
        "Stigma",
        10,
        "Hasar seçeneği; hayatta kalma ihtiyacıyla karşılaştır.",
      ),
      skill(
        "Evasion Stance",
        "Stigma",
        5,
        "Karşılaşmaları öğrenirken kullanılabilecek alternatif.",
      ),
      skill(
        "Rear Smite",
        "Pasif",
        undefined,
        "Konumlanma önceliği geçicidir; mevcut yapınla doğrula.",
      ),
    ],
    variants: [
      { name: "Ani hasar", detail: "Esnek yuvayı Savage Fang ile doldur." },
      {
        name: "Daha güvenli ilerleme",
        detail:
          "Savage Fang yerine Evasion Stance kullanılabilir. Topluluk görüşleri farklıdır.",
      },
    ],
  },
  {
    id: "ranger",
    name: "Ranger",
    role: "Uzaktan fiziksel hasar",
    weapon: "Bow",
    color: "#91ba83",
    summary:
      "Yüksek ani hasar, kontrollü atışlara ve önemli bir Stigma eşiğine bağlıdır. Şarjlı saldırıların zamanlamasını kendin yönet.",
    early:
      "Temel aktif beceri seviyelerini toplarken Vaizel’s Authority ve Bow of Blessing'e öncelik ver.",
    mid: "Deadshot ve Gale Arrow'u 16'ya; ayrıca Snipe veya Tempest Shot'ı 16'ya çıkar.",
    late: "Vaizel’s Authority 20'yi tamamla ve saldırı sürekliliğini iyileştir. KR'deki pasif öncelikleri Global seviye zorunluluğu değildir.",
    rotation: [
      "Marking Shot'ı etkin tut.",
      "Güvenli bir aralıkta Deadshot'ı elle şarj et.",
      "Ana saldırılar arasında Snipe ve tamamlayıcı okları kullan.",
    ],
    skills: [
      skill("Deadshot", "Aktif", 16, "Temel şarjlı hasar becerisi."),
      skill("Gale Arrow", "Aktif", 16, "Bekleme süresi eşiği."),
      skill(
        "Snipe",
        "Aktif",
        16,
        "Temel saldırı yolu; Tempest Shot alternatif bir yatırımdır.",
      ),
      skill("Tempest Shot", "Aktif", 16, "Alternatif hız eşiği."),
      skill(
        "Vaizel’s Authority",
        "Stigma",
        20,
        "Stigma tarafındaki ana güç artışı.",
      ),
      skill("Bow of Blessing", "Stigma", 10, "Erken aşamadaki ikinci yatırım."),
      skill(
        "Supporting Fire",
        "Stigma",
        10,
        "Temel yapıdan sonra ek hasar sağlar.",
      ),
      skill(
        "Focused Eye",
        "Pasif",
        undefined,
        "KR bilgisinden yararlanan saldırı önceliği.",
      ),
      skill(
        "Hunter's Resolve",
        "Pasif",
        undefined,
        "KR bilgisinden yararlanan kritik hasar önceliği.",
      ),
    ],
    variants: [
      {
        name: "Şarjlı atış",
        detail: "Deadshot ve Marking Shot'ı elle kullan.",
      },
      {
        name: "Ekonomik",
        detail:
          "Pahalı kusursuz satırları aramadan önce Stigma döngüsünü tamamla.",
      },
    ],
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    role: "Uzaktan ani büyü hasarı",
    weapon: "Spellbook",
    color: "#91a9ee",
    summary:
      "Güvenli ve tüm güçlendirmelerin etkin olduğu bir Hellfire atışı hazırla. Bekleme süresi azaltmaları yapının tamamlanmasında belirleyicidir.",
    early:
      "Temel ateş becerileriyle başla; ardından Hellfire ve Wish of Concentration'a öncelik ver.",
    mid: "Hellfire ve Wish of Concentration'ı 16 yap. Güçlendirmeleri şarjlı atışla eşleştir.",
    late: "Atış zamanlamasını ve pasif bonuslarını geliştir. Daha yüksek KR hedefleri Global kaynak harcamasını belirlememeli.",
    rotation: [
      "Element Enhancement ve hasar güçlendirmelerini hazırla.",
      "Winter’s Shackles uygula ve Hellfire'ı güvenle isabet ettir.",
      "Bir sonraki güçlendirilmiş atışı geciktirmeden boşlukları doldur.",
    ],
    skills: [
      skill("Hellfire", "Aktif", 16, "Önemli bekleme süresi eşiği."),
      skill(
        "Wish of Concentration",
        "Aktif",
        16,
        "Ani hasar aralıklarının sıklığını artırır.",
      ),
      skill(
        "Winter's Shackles",
        "Aktif",
        10,
        "Ani hasar için ekonomik destek.",
      ),
      skill(
        "Element Enhancement",
        "Stigma",
        15,
        "Öncelikli hasar güçlendirme hedefi.",
      ),
      skill("Delayed Explosion", "Stigma", 10, "Ani hasar desteği."),
      skill("Fire Wall", "Stigma", 10, "21 Ekim düzeltmelerini kontrol et."),
      skill(
        "Cold Storm",
        "Stigma",
        10,
        "Hasar seçeneği; gerektiğinde savunmayla değiştir.",
      ),
      skill(
        "Robe of Flame",
        "Pasif",
        undefined,
        "Geçici saldırı önceliği; KR seviye hedefi aktarılmadı.",
      ),
    ],
    variants: [
      {
        name: "Hellfire odaklı ani hasar",
        detail: "Ana atışları ve güçlendirmeleri bilinçli zamanla.",
      },
      {
        name: "Tek başına hayatta kalma",
        detail: "Cold Storm yerine Steel Barrier düşünülebilir; kanıt sınırlı.",
      },
    ],
  },
  {
    id: "spiritmaster",
    name: "Spiritmaster",
    role: "Çağırıcı / sürekli hasar",
    weapon: "Orb",
    color: "#74c3c1",
    summary:
      "Ruhları dönüşümlü kullanarak Elemental Fusion'ı besle, ardından Stigma hasarını ekle. Çağrıların sürekliliği ve uygulama önemlidir.",
    early:
      "İkincil satırları kusursuzlaştırmadan önce ruh döngüsünü öğren ve temel çağrılara yatırım yap.",
    mid: "Elemental Fusion ve Combustion'ı geliştir; çağrı becerilerini 16'ya doğru ilerlet.",
    late: "Topluluk hedefleri arasında Fusion ve Combustion 20 var. Üç veya dört ruhlu döngüler hâlâ tartışılıyor.",
    rotation: [
      "Ruh saldırılarını ve Fusion birikimlerini sürdür.",
      "Döngü içinde Elemental Fusion ve Combustion kullan.",
      "Ancient Spirit ve Benediction'ı boss'un uygun aralıklarına denk getir.",
    ],
    skills: [
      skill(
        "Elemental Fusion",
        "Aktif",
        20,
        "Ruh döngüsünün ana hasar karşılığı.",
      ),
      skill("Combustion", "Aktif", 20, "Ana hasarı tamamlayan beceri."),
      skill("Summon: Fire Spirit", "Aktif", 16, "Çağrı istatistiği eşiği."),
      skill("Summon: Water Spirit", "Aktif", 16, "Çağrı döngüsünü sürdür."),
      skill(
        "Enhance: Spirit's Benediction",
        "Stigma",
        20,
        "Temel ruh güçlendirmesi.",
      ),
      skill("Summon: Ancient Spirit", "Stigma", 20, "Temel Stigma hasarı."),
      skill(
        "Jointstrike: Corrode",
        "Stigma",
        undefined,
        "Yaygın tercih; yatırım miktarı kaynaklara bağlıdır.",
      ),
      skill(
        "Flame Blessing",
        "Stigma",
        undefined,
        "Görüş ayrılığı bulunan dördüncü yuva.",
      ),
      skill("Spirit Strike", "Pasif", undefined, "Geçici ruh hasarı önceliği."),
    ],
    variants: [
      { name: "Ruh döngüsü", detail: "Global topluluğunun başlangıç önerisi." },
      {
        name: "Üç değişimli döngü",
        detail: "Yalnızca TW referansı; Global için etkin bir öneri değil.",
      },
    ],
  },
  {
    id: "cleric",
    name: "Cleric",
    role: "Şifacı / büyü hasarı",
    weapon: "Mace",
    color: "#e3cc8d",
    summary:
      "Condemnation hasar döngüsünü bilinçli iyileştirmeyle birleştir. Daha fazla şifa isteyen gruplar için ikinci bir kurulum sakla.",
    early:
      "Kritik vuruşla sıfırlama etkileşimi için Condemnation 12 ve Earth Punishment 5'e ulaş.",
    mid: "Condemnation ve Light of Protection'ı geliştir. Acil şifaları elle yönet.",
    late: "Condemnation 20 ve Light of Protection 20 topluluk hedefleridir. Şifa miktarını karşılaşmaya göre ayarla.",
    rotation: [
      "Earth Punishment ve zayıflatmalarını uygula.",
      "Sıfırlama koşulu etkinken Condemnation kullan.",
      "Grup ihtiyaç duyduğunda hasarı bırakıp iyileştir.",
    ],
    skills: [
      skill(
        "Condemnation",
        "Aktif",
        20,
        "12 kritik sıfırlamaları açar; 20 bir uzmanlık yuvası ekler.",
      ),
      skill("Chain of Torment", "Aktif", 10, "Ekonomik zayıflatma yatırımı."),
      skill("Earth's Retribution", "Aktif", 12, "Temel saldırı eşiği."),
      skill(
        "Earth Punishment",
        "Stigma",
        20,
        "Condemnation etkileşimi için 5 ile başla.",
      ),
      skill(
        "Light of Protection",
        "Stigma",
        20,
        "Güçlü grup güçlendirmesi yatırımı.",
      ),
      skill(
        "Prayer of Amplification",
        "Stigma",
        5,
        "Ekonomik destek seçeneği.",
      ),
      skill("Summon Resurrection", "Stigma", 5, "Toparlanma desteği."),
      skill(
        "Earth's Grace",
        "Pasif",
        undefined,
        "Kritik hasar uyumu; şifa ihtiyacıyla karşılaştır.",
      ),
    ],
    variants: [
      {
        name: "Hasar veren şifacı",
        detail: "Elle iyileştirme ile Condemnation döngüsü.",
      },
      {
        name: "Yoğun iyileştirme",
        detail:
          "Absolution, Benevolence veya Yustiel’s Power düşünülebilir; her duruma uyan bir değişim yok.",
      },
    ],
  },
  {
    id: "chanter",
    name: "Chanter",
    role: "Yakın dövüş hasarı / grup desteği",
    weapon: "Staff",
    color: "#c3a1df",
    summary:
      "Grup güçlendirmelerini korurken Dark Crush'ı tekrar tekrar tetikle. Desteğin değeri sürekliliğe ve grup bileşimine bağlıdır.",
    early:
      "Dark Crush seviyelerini topla ve Stigma parçalarını Undefeated Mantra'ya yoğunlaştır.",
    mid: "Dark Crush 16 bekleme süresini kaldırır. Yanında Onslaught ve Spinning Strike'ı geliştir.",
    late: "Undefeated Mantra 20'yi tamamla. Kişisel pasif hasarını, çakışmayan grup etkileriyle karşılaştır.",
    rotation: [
      "Dark Crush'ı açmak için Spinning Strike veya başka bir tetikleyici kullan.",
      "Hemen ardından Dark Crush kullan.",
      "Aralarda Onslaught ve grup güçlendirmelerini sürdür.",
    ],
    skills: [
      skill(
        "Dark Crush",
        "Aktif",
        16,
        "Bekleme süresini kaldırır; yine de tetikleyici gerekir.",
      ),
      skill("Onslaught", "Aktif", 16, "Temel saldırı gelişiminin merkezi."),
      skill("Spinning Strike", "Aktif", 16, "Tetikleme ve kritik vuruş eşiği."),
      skill(
        "Undefeated Mantra",
        "Stigma",
        20,
        "Öncelikli grup güçlendirmesi yatırımı.",
      ),
      skill("Power of the Storm", "Stigma", 15, "Tamamlayıcı güçlendirme."),
      skill("Marchutan’s Wrath", "Stigma", 5, "Ekonomik tetikleyici seçeneği."),
      skill("Sprint Mantra", "Stigma", 10, "Grup desteği."),
      skill(
        "Attack Preparation",
        "Pasif",
        undefined,
        "Kişisel saldırı önceliği.",
      ),
      skill(
        "Earth's Promise",
        "Pasif",
        undefined,
        "Grup zayıflatması; Cleric ile çakışmayı kontrol et.",
      ),
    ],
    variants: [
      {
        name: "Hasar ve güçlendirmeler",
        detail: "Dark Crush ve grup güçlendirmelerini sürdür.",
      },
      {
        name: "Destek alternatifi",
        detail:
          "Recuperation ve Healing Touch toparlanma sağlar; her grupta uzman şifacının yerini tutmaz.",
      },
    ],
  },
];
export const classes: ClassGuide[] = raw.map((c) => ({
  ...c,
  evidence: {
    sources: [`class-${c.id}`, "kanon"],
    confidence: "Topluluk",
    region: "Global",
  },
}));
export const classById = Object.fromEntries(
  classes.map((c) => [c.id, c]),
) as Record<ClassId, ClassGuide>;
