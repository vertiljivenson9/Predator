import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Zap, ExternalLink } from 'lucide-react';
export const NewsApp = () => {
  const [news, setNews] = useState<any[]>([]);
  useEffect(() => { kernel.net.request('https://hacker-news.firebaseio.com/v0/topstories.json').then(r => setNews(JSON.parse(r).slice(0,12))); }, []);
  return (
    <div className="h-full bg-white flex flex-col font-sans">
      <div className="h-16 bg-[#ff6600] flex items-center px-6 text-white font-black italic shadow-lg relative z-10"><Zap size={20} className="mr-3"/> Y Hacker News</div>
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {news.map(n => <div key={n} className="p-5 border border-gray-100 rounded-2xl hover:bg-orange-50 transition-all flex justify-between items-center cursor-pointer group">
          <div className="flex-1"><h4 className="text-sm font-bold text-gray-800 leading-tight mb-2 group-hover:text-orange-600">ID NOTICIA: ${n}</h4><p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Ranking: +1240 | hacker-news.v1</p></div>
          <ExternalLink size={14} className="text-gray-300" />
        </div>)}
      </div>
    </div>
  );
};