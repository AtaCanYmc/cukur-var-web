# Changelog

Tüm önemli değişiklikler bu dosyada belgelenecektir.

Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standardına dayanmaktadır ve bu proje [Semantic Versioning](https://semver.org/spec/v2.0.0.html) kullanmaktadır.

## [Unreleased]

### Added
- Haritada konum seçimi iyileştirmesi ve otomatik İzmir merkezi konumlandırması eklendi.
- Kurum mail verileri JSON dosyası üzerinden okunacak şekilde güncellendi.

### Changed
- GitHub Actions data-pipeline cron job çalışma süresi her 30 dakikaya indirildi.
- Deploy (CD) süreci, veri değişikliklerinden sonra otomatik tetiklenecek şekilde `workflow_dispatch` ile entegre edildi.

### Fixed
- Konum erişimi reddedildiğinde veya geciktiğinde oluşan harita yükleme sorunu giderildi.
- React-Leaflet kısmi render (gri alan) sorunu çözüldü.
- Linter uyarısına sebep olan senkron setState çağrıları güvenli hale getirildi.

## [1.0.0] - 2026-05-15

### Added
- ÇukurVar projesinin ilk sürümü yayınlandı.
- Harita üzerinden konum seçimi ve otomatik posta şablonu oluşturma altyapısı kuruldu.
- Tailwind CSS ile dark/light mode desteği sağlandı.
- Supabase entegrasyonu tamamlandı.
