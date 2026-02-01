import React from 'react';
import { Wifi, Bluetooth, Plane, Moon, Sun, Volume2, X } from 'lucide-react';
export const ControlCenter = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex justify-end p-2 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-80 md:w-96 bg-black/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-6 flex flex-col text-white shadow-[0_30px_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-8 pl-2"><h2 className="text-lg font-black uppercase tracking-widest italic">Control Center</h2><button onClick={onClose} className="p-2 bg-white/5 rounded-full"><X size={16}/></button></div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 rounded-3xl p-4 grid grid-cols-2 gap-2 border border-white/5 shadow-inner">
            <div className="aspect-square bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]"><Wifi size={20}/></div>
            <div className="aspect-square bg-white/5 rounded-full flex items-center justify-center border border-white/5"><Bluetooth size={20}/></div>
          </div>
          <div className="bg-white/5 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 border border-white/5">
            <Volume2 size={24}/><div className="w-full h-1.5 bg-white/10 rounded-full mt-2"><div className="w-3/4 h-full bg-white rounded-full shadow-[0_0_10px_white]" /></div>
          </div>
        </div>
        <div className="bg-white/5 rounded-3xl p-4 flex items-center gap-4 border border-white/5 mb-8">
          <Sun size={20}/><div className="flex-1 h-1.5 bg-white/10 rounded-full"><div className="w-full h-full bg-white rounded-full shadow-[0_0_10px_white]" /></div>
        </div>
      </div>
    </div>
  );
};