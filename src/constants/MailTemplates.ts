interface ITemplateParams {
    locationName?: string;
    coordinates: string;
    date: string;
    googleMapsLink: string;
    description?: string;
}

// .env dosyasından dinamik şehir ismini çekiyoruz (Default: İzmir)
const cityName = (import.meta.env.VITE_CITY_NAME || 'İzmir').toUpperCase();

// Mail sonuna eklenecek ortak clipboard fotoğraf yönlendirme notu
const PHOTO_ATTACHMENT_NOTICE = `
--------------------------------------------------
📸 İHBAR FOTOĞRAFI HAKKINDA NOT:
Bu ihbara ait olay yeri/hasar fotoğrafı, sistem tarafından otomatik olarak panoya kopyalanmıştır. 
Eğer mail gövdesinin hemen altında bir görsel bulunmuyor ise, lütfen bu alanın altına sağ tıklayıp "Yapıştır" (Ctrl+V / Cmd+V veya ekrana uzun basıp Yapıştır) seçeneğini kullanarak ihbar görselini ekleyiniz.
--------------------------------------------------
`.trim();

export const MAIL_TEMPLATES: Record<string, (p: ITemplateParams) => string> = {
    pothole: (p) => `
${cityName} BÜYÜKŞEHİR BELEDİYESİ VE İLGİLİ İLÇE BELEDİYE BAŞKANLIĞI DİKKATİNE,

Aşağıda detaylı koordinat ve konum bilgileri yer alan noktada, trafik güvenliğini, araç ve yaya sirkülasyonunu ciddi şekilde tehlikeye atan bir YOL HASARI / ÇUKUR tespit edilmiştir.

Sorunlu Bölge Detayları:
📍 ADRES / KONUM: ${p.locationName || `${cityName} sınırları dahilinde`}
🌐 COĞRAFİ KOORDİNATLAR: ${p.coordinates}
🗺️ DİJİTAL HARİTA BAĞLANTISI: ${p.coordinates !== 'Konum bilgisi yok' ? p.googleMapsLink : 'Belirtilmemiş'}
⏰ TESPİT TARİHİ: ${p.date}

${p.description ? `📝 VATANDAŞ AÇIKLAMASI:\n${p.description}\n` : ''}
Can ve mal kaybına sebebiyet verilmemesi adına, 5393 Sayılı Belediye Kanunu'nun ilgili maddeleri uyarınca bahsi geçen noktaya acilen müdahale edilerek gerekli onarım ve asfaltlama çalışmalarının yapılmasını önemle arz ederim.

${PHOTO_ATTACHMENT_NOTICE}
`.trim(),

    damage: (p) => `
${cityName} BÜYÜKŞEHİR BELEDİYESİ VE İLGİLİ İLÇE BELEDİYE BAŞKANLIĞI DİKKATİNE,

Aşağıda belirtilen konumdaki yol altyapı eksikliği/bakımsızlığı (derin çukur/hasarlı zemin) nedeniyle, sevk ve idaremdeki araçta ekteki fotoğraflarda da görülebileceği üzere MADDİ HASAR meydana gelmiştir.

Olay ve Hasar Detayları:
📍 OLAY YERİ (ADRES): ${p.locationName || `${cityName} sınırları dahilinde`}
🌐 COĞRAFİ KOORDİNATLAR: ${p.coordinates}
🗺️ DİJİTAL HARİTA BAĞLANTISI: ${p.coordinates !== 'Konum bilgisi yok' ? p.googleMapsLink : 'Belirtilmemiş'}
⏰ OLAY ZAMANI: ${p.date}

${p.description ? `📝 HASAR VE OLAY AÇIKLAMASI:\n${p.description}\n` : ''}
Belediyenizin yol yapım ve bakım yükümlülüğünü (Hizmet Kusuru) tam olarak yerine getirmemesi sebebiyle oluşan mağduriyetimin giderilmesi, hasar tespit sürecinin başlatılması ve ilgili yoldaki tehlikenin derhal ortadan kaldırılması hususunda gereğinin yapılmasını kanuni haklarım saklı kalmak kaydıyla talep ederim.

${PHOTO_ATTACHMENT_NOTICE}
`.trim(),

    other: (p) => `
${cityName} BÜYÜKŞEHİR BELEDİYESİ VE İLGİLİ İLÇE BEYELEDİYE BAŞKANLIĞI DİKKATİNE,

${cityName} sınırları içerisinde tespit edilen ve acil müdahale gerektiren altyapı/yol düzenleme sorunu aşağıda bilgilerinize sunulmuştur:

İhbar Detayları:
📍 BÖLGE / ADRES: ${p.locationName || `${cityName} sınırları dahilinde`}
🌐 COĞRAFİ KOORDİNATLAR: ${p.coordinates}
🗺️ DİJİTAL HARİTA BAĞLANTISI: ${p.coordinates !== 'Konum bilgisi yok' ? p.googleMapsLink : 'Belirtilmemiş'}
⏰ BİLDİRİM TARİHİ: ${p.date}

${p.description ? `📝 DETAYLI AÇIKLAMA:\n${p.description}\n` : ''}
Kent vizyonuna ve kamu düzenine yakışmayan bu durumun incelenerek, belediyenizin fen işleri ve altyapı koordinasyon merkezleri (AYKOME) vasıtasıyla çözüme kavuşturulmasını, sivil bir vatandaş olarak bilgilerinize sunar, gereğini arz ederim.

${PHOTO_ATTACHMENT_NOTICE}
`.trim(),
};