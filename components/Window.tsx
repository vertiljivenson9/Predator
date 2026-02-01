import React from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
export const Window: React.FC<any> = ({ state, onClose, onMinimize, onMaximize, onFocus, onUpdate, children }) => {
  return (
    <div 
      onMouseDown={() => onFocus(state.id)}
      className="absolute bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col pointer-events-auto"
      style={{ left: state.isMaximized ? 0 : state.x, top: state.isMaximized ? 0 : state.y, width: state.isMaximized ? '100vw' : state.width, height: state.isMaximized ? '100vh' : state.height, zIndex: state.zIndex, display: state.isMinimized ? 'none' : 'flex' }}
    >
      <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 shrink-0 cursor-move">
        <span className="text-[10px] font-black text-gray-400 uppercase flex-1 tracking-widest">{state.title}</span>
        <div className="flex gap-2 relative z-[60]">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(state.id); }} className="p-1 hover:bg-white/10 rounded"><Minus size={14}/></button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(state.id); }} className="p-1 hover:bg-white/10 rounded"><Maximize2 size={12}/></button>
          <button onClick={(e) => { e.stopPropagation(); onClose(state.id); }} className="p-1 hover:bg-red-500/20 text-red-500 rounded"><X size={14}/></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative bg-black/20">{children}</div>
    </div>
  );
};