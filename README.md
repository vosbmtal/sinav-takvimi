# 📅 Sınav Takvimi — Veliköy OSB MTAL

**Veliköy Organize Sanayi Bölgesi Mesleki ve Teknik Anadolu Lisesi**
1. Dönem Ortak Sınavları için interaktif sınav programı.

🔗 **Canlı site:** [sinav.vosb.k12.tr](https://sinav.vosb.k12.tr)

---

## Özellikler

- **Takvim Görünümü** — Haftaya göre CSS Grid tabanlı sınav takvimi; zaman dilimi sütunu sabit kalır
- **Liste Görünümü** — Arama ve filtreye göre sıralanmış tablo görünümü
- **Anlık Geri Sayım** — Sonraki sınava kalan süreyi gösteren kompakt banner (30 saniyede bir güncellenir)
- **Sınıf Filtresi** — 9., 10. ve 11. sınıflar için bağımsız filtreleme
- **Arama** — Ders adı, tarih, gün veya sınıfa göre anlık arama
- **Karanlık / Aydınlık Tema** — Tercih tarayıcıya kaydedilir
- **CSV Dışa Aktarma** — Filtrelenmiş sınav listesini indir
- **Yazdırma Desteği** — Arayüz öğeleri gizlenerek temiz çıktı
- **Tam Responsive** — Masaüstü, tablet ve mobil uyumlu

---

## Kurulum

Sunucuya gerek yoktur. Dosyaları indirip tarayıcıda açmak yeterlidir:

```bash
git clone https://github.com/vosbmtal/sinav-takvimi.git
cd sinav-takvimi
# index.html dosyasını herhangi bir modern tarayıcıda açın
```

Veya doğrudan canlı siteyi ziyaret edin: **[sinav.vosb.k12.tr](https://sinav.vosb.k12.tr)**

---

## Teknolojiler

| Teknoloji | Kullanım Amacı |
|---|---|
| HTML5 | Semantik sayfa yapısı |
| CSS3 (Grid & Custom Properties) | Takvim düzeni, tasarım sistemi, karanlık mod |
| Vanilla JavaScript (ES6+) | Veri yönetimi, filtreleme, render |
| [Inter](https://rsms.me/inter/) | Arayüz fontu |
| [IBM Plex Mono](https://www.ibm.com/plex/) | Saat ve tarih etiketleri |
| [Font Awesome 6](https://fontawesome.com/) | İkonlar |

---

## Proje Yapısı

```
sinav-takvimi/
├── index.html        # Ana HTML yapısı
├── styles.css        # Tasarım sistemi ve bileşen stilleri (~680 satır)
├── script.js         # Uygulama mantığı ve sınav verisi
└── logo.svg          # Okul logosu
```

---

## Sınav Verisi

Sınav verileri `script.js` içindeki `allExams` dizisine gömülüdür. Her sınav şu alanlara sahiptir:

```js
{
    sheet:    '30 MART-3 NİSAN',   // Hafta anahtarı
    timeSlot: '3.DERS',            // Ders saati
    date:     '30 MART 2026',      // Türkçe tarih formatı
    day:      'PAZARTESİ',         // Gün adı (Türkçe)
    exam:     '11 ORT. TÜRK TAR.', // Tam sınav adı
    grade:    '11',                // Sınıf seviyesi: '9', '10' veya '11'
    subject:  'ORT. TÜRK TAR.'    // Ders adı
}
```

### Ders Saatleri

| Saat | Başlangıç | Bitiş |
|------|-----------|-------|
| 1.DERS | 09:00 | 09:40 |
| 2.DERS | 09:50 | 10:30 |
| 3.DERS | 10:40 | 11:20 |
| 4.DERS | 11:30 | 12:10 |
| 5.DERS | 12:20 | 13:00 |
| 6.DERS | 13:30 | 14:10 |
| 7.DERS | 14:20 | 15:00 |
| 8.DERS | 15:10 | 15:50 |
| 9.DERS | 16:00 | 16:40 |
| 10.DERS | 16:45 | 17:25 |

---

## Tarayıcı Desteği

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## Katkıda Bulunanlar

| Kişi | Rol |
|---|---|
| [Buğra CANATA](https://github.com/bcanata) | Geliştirici |

---

## Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır.  
© 2026 Veliköy OSB MTAL — [vosb.k12.tr](https://vosb.k12.tr)
