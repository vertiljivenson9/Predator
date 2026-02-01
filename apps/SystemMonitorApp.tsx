import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Activity, Cpu, HardDrive } from 'lucide-react';
export const SystemMonitorApp = () => {
  const [procs, setProcs] = useState(kernel.getProcesses());
  useEffect(() => { const i = setInterval(() => setProcs(kernel.getProcesses()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="h-full bg-gray-100 flex flex-col font-sans">
      <div className="h-12 border-b bg-white flex items-center px-6 gap-6"><div className="flex items-center gap-2 text-xs font-bold text-blue-600"><Activity size={16}/> Procesos</div><div className="flex items-center gap-2 text-xs font-bold text-gray-400"><Cpu size={16}/> Rendimiento</div></div>
      <div className="flex-1 overflow-auto p-4"><table className="w-full text-left text-xs"><thead><tr className="text-gray-400 border-b"><th className="pb-2 px-2">Nombre</th><th className="pb-2 px-2">PID</th><th className="pb-2 px-2">Estado</th></tr></thead><tbody>{procs.map(p => <tr key={p.pid} className="border-b hover:bg-white"><td className="py-2 px-2 font-bold">{p.name}</td><td className="py-2 px-2 font-mono">{p.pid}</td><td className="py-2 px-2 text-green-600 uppercase font-black tracking-tighter">{p.status}</td></tr>)}</tbody></table></div>
    </div>
  );
};