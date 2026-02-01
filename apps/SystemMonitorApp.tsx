import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Activity, Cpu, HardDrive } from 'lucide-react';
export const SystemMonitorApp = () => {
  const [procs, setProcs] = useState<any[]>([]);
  useEffect(() => { const i = setInterval(() => setProcs(kernel.getProcesses()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="h-full bg-gray-100 flex flex-col font-sans text-gray-800">
      <div className="h-12 border-b bg-white flex items-center px-6 gap-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-600"><Activity size={16}/> Procesos</div>
        <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400"><Cpu size={16}/> Performance</div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <table className="w-full text-left text-xs bg-white rounded-2xl shadow-sm border border-gray-100">
          <thead className="text-gray-400 border-b font-black uppercase tracking-tighter">
            <tr><th className="p-4">Process Name</th><th className="p-4">PID</th><th className="p-4">State</th></tr>
          </thead>
          <tbody>
            {procs.map(p => <tr key={p.pid} className="border-b last:border-0 hover:bg-blue-50 transition-colors">
              <td className="p-4 font-bold text-gray-700 uppercase">{p.name}</td>
              <td className="p-4 font-mono text-gray-400">{p.pid}</td>
              <td className="p-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-black text-[9px] uppercase tracking-widest">{p.status}</span></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};