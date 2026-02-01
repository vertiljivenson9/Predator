import React, { useState } from 'react';
export const TicTacToeApp = () => {
  const [b, setB] = useState(Array(9).fill(null));
  const handleClick = (i: number) => { const n = [...b]; n[i] = 'X'; setB(n); };
  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center text-white">
      <div className="grid grid-cols-3 gap-2 bg-slate-800 p-2 rounded-xl">
        {b.map((v, i) => <button key={i} className="w-20 h-20 bg-slate-700 rounded-lg text-4xl font-bold" onClick={() => handleClick(i)}>{v}</button>)}
      </div>
    </div>
  );
};