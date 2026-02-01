import React from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
export const Window = ({ state, onClose, children }: any) => (
  <div className="absolute bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
    style={{ left: state.x, top: state.y, width: state.width, height: state.height, zIndex: state.zIndex }}>
    <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 cursor-move select-none">
      <div className="flex gap-1.5 mr-4"><div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer" onClick={() => onClose(state.id)} /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" /></div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex-1">{state.title}</span>
    </div>
    <div className="flex-1 overflow-hidden relative">{children}</div>
  </div>
);