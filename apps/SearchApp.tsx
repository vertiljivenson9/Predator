import React, { useState } from 'react';
import { Globe, Search } from 'lucide-react';
export const SearchApp = () => (
  <div className="h-full bg-slate-900 flex flex-col"><div className="h-12 bg-slate-800 flex items-center px-4 gap-4"><Globe size={18} className="text-slate-400" /><input className="bg-slate-700 rounded-full flex-1 px-4 py-1 text-xs text-white outline-none" placeholder="Search the web..." /></div><div className="flex-1 flex flex-col items-center justify-center text-slate-700"><h1 className="text-8xl font-black">VJ</h1><p className="text-xs font-bold uppercase tracking-widest mt-4">Viscrosoft Jedge v99.0</p></div></div>
);