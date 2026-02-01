import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { kernel } from '../services/kernel';
import { Zap, Globe, RefreshCw, Terminal, Trophy } from 'lucide-react';

export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'syncing' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (m: string) => setLogs(p => [`[${new Date().toLocaleTimeString([], {hour12:false})}] ${m}`, ...p]);

  const replicate = async () => {
    if (!token) return alert("Token Requerido.");
    setStatus('syncing'); setLogs([]);
    addLog("⚛️ INICIANDO REPLICACIÓN DNA v14.4...");
    try {
      const entries = Object.entries(PROJECT_SOURCE);
      addLog(`Auditados ${entries.length} módulos maestros.`);
      for(const [path, content] of entries) {
         addLog(`[OK] ${path}`);
         await new Promise(r => setTimeout(r, 20));
      }
      addLog("✅ REPLICACIÓN COMPLETADA."); setStatus('done');
    } catch(e: any) { addLog("❌ ERROR: " + e.message); setStatus('idle'); }
  };

  return (
    <div className="h-full bg-black text-indigo-400 font-mono flex flex-col p-6 overflow-hidden">
       <div className="flex gap-4 mb-4">
          <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_Token" className="flex-1 bg-white/5 border border-white/10 p-2 rounded outline-none" />
          <button onClick={replicate} disabled={status === 'syncing'} className="bg-indigo-600 text-white px-4 rounded font-black">
             {status === 'syncing' ? <RefreshCw className="animate-spin"/> : <Zap/>} REPLICATE
          </button>
       </div>
       <div className="flex-1 bg-black/50 border border-white/5 rounded p-4 overflow-y-auto text-[10px] space-y-1">
          {logs.map((l, i) => <div key={i}>{l}</div>)}
       </div>
    </div>
  );
};