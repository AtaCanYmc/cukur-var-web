# Çukur Var - Web Uygulaması

**Çukur Var**, kullanıcıların çevrelerinde karşılaştıkları altyapı sorunlarını (çukur, bozuk yol, vb.) fotoğraflı ve konum bilgili olarak kolayca raporlayabilmelerini sağlayan modern bir web uygulamasıdır.

## 🚀 Teknolojiler ve Kullanılan Araçlar

Proje, modern web standartlarına uygun olarak en güncel teknolojilerle geliştirilmiştir:

- **React (v19)** - Kullanıcı arayüzü geliştirme
- **TypeScript** - Statik tip kontrolü ve güvenli kod yazımı
- **Vite** - Hızlı derleme ve geliştirme ortamı
- **Tailwind CSS (v4)** - Hızlı ve esnek stil yönetimi
- **Zustand** - Hafif ve performanslı state (durum) yönetimi
- **React Router (v7)** - İstemci taraflı sayfa yönlendirmeleri
- **React Leaflet** - Harita ve konum seçimi entegrasyonu
- **Framer Motion** - Akıcı ve modern animasyonlar
- **Lucide React** - Temiz ve ölçeklenebilir ikonlar
- **React Hot Toast** - Kullanıcı bildirimleri ve uyarılar

## 🌟 Özellikler

- 📸 **Kamera Entegrasyonu**: Cihaz kamerası kullanılarak anında fotoğraf çekimi veya galeriden fotoğraf yükleme.
- 📍 **Konum Seçimi**: Leaflet haritası üzerinden sorun yaşanan konumun işaretlenmesi.
- 📝 **Detaylı Raporlama**: Sorun kategorisi ve açıklaması ile birlikte form oluşturma.
- 📥 **Otomatik Kaydetme**: Çekilen fotoğrafların mail eklentisi için otomatik olarak cihaza indirilmesi.
- ⚡ **Hızlı ve Akıcı Arayüz**: Framer Motion ve Tailwind ile zenginleştirilmiş kullanıcı deneyimi.

## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone <repo-url>
   cd cukur-var-web
   ```

2. Bağımlılıkları yükleyin (Önerilen paket yöneticisi: `npm` veya `yarn`):
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Uygulamayı yerel ağınızdaki diğer cihazlarda (örneğin telefonunuzda kamerayı test etmek için) test etmek istiyorsanız:
   ```bash
   npm run host-dev
   ```

## 🏗️ Proje Yapısı

\`\`\`text
src/
├── components/   # Yeniden kullanılabilir arayüz bileşenleri (Layout, Report vb.)
├── constants/    # Sabit değişkenler ve konfigürasyonlar
├── context/      # React Context yapısı
├── data/         # Statik veriler
├── hooks/        # Özelleştirilmiş React hook'ları
├── pages/        # Ana sayfa görünümleri (Home, Report, About vb.)
├── routes/       # Uygulama yönlendirme tanımları
├── services/     # API ve servis çağrıları
└── store/        # Zustand global state tanımları
\`\`\`

## 📝 Lisans

Bu proje kişisel kullanım ve test amaçlı geliştirilmiştir. 
