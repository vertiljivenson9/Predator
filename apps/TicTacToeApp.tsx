import React, { useState } from 'react';
export const TicTacToeApp = () => {
  const [b, setB] = useState(Array(9).fill(null));
  const [x, setX] = useState(true);
  const handleClick = (i: number) => { if(b[i]) return; const n = [...b]; n[i] = x ? 'X' : 'O'; setB(n); setX(!x); };
  return (
    <div className="h-full bg-slate-950 flex flex-col items-center justify-center text-white">
      <div className="grid grid-cols-3 gap-3 bg-slate-900 p-4 rounded-3xl border border-white/5">
        {b.map((v, i) => <button key={i} className="w-20 h-20 bg-slate-800 hover:bg-slate-700 rounded-2xl text-4xl font-black transition-all" onClick={() => handleClick(i)}>{v}</button>)}
      </div>
      <button onClick={() => setB(Array(9).fill(null))} className="mt-10 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Reiniciar Partida</button>
    </div>
  );
};