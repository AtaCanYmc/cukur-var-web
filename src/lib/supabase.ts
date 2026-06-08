import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        "⚠️ Supabase değişkenleri (.env) eksik! " +
        "Sivil veri arşivi (potholes) devredışı kalacak, ancak ana mail akışı kesintisiz çalışmaya devam edecektir."
    );
}

// Güvenli Fallback: Eğer değişkenler yoksa client oluşturmayı atla
export const supabase = (supabaseUrl && supabaseAnonKey) 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;
