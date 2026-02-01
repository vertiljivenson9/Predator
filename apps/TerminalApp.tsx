import React, { useState, useEffect, useRef } from 'react';
import { kernel } from '../services/kernel';
import { Shell } from '../services/terminal/sh';
import { Settings, X } from 'lucide-react';
export const TerminalApp = () => {
  const [lines, setLines] = useState([{ type: 'output', content: 'Welcome to Shark Shell v4.2' }]);
  const [input, setInput] = useState('');
  const [shell] = useState(() => new Shell());
  const [cwd, setCwd] = useState('/user/home');
  const execute = async () => {
    const cmd = input.trim();
    if (!cmd) return;
    setLines(p => [...p, { type: 'input', content: `${cwd} # ${cmd}` }]);
    await shell.exec(cmd, (text) => setLines(p => [...p, { type: 'output', content: text }]), setCwd, () => cwd);
    setInput('');
  };
  return (
    <div className="h-full bg-black text-green-500 font-mono text-xs p-4 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto mb-2">{lines.map((l, i) => <div key={i} className={l.type === 'input' ? 'text-white font-bold' : ''}>{l.content}</div>)}</div>
      <div className="flex items-center gap-2"><span>{cwd} #</span><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && execute()} className="bg-transparent border-none outline-none flex-1 text-white" autoFocus /></div>
    </div>
  );
};