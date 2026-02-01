import React, { useState } from 'react';
import { ShoppingCart, Grid } from 'lucide-react';
export const StoreApp = () => (
  <div className="h-full bg-gray-50 flex flex-col font-sans">
    <div className="h-16 border-b flex items-center px-6 gap-3 bg-white"><ShoppingCart className="text-blue-600"/><h1 className="text-xl font-black italic uppercase tracking-tight">Shark Store</h1></div>
    <div className="p-8 grid grid-cols-1 gap-4">
      {[1,2,3].map(i => <div key={i} className="bg-white p-4 rounded-2xl border flex items-center gap-4 shadow-sm"><div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"><Grid/></div><div className="flex-1 font-bold text-sm">App de Ejemplo ${i}</div><button className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">Obtener</button></div>)}
    </div>
  </div>
);