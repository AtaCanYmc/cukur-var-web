# ÇukurVar - Katkıda Bulunma Kılavuzu (Contributing)

Öncelikle ÇukurVar inisiyatifine zaman ayırıp katkıda bulunmak istediğiniz için teşekkür ederiz! 🎉

Bu proje, İzmir ve çevresindeki altyapı sorunlarının çözülme sürecine sivil bir ivme kazandırmak için topluluk odaklı geliştirilmiştir. Aşağıdaki yönergeler, projeye uyumlu ve hızlı bir şekilde kod veya fikir katkısında bulunmanızı sağlayacaktır.

## 🏗️ Mimari Felsefe: "Pure Minimalism"

ÇukurVar, maliyetleri sıfırlamak ve maksimum veri gizliliği sağlamak amacıyla **%100 Sunucusuz (No-Backend, No-DB)** olarak tasarlanmıştır. Tüm işlemler tarayıcıda gerçekleşir, e-postalar doğrudan kullanıcının kendi e-posta istemcisi (Gmail, Outlook, Mail.app vb.) üzerinden iletilir. 

Lütfen yapacağınız katkılarda bu "istemci-taraflı" mimariyi bozacak (backend gereksinimi, veritabanı bağlantısı vb.) mimari değişiklikler teklif etmeyin.

## 🚀 Geliştirme Ortamını Hazırlama

Projeyi lokalinizde çalıştırmak için:

1. Projeyi forklayın ve lokal bilgisayarınıza klonlayın.
2. `npm ci` ile bağımlılıkları temiz bir şekilde kurun.
3. `.env.example` dosyasını kopyalayarak `.env` oluşturun.
4. `npm run dev` komutuyla projeyi ayağa kaldırın.
5. Değişiklik yapmadan önce kod standartlarını korumak için `npm run lint` komutunu çalıştırın.

## 🛠️ Nasıl Katkıda Bulunabilirsiniz?

### 1. Yeni Kurum Eklemek veya Güncellemek
Projeye yeni bir belediye veya resmi kurum e-postası eklemek çok basittir. Veritabanımız `src/data/institutions.ts` dosyasıdır.
Yeni bir kurum objesi eklemek için ilgili dosyayı açın ve listeye ekleme yapın:

```typescript
{
    id: 'ilce_belediyesi',
    name: 'İlçe Belediyesi Çözüm Merkezi',
    email: 'cozum@ilce.bel.tr',
    type: 'municipality',
    selected: false
}
```
*Not: İlçe eşleştirme algoritması `useMailAutomation.ts` hook'u içinde yer alır. Eğer otomatik eşleştirme sistemine yeni kurumu tanıtmak isterseniz bu hook içerisindeki mantığı da kontrol edebilirsiniz.*

### 2. Mail Şablonlarını Geliştirmek
Kullanıcının cihazında otomatik oluşturulan e-postanın Konu (Subject) ve Gövde (Body) şablonları `src/utils/mailBuilder.ts` dosyası üzerinden yönetilir. Metinlerde daha kurumsal veya açıklayıcı bir dile ihtiyaç duyarsanız doğrudan bu dosyada (Unit Test'leri de güncelleyerek) revize yapabilirsiniz.

### 3. Yeni Özellik veya Hata Düzeltmeleri
- **Bileşenler:** TailwindCSS (v4) ve Lucide React ikonları kullanılmaktadır. Yeni ekleyeceğiniz UI parçalarının projenin Turuncu/Siyah karanlık temasıyla uyumlu olduğundan emin olun.
- **State Yönetimi:** Zustand kullanılmaktadır. Performans (re-render) sorunları yaratmamak için `useStore(state => state.param)` şeklinde atomik seçim (atomic selector) yapısını koruyun.

## 🔄 Pull Request (PR) Süreci

1. Yaptığınız değişiklikleri `feature/isim-ozellik` (ör: `feature/add-yeni-kurum`) isimli yeni bir branch açarak commit'leyin.
2. Commit mesajlarınızı kısa, net ve ne yaptığınızı açıklar şekilde yazın.
3. Testleri koşmayı (`npm run test`) kesinlikle unutmayın.
4. GitHub üzerinden ana depoya (main branch) Pull Request açın.
5. Açtığınız PR'da neden bu değişikliğe ihtiyaç duyulduğunu ve neleri kapsadığını kısaca özetleyin.

ÇukurVar'ı daha iyi bir sivil inisiyatif aracı yapmak için kod yazan ellerinize sağlık! 🧡
