import React from 'react';
import { X, Minus, Maximize2, Square } from 'lucide-react';
export const Window = ({ state, onClose, onMinimize, onMaximize, onFocus, children }: any) => {
  const style: React.CSSProperties = state.isMaximized 
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 60px)', zIndex: state.zIndex }
    : { left: state.x, top: state.y, width: state.width, height: state.height, zIndex: state.zIndex };
  if (state.isMinimized) return null;
  return (
    <div onMouseDown={() => onFocus(state.id)} className="absolute bg-os-bg/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300" style={style}>
      <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 cursor-move select-none shrink-0">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex-1 truncate">{state.title}</span>
        <div className="flex gap-2 relative z-50">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(state.id); }} className="p-1 hover:bg-white/10 rounded"><Minus size={14}/></button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(state.id); }} className="p-1 hover:bg-white/10 rounded">{state.isMaximized ? <Square size={12}/> : <Maximize2 size={12}/>}</button>
          <button onClick={(e) => { e.stopPropagation(); onClose(state.id); }} className="p-1 hover:bg-red-500/20 text-red-500 rounded"><X size={14}/></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </div>
  );
};