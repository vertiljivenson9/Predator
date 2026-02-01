import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Image as ImageIcon } from 'lucide-react';
export const GalleryApp = () => (
  <div className="h-full bg-gray-900 flex flex-col items-center justify-center text-gray-700">
    <ImageIcon size={64} className="mb-4 opacity-10" />
    <p className="text-xs font-black uppercase tracking-widest">Sin Medios en /user/home/photos</p>
  </div>
);