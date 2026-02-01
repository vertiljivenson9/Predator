import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { Zap, RefreshCw, Trophy, Database } from 'lucide-react';
export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (m: string) => setLogs(p => [`[${new Date().toLocaleTimeString()}] ${m}`, ...p]);
  const run = async () => {
    if(!token.startsWith('ghp_')) return alert('Invalid Master Token');
    setStatus('syncing'); setLogs([]); addLog('⚛️ INITIALIZING PREDATOR v15.13 DNA SEQUENCE...');
    try {
      const headers = { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };
      const api = 'https://api.github.com/repos/vertiljivenson9/Predator';
      const refRes = await fetch(`${api}/git/refs/heads/main`, { headers });
      const refData = await refRes.json(); const parentSha = refData.object.sha;
      const treeEntries = [];
      for (const [path, content] of Object.entries(PROJECT_SOURCE)) {
        const bRes = await fetch(`${api}/git/blobs`, { method: 'POST', headers, body: JSON.stringify({ content: btoa(unescape(encodeURIComponent(content))), encoding: 'base64' }) });
        const bData = await bRes.json();
        treeEntries.push({ path: path.replace(/^\//, ""), mode: '100644', type: 'blob', sha: bData.sha });
        addLog(`DNA_SYNC: ${path} [OK]`);
      }
      const tRes = await fetch(`${api}/git/trees`, { method: 'POST', headers, body: JSON.stringify({ tree: treeEntries }) });
      const tData = await treeRes.json();
      const cRes = await fetch(`${api}/git/commits`, { method: 'POST', headers, body: JSON.stringify({ message: '⚛️ SHARK_OS_v15.13: Final DNA Deployment', tree: tData.sha, parents: [parentSha] }) });
      const cData = await cRes.json();
      await fetch(`${api}/git/refs/heads/main`, { method: 'PATCH', headers, body: JSON.stringify({ sha: cData.sha, force: true }) });
      setStatus('done'); addLog('✅ DNA REPLICATION SUCCESSFUL.');
    } catch (e: any) { addLog(`❌ CRITICAL_FAIL: ${e.message.toUpperCase()}`); setStatus('idle'); }
  };
  return (
    <div className="h-full bg-black text-indigo-400 font-mono flex flex-col p-6">
      <h2 className="text-xl font-black uppercase mb-4 tracking-widest flex items-center gap-3"><Zap className="animate-pulse"/> Replicator v15.13</h2>
      <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="GitHub Master Key" className="bg-white/5 border border-indigo-900/40 p-5 rounded-3xl text-white outline-none mb-6" />
      <button onClick={run} disabled={status === 'syncing'} className="bg-indigo-600 text-white p-6 rounded-3xl font-black uppercase tracking-widest transition-all hover:bg-indigo-500 shadow-2xl flex items-center justify-center gap-4">
        {status === 'syncing' ? <RefreshCw className="animate-spin" /> : <Database />} {status === 'syncing' ? 'REPLICATING DNA...' : 'LAUNCH REPLICATOR'}
      </button>
      <div className="mt-6 flex-1 bg-black/50 p-4 overflow-y-auto rounded-3xl border border-white/5 text-[9px] no-scrollbar">{logs.map((l, i) => <div key={i} className="mb-1">{l}</div>)}</div>
    </div>
  );
};