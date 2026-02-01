import React, { useState } from 'react';
import { Lock, Key } from 'lucide-react';
export const LockScreen = ({ onUnlock }: any) => {
  const [pin, setPin] = useState('');
  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center text-white font-sans">
      <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl animate-in zoom-in duration-500"><Lock size={40} /></div>
      <h1 className="text-sm font-black uppercase tracking-[0.4em] mb-12">Dispositivo Bloqueado</h1>
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => setPin(p=>p+n)} className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-bold hover:bg-white/10 transition-all">{n}</button>)}
      </div>
      <button onClick={onUnlock} className="px-16 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-2xl">Desbloquear</button>
    </div>
  );
};