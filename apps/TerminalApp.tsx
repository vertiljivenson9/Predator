import React, { useState, useEffect, useRef } from 'react';
import { kernel } from '../services/kernel';
import { Shell } from '../services/terminal/sh';
export const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState([{ type: 'info', content: 'Shark OS Shell v4.2' }]);
  const [input, setInput] = useState('');
  const [shell] = useState(() => new Shell());
  const [cwd, setCwd] = useState('/user/home');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [lines]);
  const handleExec = async () => {
    const cmd = input.trim(); if (!cmd) return;
    setLines(p => [...p, { type: 'input', content: `${cwd} # ${cmd}` }]);
    await shell.exec(cmd, (t) => setLines(p => [...p, { type: 'output', content: t }]), setCwd, () => cwd);
    setInput('');
  };
  return (
    <div className="h-full bg-black text-green-500 font-mono text-xs p-4 flex flex-col overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 no-scrollbar">
        {lines.map((l, i) => <div key={i} className={l.type === 'input' ? 'text-white font-bold' : ''}>{l.content}</div>)}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-400 font-bold shrink-0">{cwd} #</span>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleExec()} className="bg-transparent border-none outline-none flex-1 text-white" autoFocus />
      </div>
    </div>
  );
};