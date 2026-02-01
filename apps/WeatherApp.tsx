import React from 'react';
import { Cloud, Sun } from 'lucide-react';
export const WeatherApp = () => (
  <div className="h-full bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col items-center justify-center p-8">
    <Sun size={80} className="mb-6 animate-pulse" />
    <h1 className="text-7xl font-thin tracking-tighter">24°</h1>
    <p className="text-lg font-bold uppercase tracking-widest mt-2">Despejado</p>
    <div className="mt-12 w-full bg-white/10 rounded-2xl p-6 backdrop-blur">Pronóstico limitado v1.0</div>
  </div>
);