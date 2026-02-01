import React from 'react';
import { Cloud, Sun } from 'lucide-react';
export const WeatherApp = () => (
  <div className="h-full bg-gradient-to-b from-sky-400 to-blue-600 text-white flex flex-col items-center justify-center p-8 font-sans">
    <Sun size={100} className="mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-pulse" />
    <h1 className="text-8xl font-thin tracking-tighter">24°</h1>
    <p className="text-xl font-black uppercase tracking-widest mt-2 opacity-80">Despejado</p>
    <div className="mt-16 w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-100">Pronóstico Local v1.0</span>
    </div>
  </div>
);