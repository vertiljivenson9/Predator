import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { Zap, RefreshCw, Trophy, Database } from 'lucide-react';

export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'syncing' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (m: string) => setLogs(p => [`[${new Date().toLocaleTimeString([], {hour12:false})}] ${m}`, ...p]);
  const robustBase64 = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) { binary += String.fromCharCode(bytes[i]); }
    return btoa(binary);
  };
  const replicate = async () => {
    if (!token.startsWith('ghp_')) return alert("Token Inválido");
    setStatus('syncing'); setLogs([]); addLog("⚛️ INICIANDO SECUENCIA PREDATOR v15.13...");
    try {
      const headers = { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };
      const api = 'https://api.github.com/repos/vertiljivenson9/Predator';
      const refRes = await fetch(`${api}/git/refs/heads/main`, { headers });
      const refData = await refRes.json();
      const parentSha = refData.object.sha;
      const treeEntries = [];
      for (const [path, content] of Object.entries(PROJECT_SOURCE)) {
          const bRes = await fetch(`${api}/git/blobs`, { method: 'POST', headers, body: JSON.stringify({ content: robustBase64(content), encoding: 'base64' }) });
          const bData = await bRes.json();
          treeEntries.push({ path: path.replace(/^\//, ""), mode: '100644', type: 'blob', sha: bData.sha });
          addLog(`SYNC: ${path} -> ${bData.sha.substring(0,7)}`);
      }
      const tRes = await fetch(`${api}/git/trees`, { method: 'POST', headers, body: JSON.stringify({ tree: treeEntries }) });
      const tData = await tRes.json();
      const cRes = await fetch(`${api}/git/commits`, { method: 'POST', headers, body: JSON.stringify({ message: '⚛️ SHARK_OS_v15.13: Full DNA Deployment', tree: tData.sha, parents: [parentSha] }) });
      const cData = await cRes.json();
      await fetch(`${api}/git/refs/heads/main`, { method: 'PATCH', headers, body: JSON.stringify({ sha: cData.sha, force: true }) });
      setStatus('done'); addLog("✅ SISTEMA SINCRONIZADO.");
    } catch (e: any) { addLog(`❌ ERROR: ${e.message}`); setStatus('idle'); }
  };
  return (
    <div className="h-full bg-black text-indigo-400 font-mono flex flex-col p-6">
      <h2 className="text-xl font-black uppercase mb-4 tracking-widest flex items-center gap-3"><Zap className="animate-pulse"/> Replicator v15.13</h2>
      <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="GitHub Master Key" className="bg-white/5 border border-indigo-900/40 p-4 rounded-xl mb-4 text-white outline-none" />
      <button onClick={replicate} disabled={status === 'syncing'} className="bg-indigo-600 text-white p-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all">
        {status === 'syncing' ? <RefreshCw className="animate-spin" /> : <Database />} {status === 'syncing' ? 'Syncing DNA...' : 'Launch Replicator'}
      </button>
      <div className="mt-4 flex-1 bg-black/50 p-4 overflow-y-auto rounded-xl text-[9px] border border-indigo-950/20">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
    </div>
  );
};