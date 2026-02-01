import React, { useState } from 'react';
import { Lock, Key } from 'lucide-react';
export const LockScreen = ({ onUnlock }: any) => (
  <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-center text-white">
    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl"><Lock size={32} /></div>
    <h1 className="text-sm font-black uppercase tracking-[0.4em] mb-12">Dispositivo Bloqueado</h1>
    <button onClick={onUnlock} className="px-12 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all">Acceder con PIN</button>
  </div>
);