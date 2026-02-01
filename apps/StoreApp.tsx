import React from 'react';
import { ShoppingCart, Grid, Download } from 'lucide-react';
export const StoreApp = () => (
  <div className="h-full bg-slate-50 flex flex-col font-sans text-slate-900">
    <div className="p-6 bg-white border-b flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <h1 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3"><ShoppingCart className="text-blue-600"/> Shark Store</h1>
    </div>
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[1,2,3,4].map(i => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300"><Grid size={32}/></div>
          <div className="flex-1">
            <h4 className="font-black uppercase text-xs mb-1">Apex App Prototype ${i}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Categoría: Utilidades</p>
          </div>
          <button className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 active:scale-90 transition-all"><Download size={18}/></button>
        </div>
      ))}
    </div>
  </div>
);