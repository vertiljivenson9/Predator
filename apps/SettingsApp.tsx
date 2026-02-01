import React, { useState, useEffect } from 'react';
import { Monitor, Lock, Cpu, Palette } from 'lucide-react';
import { kernel } from '../services/kernel';
export const SettingsApp = () => {
  return (
    <div className="h-full flex bg-slate-50">
      <div className="w-48 border-r bg-white p-4 flex flex-col gap-2">
        <div className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-3"><Monitor size={16}/> Display</div>
        <div className="px-3 py-2 text-gray-400 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-gray-50 cursor-pointer"><Lock size={16}/> Security</div>
        <div className="px-3 py-2 text-gray-400 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-gray-50 cursor-pointer"><Cpu size={16}/> System</div>
      </div>
      <div className="flex-1 p-12 overflow-auto"><h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Ajustes de Entorno</h2><div className="bg-white border rounded-2xl p-6 shadow-sm"><p className="text-xs text-gray-400 uppercase font-black mb-4 tracking-widest">Fondo de Pantalla</p><div className="grid grid-cols-2 gap-4"><div className="aspect-video bg-indigo-600 rounded-xl cursor-pointer" /><div className="aspect-video bg-black rounded-xl cursor-pointer" /></div></div></div>
    </div>
  );
};