import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
export const CommandPalette = ({ apps, onLaunch }: any) => {
  const [q, setQ] = useState('');
  return (
    <div className="fixed inset-0 z-[10000] bg-black/20 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-[500px] bg-[#1e1e1e]/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-white/10"><Search className="text-gray-400 mr-3" size={20} /><input className="bg-transparent text-xl text-white outline-none flex-1" placeholder="Type to search..." value={q} onChange={e => setQ(e.target.value)} autoFocus /></div>
        <div className="py-2">{apps.filter((a:any) => a.name.toLowerCase().includes(q.toLowerCase())).map((a:any) => <button key={a.id} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors text-sm font-bold" onClick={() => onLaunch(a)}>{a.name}</button>)}</div>
      </div>
    </div>
  );
};