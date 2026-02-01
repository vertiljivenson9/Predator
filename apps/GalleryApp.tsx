import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Image as ImageIcon } from 'lucide-react';
export const GalleryApp = () => (
  <div className="h-full bg-[#111] flex flex-col items-center justify-center text-gray-800">
    <ImageIcon size={80} className="mb-4 opacity-5" />
    <p className="text-[10px] font-black uppercase tracking-[0.4em]">No hay medios disponibles</p>
  </div>
);