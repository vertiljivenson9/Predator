import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Folder, File, X } from 'lucide-react';
export const FilePicker = ({ onSelect, onCancel }: any) => (
  <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-6"><div className="bg-white rounded-2xl w-96 max-h-[500px] overflow-hidden flex flex-col shadow-2xl"><div className="h-12 border-b flex items-center justify-between px-4"><span className="text-xs font-black uppercase">Seleccionar Archivo</span><X size={16} onClick={onCancel} className="cursor-pointer"/></div><div className="flex-1 overflow-auto p-4 text-sm text-gray-500">Explorador limitado v1.0</div></div></div>
);