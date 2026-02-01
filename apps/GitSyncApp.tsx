import React, { useState } from 'react';
import { PROJECT_SOURCE } from '../data/project_source';
import { Zap, Lock, GitFork, RefreshCw, Terminal, CheckCircle, ShieldAlert, Globe, AlertTriangle, X } from 'lucide-react';

const REPO_OWNER = "vertiljivenson9"; 
const REPO_NAME = "Predator";
const DEFAULT_BRANCH = "main";

export const GitSyncApp: React.FC = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'syncing' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (m: string) => setLogs(p => [`[${new Date().toLocaleTimeString([], {hour12:false})}] ${m}`, ...p]);

  const robustBase64 = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const replicate = async () => {
    if (!token.startsWith('ghp_')) {
      alert("Error: Se requiere un GitHub Personal Access Token (PAT) válido.");
      return;
    }

    setStatus('syncing');
    setLogs([]);
    addLog("⚛️ INICIANDO SECUENCIA DE REPLICACIÓN ATÓMICA...");
    addLog(`NODO OBJETIVO: ${REPO_OWNER}/${REPO_NAME}`);

    try {
      const headers = { 
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      };
      const apiBase = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

      addLog("Auditoría de DNA: Verificando integridad de módulos...");
      const filesToPush = [];
      const sourceEntries = Object.entries(PROJECT_SOURCE);

      for (const [path, content] of sourceEntries) {
          if (!content || content.trim() === "" || content.length < 10) {
              addLog(`❌ ERROR CRÍTICO: Módulo ${path} corrupto.`);
              throw new Error(`Inhibición por integridad: ${path}`);
          }
          const cleanPath = path.replace(/^(\.\/|\/)+/, "");
          filesToPush.push({ path: cleanPath, content });
      }
      addLog(`ESTADO DNA: OK (${filesToPush.length} módulos detectados)`);

      addLog("Sincronizando con el nodo maestro...");
      let parentSha = null;
      let isInitialCommit = false;

      const refRes = await fetch(`${apiBase}/git/refs/heads/${DEFAULT_BRANCH}`, { headers });
      
      if (!refRes.ok) {
          if (refRes.status === 404 || refRes.status === 409) {
              addLog("⚠️ NODO INACTIVO DETECTADO. Ejecutando Protocolo Génesis...");
              isInitialCommit = true;
              const genesisRes = await fetch(`${apiBase}/contents/README.md`, {
                  method: 'PUT',
                  headers,
                  body: JSON.stringify({
                      message: "⚛️ GENESIS: Shark OS Predator Initialization",
                      content: btoa("# Predator\nShark OS Apex Replication Node.")
                  })
              });
              if (!genesisRes.ok) {
                  const gErr = await genesisRes.json();
                  throw new Error(`Fallo en Génesis: ${gErr.message}`);
              }
              const gData = await genesisRes.json();
              parentSha = gData.commit.sha;
              addLog(`✅ Nodo inicializado. SHA de Origen: ${parentSha.substring(0, 7)}`);
          } else {
              const errData = await refRes.json();
              throw new Error(`GitHub API: ${errData.message}`);
          }
      } else {
          const refData = await refRes.json();
          parentSha = refData.object.sha;
          addLog(`Enlace activo. Parent SHA: ${parentSha.substring(0, 7)}`);
      }

      addLog("Transmitiendo DNA del sistema...");
      const treeEntries = [];
      for (const file of filesToPush) {
          const blobRes = await fetch(`${apiBase}/git/blobs`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                  content: robustBase64(file.content),
                  encoding: 'base64'
              })
          });
          if (!blobRes.ok) {
              const err = await blobRes.json();
              throw new Error(`Error en Blob [${file.path}]: ${err.message}`);
          }
          const blobData = await blobRes.json();
          treeEntries.push({ path: file.path, mode: '100644', type: 'blob', sha: blobData.sha });
          addLog(`[SYNC] ${file.path} -> OK`);
          await new Promise(r => setTimeout(r, 40));
      }

      addLog("Sellando estructura molecular...");
      const treeRes = await fetch(`${apiBase}/git/trees`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ tree: treeEntries })
      });
      const treeData = await treeRes.json();

      addLog("Generando commit atómico...");
      const commitRes = await fetch(`${apiBase}/git/commits`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: "⚛️ SHARK_OS_APEX_DEPLOY: " + new Date().toISOString(),
          tree: treeData.sha,
          parents: [parentSha]
        })
      });
      const commitData = await commitRes.json();

      addLog("Propagando DNA a la rama principal...");
      const finalRes = await fetch(`${apiBase}/git/refs/heads/${DEFAULT_BRANCH}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ sha: commitData.sha, force: true })
      });

      if (finalRes.ok) {
        addLog("✅ REPLICACIÓN FINALIZADA. El sistema es ahora autoportante en PREDATOR.");
        setStatus('done');
      } else {
        const err = await finalRes.json();
        throw new Error(`Fallo en propagación final: ${err.message}`);
      }

    } catch (e: any) {
      addLog("❌ ERROR CRÍTICO: " + e.message.toUpperCase());
      setStatus('idle');
    }
  };

  return (
    <div className="h-full bg-[#000] text-indigo-400 font-mono flex flex-col select-none">
      <div className="h-14 border-b border-indigo-900/30 flex items-center px-6 gap-3 bg-indigo-950/10">
        <Zap size={20} className="text-indigo-500 fill-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
        <h1 className="text-xs font-black uppercase tracking-[0.3em]">Flux Apex Replicator</h1>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 p-10 border-r border-indigo-900/20 flex flex-col justify-center relative">
          <div className="w-full max-w-sm mx-auto space-y-8 z-10">
            <div className="space-y-6 bg-indigo-950/5 p-8 rounded-3xl border border-indigo-900/20 shadow-2xl backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest block ml-1">Master Access Token</label>
                <div className="flex items-center gap-3 bg-black border border-indigo-900/40 p-4 rounded-xl focus-within:border-indigo-500 transition-all shadow-inner">
                  <Lock size={16} className="text-indigo-900" />
                  <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_..." className="bg-transparent border-none outline-none text-sm w-full text-indigo-100" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest block ml-1">Target Cluster</label>
                <div className="flex items-center gap-3 bg-black/40 border border-indigo-900/10 p-4 rounded-xl text-gray-500 italic text-sm">
                  <GitFork size={16} />
                  <span>{REPO_OWNER}/{REPO_NAME}</span>
                </div>
              </div>
            </div>
            <button onClick={replicate} disabled={status === 'syncing'} className={`w-full py-6 rounded-2xl font-black text-sm tracking-[0.2em] uppercase transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-4 border border-indigo-500/30 ${status === 'syncing' ? 'bg-indigo-900/10 text-indigo-800 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20'}`}>
              {status === 'syncing' ? <RefreshCw size={20} className="animate-spin" /> : <Globe size={20} />}
              {status === 'syncing' ? 'GENESIS_TRANSFER_ACTIVE' : 'Start Replicator'}
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-black flex flex-col border-l border-indigo-900/20">
          <div className="h-10 bg-indigo-950/10 border-b border-indigo-900/20 flex items-center px-4">
            <Terminal size={14} className="text-indigo-600 mr-2" />
            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-800">Telemetry_Stream_Monitor</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 font-mono text-[10px] space-y-1.5 no-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className={`p-1 border-l pl-3 ${log.includes('ERROR') || log.includes('❌') ? 'text-red-500 border-red-900 bg-red-900/5' : log.includes('FINALIZADA') || log.includes('✅') ? 'text-green-400 border-green-900 bg-green-900/5' : 'text-indigo-400/80 border-indigo-900'}`}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};