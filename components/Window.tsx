import React from 'react';
export const Window = ({ state, children, onClose, onFocus }: any) => (
  <div onMouseDown={() => onFocus(state.id)} className="absolute bg-os-bg border border-white/10 shadow-2xl overflow-hidden flex flex-col" style={{ left: state.x, top: state.y, width: state.width, height: state.height, zIndex: state.zIndex }}>
    <div className="h-10 bg-white/5 flex items-center justify-between px-4"><span>{state.title}</span><button onClick={() => onClose(state.id)}>✕</button></div>
    <div className="flex-1">{children}</div>
  </div>
);