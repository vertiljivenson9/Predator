import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { History } from 'lucide-react';
export const TimelineApp = () => {
  const [ev, setEv] = useState<any[]>([]);
  useEffect(() => { return kernel.history.subscribe(setEv); }, []);
  return (
    <div className="h-full bg-[#020617] text-gray-300 flex flex-col p-6 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-8"><History className="text-blue-500" size={20}/><h1 className="text-xs font-black uppercase tracking-widest">Nexus Timeline</h1></div>
      {ev.map((e,i) => <div key={i} className="mb-6 border-l border-white/10 pl-6 relative"><div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-blue-500"/><p className="text-[8px] font-black text-blue-500 uppercase mb-1">[${new Date(e.timestamp).toLocaleTimeString()}] ${e.type}</p><p className="text-sm font-medium leading-relaxed">${e.message}</p></div>)}
    </div>
  );
};