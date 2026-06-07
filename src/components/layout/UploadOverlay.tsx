import React from 'react';
import {motion} from 'framer-motion';
import {CheckCircle2, ShieldCheck, UploadCloud, MapPin} from 'lucide-react';
import {useUploadStore} from '../../store/useUploadStore';

export const UploadOverlay: React.FC = () => {
    const currentStep = useUploadStore(state => state.currentStep);
    const progress = 100; // Statik ilerleme değeri

    const steps = [
        {id: 'PREPARING', label: 'Konum Doğrulanıyor', icon: MapPin},
        {id: 'BLURRING', label: 'AI Gizlilik Koruması', icon: ShieldCheck},
        {id: 'UPLOADING', label: 'Sunucuya Aktarılıyor', icon: UploadCloud},
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-8">
            {/* Arka Plan Hareketli Izgara (Grid) */}
            <div
                className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="w-full max-w-sm relative">
                {/* Progress Circle */}
                <div className="relative flex justify-center mb-12">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent"
                                className="text-slate-800"/>
                        <motion.circle
                            cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent"
                            className="text-orange-500"
                            initial={{strokeDasharray: "377", strokeDashoffset: "377"}}
                            animate={{strokeDashoffset: 377 - (377 * progress) / 100}}
                            transition={{duration: 0.5}}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-black text-white tracking-tighter">%{progress}</span>
                    </div>
                </div>

                {/* Status Steps */}
                <div className="space-y-4">
                    {steps.map((step, index) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: index * 0.1}}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                                    isActive ? 'bg-orange-500/10 border-orange-500/50' : 'bg-slate-800/40 border-slate-700/50'
                                }`}
                            >
                                <div className={`${isActive || isCompleted ? 'text-orange-500' : 'text-slate-600'}`}>
                                    {isCompleted ? <CheckCircle2 size={20}/> :
                                        <step.icon size={20} className={isActive ? 'animate-pulse' : ''}/>}
                                </div>
                                <span
                                    className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-500'}`}>
                  {step.label}
                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Alt Bilgi */}
            <motion.p
                animate={{opacity: [0.4, 1, 0.4]}}
                transition={{repeat: Infinity, duration: 2}}
                className="absolute bottom-12 text-[10px] text-orange-500/50 font-mono tracking-widest uppercase"
            >
                Encrypted Data Transmission Protocol // Izmir_v2.0
            </motion.p>
        </div>
    );
};