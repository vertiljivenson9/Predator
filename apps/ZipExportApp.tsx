import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import JSZip from 'jszip';
import { Archive, Database } from 'lucide-react';
export const ZipExportApp = () => {
  const [zip, setZip] = useState(false);
  const download = async () => { setZip(true); const j = new JSZip(); Object.entries(PROJECT_SOURCE).forEach(([p,c]) => j.file(p,c)); const b = await j.generateAsync({type:'blob'}); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'shark_dna.zip'; a.click(); setZip(false); };
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] items-center justify-center p-12 text-center text-gray-300">
      <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-8"><Archive size={48} className="text-blue-500"/></div>
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Exportador de DNA</h1>
      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-8 max-w-xs">Empaqueta todos los módulos del sistema en un solo archivo .zip para backup físico.</p>
      <button onClick={download} className="px-12 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-2xl active:scale-95">{zip ? 'Packing DNA...' : 'Exportar Sistema'}</button>
      <div className="mt-12 text-[10px] text-gray-700 font-mono flex items-center gap-2"><Database size={10}/> {Object.keys(PROJECT_SOURCE).length} Módulos Detectados</div>
    </div>
  );
};