import React from 'react';
import { X } from 'lucide-react';
export const Window = ({ state, onClose, children }: any) => (
  <div className="absolute bg-[#0a0a0a]/95 border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
    style={{ left: 100, top: 100, width: 800, height: 600, zIndex: state.zIndex }}>
    <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 cursor-move">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex-1">{state.title}</span>
      <button onClick={() => onClose(state.id)} className="text-red-500 hover:bg-red-500/10 p-1 rounded"><X size={16}/></button>
    </div>
    <div className="flex-1 overflow-hidden">{children}</div>
  </div>
);