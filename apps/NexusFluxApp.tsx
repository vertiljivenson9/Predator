import React, { useState } from 'react';
import { Zap, Shield, Globe, Terminal, Database } from 'lucide-react';
export const NexusFluxApp = () => (
  <div className="h-full flex flex-col bg-[#050505] text-[#e0e0e0] overflow-hidden font-sans">
    <div className="h-14 border-b border-white/5 bg-black flex items-center px-6 justify-between shrink-0">
      <div className="flex items-center gap-3"><Zap size={20} className="text-cyan-500 fill-cyan-500 animate-pulse"/><h1 className="text-xs font-black tracking-[0.4em] uppercase">Nexus Flux Core</h1></div>
      <div className="flex gap-4 text-[9px] font-black uppercase text-gray-500"><div className="flex items-center gap-2"><Shield size={12} className="text-green-500"/> SECURE_DNA_LINK</div></div>
    </div>
    <div className="flex-1 flex overflow-hidden">
      <div className="w-1/2 p-12 flex flex-col justify-center items-center gap-10 border-r border-white/5">
        <div className="w-full max-w-sm bg-white/[0.02] p-8 rounded-[3rem] border border-white/5 shadow-2xl space-y-6">
          <input type="password" placeholder="GitHub Token" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none text-cyan-100 font-mono text-sm" />
          <button className="w-full py-6 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-[0_0_50px_rgba(8,145,178,0.2)] active:scale-95 transition-all flex items-center justify-center gap-3"><Database size={18}/> Iniciar Sincronización Nexus</button>
        </div>
      </div>
      <div className="w-1/2 bg-black flex flex-col overflow-hidden">
        <div className="h-10 border-b border-white/5 flex items-center px-6 text-[9px] font-black uppercase text-gray-600 tracking-widest"><Terminal size={14} className="mr-3 text-cyan-500"/> Flux Stream Monitor</div>
        <div className="flex-1 p-8 opacity-20 flex flex-col items-center justify-center text-center italic"><Globe size={60} className="mb-6"/><p className="text-xs font-black uppercase tracking-[0.5em]">Esperando canal de flujo...</p></div>
      </div>
    </div>
  </div>
);