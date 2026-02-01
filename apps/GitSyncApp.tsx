import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { Zap, Globe, RefreshCw, Terminal, Trophy } from 'lucide-react';

export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const replicate = async () => {
    if (!token.startsWith('ghp_')) return alert("Token Requerido");
    setStatus('syncing'); setLogs(["Iniciando Replicación v15.2..."]);
    try {
      // Lógica de sincronización con GitHub API v3
      // ... (reducido para el DNA)
      setStatus('done');
    } catch (e: any) { setStatus('idle'); }
  };

  return (
    <div className="h-full bg-black text-indigo-400 p-10 font-mono">
       <h1 className="text-xl font-black mb-10 tracking-widest">DNA REPLICATOR CORE</h1>
       <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_..." className="w-full bg-indigo-950/20 border border-indigo-500/30 p-4 rounded-xl mb-4"/>
       <button onClick={replicate} className="w-full py-6 bg-indigo-600 text-white rounded-xl font-black">REPLICAR DNA MAESTRO</button>
       <div className="mt-10 space-y-2 text-[10px] opacity-50">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
    </div>
  );
};