import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { History, Cpu, Binary, Zap, ShieldCheck } from 'lucide-react';
export const TimelineApp = () => {
  const [ev, setEv] = useState<any[]>([]);
  useEffect(() => { return kernel.history.subscribe(setEv); }, []);
  return (
    <div className="h-full flex flex-col bg-[#020617] text-gray-300 font-sans">
      <div className="h-14 bg-black/50 border-b border-white/5 flex items-center px-6 gap-4 shrink-0">
        <History size={18} className="text-blue-500 animate-pulse"/><span className="text-[10px] font-black uppercase tracking-widest italic">Nexus Timeline</span>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
        {ev.map((e, i) => (
          <div key={e.id} className="flex gap-6 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i*50}ms` }}>
            <div className="flex flex-col items-center shrink-0"><div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">{e.type==='kernel'?<Cpu size={16} className="text-blue-400"/>:e.type==='dna'?<Binary size={16} className="text-purple-400"/>:<Zap size={16} className="text-yellow-400"/>}</div>{i < ev.length-1 && <div className="w-px h-full bg-white/5 my-2"/>}</div>
            <div className="pb-8 flex-1 border-b border-white/[0.02] last:border-0"><p className="text-[9px] font-black text-blue-500 font-mono mb-2">[${new Date(e.timestamp).toLocaleTimeString()}] ${e.type.toUpperCase()}</p><p className="text-sm text-gray-400 font-medium leading-relaxed">{e.message}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};