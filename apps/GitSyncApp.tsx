import React, { useState } from 'react'; import { PROJECT_SOURCE } from '../data/project_source';
export const GitSyncApp = () => {
  const [token, setToken] = useState(''); const [logs, setLogs] = useState<string[]>([]);
  const sync = async () => {
    setLogs(['[FLUX] Nucleus v15.13 connected.']);
    try {
      const headers = { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };
      const api = 'https://api.github.com/repos/vertiljivenson9/Predator';
      const refRes = await fetch(`${api}/git/refs/heads/main`, { headers });
      const ref = await refRes.json();
      const treeEntries = [];
      for (const [path, content] of Object.entries(PROJECT_SOURCE)) {
        const bRes = await fetch(`${api}/git/blobs`, { method: 'POST', headers, body: JSON.stringify({ content: btoa(unescape(encodeURIComponent(content))), encoding: 'base64' }) });
        const blob = await bRes.json();
        treeEntries.push({ path, mode: '100644', type: 'blob', sha: blob.sha });
        setLogs(p => [`DNA_SYNC: ${path}`, ...p]);
      }
      const tRes = await fetch(`${api}/git/trees`, { method: 'POST', headers, body: JSON.stringify({ tree: treeEntries }) });
      const tree = await tRes.json();
      const cRes = await fetch(`${api}/git/commits`, { method: 'POST', headers, body: JSON.stringify({ message: '⚛️ PREDATOR_v15.13: Final Unified Source', tree: tree.sha, parents: [ref.object.sha] }) });
      const commit = await cRes.json();
      await fetch(`${api}/git/refs/heads/main`, { method: 'PATCH', headers, body: JSON.stringify({ sha: commit.sha, force: true }) });
      setLogs(p => ['✅ SYSTEM_SYNCHRONIZED. CLOUDFLARE BUILD INITIATED.', ...p]);
    } catch (e: any) { setLogs(p => [`❌ FATAL_ERROR: ${e.message}`, ...p]); }
  };
  return (
    <div className="h-full bg-[#050505] text-indigo-400 p-8 font-mono text-[10px] flex flex-col">
      <h2 className="text-xl font-black mb-6 tracking-[0.2em] text-white uppercase italic">Predator Replicator v15.13</h2>
      <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="GitHub Master Key" className="bg-black border border-indigo-900/30 p-4 rounded-xl mb-4 text-white outline-none" />
      <button onClick={sync} className="bg-indigo-600 text-white p-5 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-500 shadow-2xl">Start Atomic Sync</button>
      <div className="mt-6 flex-1 bg-black/80 p-6 overflow-y-auto border border-white/5 rounded-xl space-y-1">{logs.map((l, i) => <div key={i} className={l.includes('ERROR') ? 'text-red-500' : 'text-indigo-400/60'}>{l}</div>)}</div>
    </div>
  );
}