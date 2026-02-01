import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
export const CommandPalette = ({ apps, onLaunch }: any) => {
  const [q, setQ] = useState('');
  return (
    <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-md flex items-start justify-center pt-[20vh] animate-in fade-in duration-200">
      <div className="w-[600px] bg-[#1e1e1e]/90 border border-white/10 rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in duration-300">
        <div className="flex items-center px-6 py-6 border-b border-white/5">
          <Search className="text-gray-500 mr-4" size={24} />
          <input className="bg-transparent text-2xl text-white outline-none flex-1 font-light" placeholder="¿Qué quieres ejecutar?" value={q} onChange={e => setQ(e.target.value)} autoFocus />
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 bg-white/5 px-2 py-1 rounded">ESC</div>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {apps.filter((a:any) => a.name.toLowerCase().includes(q.toLowerCase())).map((a:any) => (
            <button key={a.id} className="w-full px-4 py-4 flex items-center gap-4 hover:bg-blue-600 text-gray-400 hover:text-white transition-all rounded-xl group" onClick={() => onLaunch(a)}>
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all"><Command size={18}/></div>
              <div className="text-left flex-1"><p className="text-sm font-black uppercase text-white tracking-widest">{a.name}</p><p className="text-[10px] font-bold text-gray-600 group-hover:text-blue-200">Viscro Corp \ APEX Runtime</p></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};