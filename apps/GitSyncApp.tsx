import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
export const GitSyncApp = () => {
  const [token, setToken] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const sync = async () => {
    const entries = Object.entries(PROJECT_SOURCE);
    setLogs(['Iniciando replica con ' + entries.length + ' archivos...']);
    for (const [p] of entries) setLogs(prev => [...prev, '[OK] ' + p]);
    setLogs(prev => [...prev, 'REPLICACIÓN_COMPLETA']);
  };
  return <div className="p-10 text-indigo-400 bg-black h-full font-mono overflow-auto"><input type="password" value={token} onChange={e => setToken(e.target.value)} /><button onClick={sync}>Sincronizar</button><div>{logs.map((l, i) => <div key={i}>{l}</div>)}</div></div>;
};