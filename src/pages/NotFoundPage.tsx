import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { ROUTES } from '../routes/paths..ts';
import { PageWrapper } from '../components/layout/PageWrapper';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper showHeader={true} showBottomNav={true}>
            <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-6 text-center pb-20 pt-48">
                <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert size={48} className="text-orange-500" />
                </div>
                
                <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                    404
                </h1>
                
                <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4">
                    Kayıp Bölge!
                </h2>
                
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm text-sm">
                    Görünüşe göre bu koordinatlarda bir altyapı bulunmuyor. Yanlış bir sokağa girmiş olabilirsiniz, lütfen güvenli bölgeye (Ana Sayfaya) dönün.
                </p>

                <button 
                    onClick={() => navigate(ROUTES.HOME)}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-orange-500/30 shadow-lg transition-transform active:scale-95"
                >
                    <Home size={20} />
                    Ana Sayfaya Dön
                </button>
            </div>
        </PageWrapper>
    );
};

export default NotFoundPage;
