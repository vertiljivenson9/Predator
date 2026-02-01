import React from 'react'; import { X, Minus, Maximize2 } from 'lucide-react';
export const Window = ({ state, onClose, onFocus, children }: any) => {
  if (state.isMinimized) return null;
  return (
    <div onMouseDown={() => onFocus(state.id)} className="absolute bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
      style={{ left: state.x, top: state.y, width: state.width, height: state.height, zIndex: state.zIndex }}>
      <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 cursor-move">
        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] flex-1">{state.title}</span>
        <div className="flex gap-2">
            <button onClick={() => onClose(state.id)} className="p-1 hover:bg-red-500/20 text-red-500 rounded"><X size={14}/></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};