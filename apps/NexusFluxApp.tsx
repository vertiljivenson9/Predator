import React, { useState } from 'react';
import { Zap, GitFork, Terminal, RefreshCw, Database } from 'lucide-react';
export const NexusFluxApp = () => {
  const [logs, setLogs] = useState<string[]>(['Nexus Flux v1.0 Core Online.']);
  return (
    <div className="h-full bg-[#050505] text-[#e0e0e0] flex flex-col overflow-hidden">
      <div className="h-14 border-b border-white/5 bg-black/50 flex items-center px-6 justify-between"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-cyan-600 rounded flex items-center justify-center shadow-lg shadow-cyan-900/40"><Zap size={18} className="text-white fill-white"/></div><div className="text-xs font-black tracking-widest uppercase">Nexus Flux</div></div></div>
      <div className="flex-1 flex"><div className="w-1/2 p-10 flex flex-col justify-center items-center border-r border-white/5 space-y-6"><input type="password" placeholder="GitHub Master Key" className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none" /><button className="w-full py-6 bg-cyan-600 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl">Initiate Nexus Sync</button></div><div className="w-1/2 bg-black flex flex-col p-6 font-mono text-[9px] space-y-1.5 overflow-y-auto">{logs.map((l, i) => <div key={i} className="text-cyan-500/80 p-1">[${new Date().toLocaleTimeString()}] ${l}</div>)}</div></div>
    </div>
  );
};