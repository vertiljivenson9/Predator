import React, { useState } from 'react'; import { PROJECT_SOURCE } from '../data/project_source'; import { Zap, RefreshCw, Database, Trophy, Terminal } from 'lucide-react';
export const GitSyncApp = () => {
  const [token, setToken] = useState(''); const [status, setStatus] = useState('idle'); const [logs, setLogs] = useState([]);
  const addLog = (m) => setLogs(p => [`[${new Date().toLocaleTimeString()}] ${m}`, ...p]);
  const replicate = async () => {
    if (!token.startsWith('ghp_')) return alert("Token Invalido");
    setStatus('syncing'); setLogs([]); addLog("⚛️ INICIANDO SECUENCIA PREDATOR v15.13...");
    try {
      const headers = { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };
      const api = 'https://api.github.com/repos/vertiljivenson9/Predator';
      const refRes = await fetch(`${api}/git/refs/heads/main`, { headers });
      const ref = await refRes.json();
      const treeEntries = [];
      for (const [path, content] of Object.entries(PROJECT_SOURCE)) {
        const bRes = await fetch(`${api}/git/blobs`, { method: 'POST', headers, body: JSON.stringify({ content: btoa(unescape(encodeURIComponent(content))), encoding: 'base64' }) });
        const blob = await bRes.json();
        treeEntries.push({ path: path.replace(/^\//, ""), mode: '100644', type: 'blob', sha: blob.sha });
        addLog(`DNA_SYNC: ${path}`);
      }
      const tRes = await fetch(`${api}/git/trees`, { method: 'POST', headers, body: JSON.stringify({ tree: treeEntries }) });
      const tree = await tRes.json();
      const cRes = await fetch(`${api}/git/commits`, { method: 'POST', headers, body: JSON.stringify({ message: '⚛️ SHARK_OS_v15.13: Atomic Full Sync', tree: tree.sha, parents: [ref.object.sha] }) });
      const commit = await cRes.json();
      await fetch(`${api}/git/refs/heads/main`, { method: 'PATCH', headers, body: JSON.stringify({ sha: commit.sha, force: true }) });
      setStatus('done'); addLog("✅ SISTEMA SINCRONIZADO.");
    } catch (e) { addLog(`❌ ERROR: ${e.message}`); setStatus('idle'); }
  };
  return (
    <div className="h-full bg-black text-indigo-400 font-mono flex flex-col overflow-hidden">
      <div className="h-14 border-b border-indigo-900/30 flex items-center px-6 gap-3 bg-indigo-950/10">
        <Zap size={20} className="text-indigo-500 animate-pulse" /><h1 className="text-xs font-black uppercase tracking-[0.4em]">Shark Replicator v15.13</h1>
      </div>
      <div className="flex-1 flex">
        <div className="w-1/2 p-10 flex flex-col justify-center items-center">
            {status === 'done' ? <Trophy size={80} className="text-indigo-300" /> : 
            <div className="w-full max-w-sm space-y-6">
                <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="GitHub Master Token" className="w-full bg-black border border-indigo-900/40 p-4 rounded-2xl text-white outline-none" />
                <button onClick={replicate} disabled={status === 'syncing'} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black uppercase">{status === 'syncing' ? 'Syncing...' : 'Launch Replicator'}</button>
            </div>}
        </div>
        <div className="w-1/2 bg-black/60 border-l border-indigo-900/10 overflow-y-auto p-6 text-[9px]">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
      </div>
    </div>
  );
}