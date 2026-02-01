import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
export const NewsApp = () => {
  const [news, setNews] = useState<any[]>([]);
  useEffect(() => { kernel.net.request('https://hacker-news.firebaseio.com/v0/topstories.json').then(r => setNews(JSON.parse(r).slice(0,10))); }, []);
  return <div className="h-full bg-white flex flex-col"><div className="h-12 bg-[#ff6600] flex items-center px-4 text-white font-black italic">Y Hacker News</div><div className="flex-1 overflow-auto p-4">{news.map(n => <div key={n} className="py-3 border-b text-sm font-bold hover:text-orange-600 cursor-pointer">ID: ${n} - Noticia cargada por red</div>)}</div></div>;
};