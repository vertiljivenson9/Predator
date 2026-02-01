import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { Zap, Globe, RefreshCw } from 'lucide-react';
export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const sync = async () => {
    if(!token) return alert("Token Requerido");
    setIsSyncing(true);
    setLogs(["Iniciando restauración DNA v15.4..."]);
    try {
      const owner = "vertiljivenson9"; const repo = "Predator";
      const headers = { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' };
      const entries = Object.entries(PROJECT_SOURCE);
      const tree = [];
      for (const [path, content] of entries) {
        const b = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
          method: 'POST', headers, body: JSON.stringify({ content: btoa(unescape(encodeURIComponent(content))), encoding: 'base64' })
        }).then(r => r.json());
        tree.push({ path, mode: '100644', type: 'blob', sha: b.sha });
        setLogs(p => [`[OK] ${path}`, ...p]);
      }
      const t = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, { method: 'POST', headers, body: JSON.stringify({ tree }) }).then(r => r.json());
      const c = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, { method: 'POST', headers, body: JSON.stringify({ message: 'RESTORATION_v15.4', tree: t.sha }) }).then(r => r.json());
      await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`, { method: 'PATCH', headers, body: JSON.stringify({ sha: c.sha, force: true }) });
      setLogs(p => ["✅ DNA RESTAURADO CON ÉXITO", ...p]);
    } catch(e) { setLogs(p => [`❌ ERROR: ${e.message}`, ...p]); }
    setIsSyncing(false);
  };

  return (
    <div className="h-full bg-black text-indigo-400 p-10 font-mono overflow-y-auto">
      <h2 className="text-xl font-black mb-8 flex items-center gap-3"><Zap className="text-blue-500"/> DNA REPLICATOR</h2>
      <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_..." className="w-full bg-indigo-950/20 border border-indigo-500/30 p-4 rounded-xl text-white mb-4"/>
      <button onClick={sync} disabled={isSyncing} className="w-full py-6 bg-indigo-600 text-white rounded-xl font-black uppercase">{isSyncing ? 'Sincronizando...' : 'Restaurar Sistema Completo'}</button>
      <div className="mt-6 space-y-1 text-[10px] opacity-50">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
    </div>
  );
};