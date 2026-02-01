import React from 'react';
import { Wifi, Bluetooth, Plane, Moon, Sun, Volume2, X } from 'lucide-react';
export const ControlCenter = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex justify-end p-2"><div className="absolute inset-0 bg-black/20" onClick={onClose} /><div className="relative w-80 md:w-96 bg-black/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-6 flex flex-col text-white animate-in slide-in-from-right duration-200"><div className="flex justify-between items-center mb-8"><h2 className="text-lg font-bold">Control Center</h2><X onClick={onClose} className="cursor-pointer opacity-50"/></div><div className="grid grid-cols-2 gap-4 mb-8"><div className="bg-white/10 rounded-3xl p-4 grid grid-cols-2 gap-2"><div className="aspect-square bg-blue-500 rounded-full flex items-center justify-center"><Wifi size={20}/></div><div className="aspect-square bg-white/10 rounded-full flex items-center justify-center"><Bluetooth size={20}/></div></div><div className="bg-white/10 rounded-3xl p-4 flex flex-col items-center justify-center gap-1"><Volume2 size={24}/><div className="w-full h-1.5 bg-white/10 rounded-full mt-2"><div className="w-3/4 h-full bg-white rounded-full" /></div></div></div></div></div>
  );
};