import React, { useState } from 'react';
export const TerminalApp: React.FC = () => {
  const [logs, setLogs] = useState(['Shark OS Terminal v4.2']);
  return <div className="p-4 font-mono text-green-500 bg-black h-full overflow-auto">
    {logs.map((l, i) => <div key={i}>{l}</div>)}
    <div className="flex gap-2"><span>#</span><input className="bg-transparent outline-none flex-1" /></div>
  </div>;
};