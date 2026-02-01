import React from 'react';
export const Window: React.FC<any> = ({ state, onClose, children, onFocus }) => {
  const style: React.CSSProperties = {
    left: typeof state.x === 'number' ? `${state.x}px` : state.x,
    top: typeof state.y === 'number' ? `${state.y}px` : state.y,
    width: typeof state.width === 'number' ? `${state.width}px` : state.width,
    height: typeof state.height === 'number' ? `${state.height}px` : state.height,
    zIndex: state.zIndex,
    display: state.isMinimized ? 'none' : 'flex',
  };
  return (
    <div onMouseDown={() => onFocus(state.id)} className="absolute bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col pointer-events-auto transition-all" style={style}>
      <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between select-none cursor-move">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{state.title}</span>
        <button onClick={() => onClose(state.id)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg">✕</button>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};