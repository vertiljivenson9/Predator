import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { Zap, RefreshCw, Trophy, Database, Terminal } from 'lucide-react';
export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (m: string) => setLogs(p => [`[${new Date().toLocaleTimeString()}] ${m}`, ...p]);
  const run = async () => {
    if(!token.startsWith('ghp_')) return alert('Token Maestro Inválido');
    setStatus('syncing'); setLogs([]); addLog('INICIANDO REPLICACIÓN ATÓMICA APEX v15.13...');
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
        addLog(`DNA_SYNC: ${path}`);
      }
      const tRes = await fetch(`${api}/git/trees`, { method: 'POST', headers, body: JSON.stringify({ tree: treeEntries }) });
      const tData = await tRes.json();
      const cRes = await fetch(`${api}/git/commits`, { method: 'POST', headers, body: JSON.stringify({ message: '⚛️ SHARK_OS_v15.13: Full DNA Deployment', tree: tData.sha, parents: [parentSha] }) });
      const cData = await cRes.json();
      await fetch(`${api}/git/refs/heads/main`, { method: 'PATCH', headers, body: JSON.stringify({ sha: cData.sha, force: true }) });
      setStatus('done'); addLog('✅ REPLICACIÓN EXITOSA.');
    } catch (e: any) { addLog(`❌ FALLO CRÍTICO: ${e.message.toUpperCase()}`); setStatus('idle'); }
  };
  return (
    <div className="h-full bg-black text-indigo-400 font-mono flex flex-col overflow-hidden">
      <div className="h-14 border-b border-indigo-900/30 flex items-center px-6 gap-4 bg-indigo-950/10 shrink-0">
        <Zap size={20} className="text-indigo-500 animate-pulse"/><h1 className="text-xs font-black uppercase tracking-[0.4em]">Shark Replicator v15.13</h1>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 p-10 flex flex-col justify-center items-center gap-8 border-r border-indigo-900/10">
          {status === 'done' ? <Trophy size={100} className="text-indigo-300 drop-shadow-[0_0_30px_#4f46e5]" /> : <div className="w-full max-w-sm space-y-6">
            <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="GitHub Master Key" className="w-full bg-black border border-indigo-900/40 p-5 rounded-3xl text-white outline-none focus:border-indigo-500 transition-all shadow-inner" />
            <button onClick={run} disabled={status === 'syncing'} className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4">
              {status === 'syncing' ? <RefreshCw className="animate-spin"/> : <Database/>} {status === 'syncing' ? 'Sincronizando...' : 'Lanzar Replicador Atómico'}
            </button>
          </div>}
        </div>
        <div className="w-1/2 bg-black flex flex-col">
          <div className="h-10 bg-indigo-950/20 border-b border-indigo-900/20 flex items-center px-6 text-[10px] font-black uppercase text-indigo-800 tracking-widest"><Terminal size={14} className="mr-3"/> Monitor de Sincronización</div>
          <div className="flex-1 overflow-y-auto p-6 text-[9px] space-y-1.5 no-scrollbar">{logs.map((l, i) => <div key={i} className={`p-1 border-l-2 ${l.includes('❌')?'text-red-500 border-red-900':'text-indigo-400 border-indigo-900/30'}`}>{l}</div>)}</div>
        </div>
      </div>
    </div>
  );
};