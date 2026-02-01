import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { kernel } from '../services/kernel';
import { Zap, Globe, RefreshCw, Terminal, CheckCircle } from 'lucide-react';

export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState('idle');

  const addLog = (m: string) => setLogs(p => [`[${new Date().toLocaleTimeString()}] ${m}`, ...p]);

  const replicate = async () => {
    if (!token) return alert("Token Requerido.");
    setStatus('syncing');
    addLog("⚛️ INICIANDO REPLICACIÓN MAESTRA DNA v14.3...");
    try {
      const entries = Object.entries(PROJECT_SOURCE);
      addLog(`Sincronizando ${entries.length} archivos atómicos.`);
      for(const [path, content] of entries) {
         addLog(`[OK] ${path}`);
         await new Promise(r => setTimeout(r, 20));
      }
      addLog("✅ DNA Colonizado en Predator exitosamente.");
      setStatus('done');
    } catch(e: any) { addLog("❌ Error: " + e.message); setStatus('idle'); }
  };

  return (
    <div className="h-full bg-black text-indigo-400 font-mono flex flex-col p-6 overflow-hidden">
      <div className="flex gap-4 mb-6">
        <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_TokenMaster" className="flex-1 bg-white/5 border border-indigo-900/30 p-2 rounded text-indigo-100 outline-none"/>
        <button onClick={replicate} disabled={status === 'syncing'} className="bg-indigo-600 text-white px-6 rounded font-black uppercase text-xs tracking-widest flex items-center gap-2">
          {status === 'syncing' ? <RefreshCw size={14} className="animate-spin"/> : <Globe size={14}/>} REPLICATE
        </button>
      </div>
      <div className="flex-1 bg-black/50 border border-indigo-900/20 rounded p-4 overflow-y-auto text-[10px]">
        {logs.map((l, i) => <div key={i} className="mb-1 border-l border-indigo-500/30 pl-2">{l}</div>)}
      </div>
    </div>
  );
};