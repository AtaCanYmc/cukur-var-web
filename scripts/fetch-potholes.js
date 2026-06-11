import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ Missing Supabase credentials in environment variables.");
    process.exit(1);
}

const fetchPotholes = async () => {
    try {
        console.log("Fetching live potholes data from Supabase REST API...");
        
        // Doğrudan REST API'ye istek (Supabase SDK kullanmadan, bağımlılık yükünü azaltmak için)
        const response = await fetch(`${SUPABASE_URL}/rest/v1/potholes?select=*&order=created_at.desc`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Data Mapping to IPothole format
        const mappedData = data.map(item => ({
            id: item.id || crypto.randomUUID(),
            lat: item.latitude,
            lng: item.longitude,
            status: 'active',
            severity: item.category === 'pothole' ? 'high' : 'low'
        }));

        const publicDir = path.join(__dirname, '../public/json');
        const outputPath = path.join(publicDir, 'potholes.json');
        
        // public klasörü yoksa oluştur
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // Veriyi senkron olarak statik JSON dosyasına yaz
        fs.writeFileSync(outputPath, JSON.stringify(mappedData, null, 2), 'utf-8');
        console.log(`✅ Successfully mapped and wrote ${mappedData.length} records to public/json/potholes.json`);
        
    } catch (error) {
        console.error("❌ Error fetching or saving potholes data:", error);
        process.exit(1);
    }
};

fetchPotholes().then(r => r);
