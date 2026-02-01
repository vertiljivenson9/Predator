import React from 'react';
export const ControlCenter: React.FC<any> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[9999] flex justify-end p-4">
    <div className="bg-black/80 backdrop-blur-xl w-80 rounded-3xl p-6 border border-white/10 text-white animate-in slide-in-from-right">
       <button onClick={onClose} className="mb-4 text-xs font-bold uppercase">Close</button>
       <div className="grid grid-cols-2 gap-4"><div className="bg-white/10 p-4 rounded-2xl">WIFI</div><div className="bg-white/10 p-4 rounded-2xl">BLUETOOTH</div></div>
    </div>
  </div>;
};