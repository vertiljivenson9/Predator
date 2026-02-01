import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { History, Binary } from 'lucide-react';
export const TimelineApp = () => {
  const [ev, setEv] = useState<any[]>([]);
  useEffect(() => { return kernel.history.subscribe(setEv); }, []);
  return (
    <div className="h-full bg-[#020617] text-gray-300 flex flex-col font-sans">
      <div className="h-12 border-b border-white/5 flex items-center px-6 gap-2 shrink-0"><History size={16} className="text-blue-500"/><span className="text-[10px] font-black uppercase tracking-widest">Nexus Timeline</span></div>
      <div className="flex-1 overflow-auto p-8 space-y-6">{ev.map((e,i) => <div key={i} className="flex gap-4 border-l border-white/10 pl-6 relative"><div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-blue-500"/><div className="text-[9px] text-blue-500 font-mono uppercase font-black tracking-widest">{e.t}</div><div className="text-sm font-medium text-gray-400">{e.m}</div></div>)}</div>
    </div>
  );
};