import React from 'react';
export const Window: React.FC<any> = ({ state, onClose, children, onFocus }) => {
  const style: React.CSSProperties = { left: state.x, top: state.y, width: state.width, height: state.height, zIndex: state.zIndex, display: 'flex', position: 'absolute' };
  return (
    <div onMouseDown={() => onFocus(state.id)} className="bg-[#0f172a] border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col" style={style}>
      <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-white/5">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{state.title}</span>
        <button onClick={() => onClose(state.id)} className="text-red-500">✕</button>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};