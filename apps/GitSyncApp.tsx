import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { Zap, Globe, RefreshCw } from 'lucide-react';
export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const robustBase64 = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };
  const replicate = async () => {
    if (!token.startsWith('ghp_')) return alert("Master Token Requerido");
    setStatus('syncing');
    setLogs(["⚛️ Iniciando Replicación v15.3..."]);
    try {
      const owner = "vertiljivenson9"; const repo = "Predator";
      const headers = { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' };
      const entries = Object.entries(PROJECT_SOURCE);
      const treeEntries = [];
      for (const [path, content] of entries) {
          const bRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
              method: 'POST', headers, body: JSON.stringify({ content: robustBase64(content), encoding: 'base64' })
          });
          const bData = await bRes.json();
          treeEntries.push({ path, mode: '100644', type: 'blob', sha: bData.sha });
          setLogs(prev => [`[OK] ${path}`, ...prev]);
      }
      const tRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
          method: 'POST', headers, body: JSON.stringify({ tree: treeEntries })
      });
      const tData = await tRes.json();
      const cRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
          method: 'POST', headers, body: JSON.stringify({ message: '⚛️ DNA_RESTORATION_v15.3', tree: tData.sha })
      });
      const cData = await cRes.json();
      await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`, {
          method: 'PATCH', headers, body: JSON.stringify({ sha: cData.sha, force: true })
      });
      setStatus('done');
      setLogs(prev => ["✅ REPLICACIÓN EXITOSA", ...prev]);
    } catch (e: any) { setStatus('idle'); setLogs(prev => [`❌ ERROR: ${e.message}`, ...prev]); }
  };
  return (
    <div className="h-full bg-black text-indigo-400 p-10 font-mono overflow-y-auto">
       <h1 className="text-xl font-black mb-10 tracking-widest flex items-center gap-4"><Zap className="text-blue-500"/> DNA REPLICATOR v15.3</h1>
       <div className="max-w-md space-y-6">
           <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_MASTER_KEY" className="w-full bg-indigo-950/20 border border-indigo-500/30 p-4 rounded-xl text-white outline-none"/>
           <button onClick={replicate} disabled={status === 'syncing'} className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
               {status === 'syncing' ? <RefreshCw className="animate-spin"/> : <Globe/>} {status === 'syncing' ? 'Sincronizando...' : 'Restaurar DNA Maestro'}
           </button>
           <div className="mt-10 space-y-2 text-[10px] opacity-70 border-t border-white/5 pt-4">
                {logs.map((l, i) => <div key={i} className="border-l border-indigo-500 pl-2">{l}</div>)}
           </div>
       </div>
    </div>
  );
};