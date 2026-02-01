import React from 'react';
export const EditorApp: React.FC<any> = ({ file }) => {
  return <textarea className="w-full h-full bg-[#1e1e1e] text-white p-4 font-mono outline-none" defaultValue={"Editing: " + file} />;
};