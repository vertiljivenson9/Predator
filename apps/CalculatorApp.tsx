import React, { useState } from 'react';
export const CalculatorApp = () => {
  const [d, setD] = useState('0');
  const btn = "w-full aspect-square bg-gray-800 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-700";
  return (
    <div className="h-full bg-black text-white p-6 flex flex-col">
      <div className="flex-1 flex items-end justify-end text-6xl font-light mb-8 truncate">{d}</div>
      <div className="grid grid-cols-4 gap-3">
        {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(k => <button key={k} className={btn} onClick={() => k === 'C' ? setD('0') : setD(p => p === '0' ? k : p + k)}>{k}</button>)}
      </div>
    </div>
  );
};