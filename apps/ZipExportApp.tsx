import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import JSZip from 'jszip';
import { Archive, Database, Code2, Cpu } from 'lucide-react';
export const ZipExportApp: React.FC = () => {
  const [zipping, setZipping] = useState(false);
  const run = async () => {
    setZipping(true); const zip = new JSZip();
    Object.entries(PROJECT_SOURCE).forEach(([p, c]) => zip.file(p, c));
    const b = await zip.generateAsync({ type: 'blob' });
    const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'shark_os_dna_apex.zip'; a.click();
    setZipping(false);
  };
  return (
    <div className="h-full bg-[#0a0a0a] text-gray-300 flex flex-col font-sans">
      <div className="w-full flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-32 h-32 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center border border-blue-500/20 mb-10 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
          <Archive size={64} className="text-blue-500" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-4 italic">Archive Tool v1.0</h2>
        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest max-w-sm mb-12">Empaqueta la totalidad de los 60 módulos del DNA en un solo archivo físico .zip para portabilidad total.</p>
        <button onClick={run} disabled={zipping} className="px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl active:scale-95 disabled:opacity-30">
          {zipping ? 'Empaquetando DNA...' : 'Exportar Sistema Apex'}
        </button>
        <div className="mt-16 flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-700">
          <div className="flex items-center gap-2"><Database size={12}/> {Object.keys(PROJECT_SOURCE).length} Módulos Detectados</div>
          <div className="flex items-center gap-2"><Code2 size={12}/> v15.13_STABLE</div>
        </div>
      </div>
    </div>
  );
};