import React, { useState } from 'react';
import { Shell } from '../services/terminal/sh';

export const TerminalApp = () => {
  const [log, setLog] = useState(['Shark Shell v4.2', 'Ready.']);
  const [input, setInput] = useState('');
  const [sh] = useState(() => new Shell());
  const [cwd, setCwd] = useState('/user/home');

  const exec = async () => {
    setLog(p => [...p, cwd + ' # ' + input]);
    await sh.exec(input, (s) => setLog(p => [...p, s]), setCwd, () => cwd);
    setInput('');
  };

  return (
    <div className="h-full bg-black p-4 font-mono text-green-500 text-xs flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2">{log.map((l, i) => <div key={i}>{l}</div>)}</div>
      <div className="flex">
        <span className="mr-2">{cwd} #</span>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && exec()} className="bg-transparent border-none outline-none text-white flex-1" autoFocus />
      </div>
    </div>
  );
};