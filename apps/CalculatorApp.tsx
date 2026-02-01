import React, { useState } from 'react';
export const CalculatorApp: React.FC = () => {
  const [d, setD] = useState('0');
  const add = (k: string) => setD(p => p === '0' ? k : p + k);
  return (
    <div className="h-full bg-black text-white p-6 flex flex-col font-sans">
      <div className="flex-1 flex items-end justify-end text-7xl font-thin mb-8 truncate">{d}</div>
      <div className="grid grid-cols-4 gap-3">
        {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(k => (
          <button key={k} onClick={() => k === 'C' ? setD('0') : k === '=' ? setD(eval(d).toString()) : add(k)} className="aspect-square bg-[#1c1c1e] hover:bg-[#2c2c2e] rounded-full text-2xl font-bold transition-all">{k}</button>
        ))}
      </div>
    </div>
  );
};