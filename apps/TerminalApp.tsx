import React, { useState } from 'react';
export const TerminalApp = () => {
  const [log, setLog] = useState(['Predator OS Apex v15.13', 'Ready for input...']);
  return (
    <div className="h-full bg-black p-6 font-mono text-indigo-400 text-xs overflow-y-auto">
      {log.map((l, i) => <div key={i} className="mb-1">{l}</div>)}
      <div className="flex mt-4">
        <span className="mr-2 text-indigo-600 font-black">root@predator:~$</span>
        <input autoFocus className="bg-transparent border-none outline-none text-indigo-200 flex-1" />
      </div>
    </div>
  );
}