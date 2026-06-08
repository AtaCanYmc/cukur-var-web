<div align="center">
  <img src="public/favicon/apple-touch-icon.png" alt="ÇukurVar Logo" width="120" height="120" />
  <h1>🚧 ÇukurVar 🚧</h1>
  <p><b>İzmir sokaklarındaki altyapı sorunlarının resmi kurumlara bildirilmesini hızlandıran %100 sunucusuz sivil otomasyon aracı.</b></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/PWA-Ready-success?style=flat-square&logo=pwa" alt="PWA Ready" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </p>
</div>

---

## 🌟 Proje Hakkında

**ÇukurVar**, vatandaşların çevrelerinde gördükleri açık çukurlar, bozuk yollar veya tehlike arz eden altyapı sorunlarını saniyeler içerisinde harita üzerinde işaretleyip, durumu otomatik olarak ilgili kurumlara (Belediye, İZSU vb.) resmi bir e-posta formatında iletmelerini sağlayan **bağımsız bir sivil teknoloji (Civic Tech)** girişimidir.

Hiçbir sunucu (backend) barındırmayan tamamen istemci taraflı (client-side) mimarisi sayesinde, ihbarlar doğrudan vatandaşın kendi cihazındaki mail uygulaması üzerinden gönderilir ve kişisel veriler %100 güvende kalır.

## ✨ Öne Çıkan Özellikler

- 🛡️ **KVKK ve Gizlilik Odaklı Mimari:** Çekilen ihbar fotoğrafları, isim, e-posta, IP adresi veya cihaz bilgileri (PII) ASLA hiçbir uzak sunucuya yüklenmez; tüm işlemler doğrudan tarayıcı RAM'inde gerçekleşir.
- 🗺️ **Açık Veri Arşivi (Sivil Haritalandırma):** İhbar oluşturulduğunda sadece hasarın kategorisi, tarihi ve koordinatları (enlem/boylam) Supabase üzerinde **%100 anonim** olarak arşivlenir. Amacımız, İzmir'deki kronik altyapı sorunlarının açık kaynaklı sivil bir haritasını çıkarmaktır.
- 📱 **Progressive Web App (PWA):** ÇukurVar'ı tarayıcınızdan "Ana Ekrana Ekle" diyerek hem mobil cihazlarınıza hem de masaüstü bilgisayarlarınıza tek tıkla yerel bir uygulama (Native App) hissiyle kurabilirsiniz.
- 📋 **Akıllı Pano ve Rehber Katmanı (Clipboard Automation):** Çekilen çukur fotoğrafları otomatik olarak cihazınızın panosuna (clipboard) kopyalanır ve e-posta uygulamasına geçtiğinizde tek yapmanız gereken "Yapıştır" demektir. Akıllı UI rehberi sizi yönlendirir.
- 🚀 **Gelişmiş SEO ve Performans:** W3C standartlarına uygun `sitemap.xml`, `robots.txt`, dinamik Open Graph meta etiketleri ve agresif RAM yönetimi (Memory Leak koruması) ile ışık hızında çalışır.

## 🛠️ Kullanılan Teknoloji Yığını

- **Core:** React 18, TypeScript, Vite
- **State Management:** Zustand (Atomik State Mimarisi)
- **Styling:** TailwindCSS v4, Framer Motion (Animasyonlar)
- **Harita & Konum:** React-Leaflet, OpenStreetMap, CartoDB (Dark/Light Map Tiles)
- **İkonlar:** Lucide React
- **Test Altyapısı:** Vitest

## 🚀 Kurulum ve Yerel Geliştirme

Projeyi kendi bilgisayarınızda çalıştırmak oldukça basittir. Terminalinizi açın ve aşağıdaki adımları sırasıyla uygulayın:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/AtaCanYmc/cukur-var-web.git
cd cukur-var-web
```

### 2. Bağımlılıkları Yükleyin
```bash
# Güvenlik taramalı temiz kurulum için 'ci' kullanılması önerilir
npm ci
```

### 3. Ortam Değişkenlerini (Environment Variables) Ayarlayın
Proje ana dizininde bulunan `.env.example` dosyasını `.env` olarak kopyalayın veya oluşturun:
```env
VITE_APP_VERSION=v1.0.0
VITE_APP_YEAR=2026
VITE_CONTACT_EMAIL=atacan@example.com
VITE_GITHUB_URL=https://github.com/AtaCanYmc/cukur-var-web
VITE_CITY_NAME=İzmir
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Proje genellikle `http://localhost:5173` adresinde ayağa kalkacaktır.

### 5. Testleri Çalıştırın
Sistemdeki tüm iş mantığı ve yardımcı fonksiyon testlerini koşmak için:
```bash
npm run test
```

## 🤝 Katkıda Bulunma (Contributing)

Bu proje açık kaynaklı bir sivil inisiyatiftir ve her türlü katkıya (PR) açıktır. Projeye katkı sağlamak isterseniz:

- **Yeni Kurum Eklemek:** E-postaların gideceği yetkili kurumları ve akıllı eşleştirme anahtar kelimelerini güncellemek için `src/data/institutions.ts` dosyasını düzenleyebilirsiniz.
- **Mail Şablonunu Değiştirmek:** Otomatik oluşturulan ihbar metnini (Subject/Body) özelleştirmek için `src/utils/mailBuilder.ts` dosyasındaki mantığı güncelleyebilirsiniz.
- Bir özellik eklemeden önce [Issues](https://github.com/AtaCanYmc/cukur-var-web/issues) kısmında tartışma başlatmanız harika olur!

## ⚖️ Yasal Uyarı ve Sorumluluk Reddi

**ÇukurVar, resmi bir kamu kurumu, belediye iştiraki veya devlet organı değildir.** Bağımsız bir açık kaynak sivil inisiyatif projesidir.

Bu uygulama, tamamen vatandaşların ihbar süreçlerini (e-posta oluşturma, konum bulma) otomatize eden ve hızlandıran tarafsız bir araçtır. Uygulama üzerinden gönderilen ihbarların kurumlar tarafından işleme alınması, çözülmesi veya takibi konusunda **hiçbir garanti verilmez ve hukuki sorumluluk kabul edilmez.** Tüm veriler ve e-posta gönderim işlemi doğrudan kullanıcının kendi cihazında ve kendi e-posta hesabı üzerinden gerçekleşir.

---
<div align="center">
  <b>İzmir için sevgiyle ve kodla geliştirildi 🧡</b>
</div>
