import React from 'react';
import { WindowState } from '../types';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

export const Window: React.FC<any> = ({ state, onClose, children, onFocus }) => {
  const isMobile = window.innerWidth < 768;
  const style: React.CSSProperties = {
    left: typeof state.x === 'number' ? `${state.x}px` : state.x,
    top: typeof state.y === 'number' ? `${state.y}px` : state.y,
    width: typeof state.width === 'number' ? `${state.width}px` : state.width,
    height: typeof state.height === 'number' ? `${state.height}px` : state.height,
    zIndex: state.zIndex,
    display: state.isMinimized ? 'none' : 'flex',
  };

  return (
    <div onMouseDown={() => onFocus(state.id)} className="absolute bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col pointer-events-auto transition-all" style={style}>
      <div className="h-10 sm:h-14 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between select-none cursor-move">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{state.title}</span>
        <div className="flex gap-2">
            <button onClick={() => onClose(state.id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg"><X size={16}/></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};