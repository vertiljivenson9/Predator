import React from 'react';
export const FilePicker: React.FC<any> = ({ onSelect, onCancel }) => {
  return <div className="fixed inset-0 bg-black/50 z-[11000] flex items-center justify-center"><div className="bg-white w-96 p-4 rounded-xl">Select File...</div></div>;
};