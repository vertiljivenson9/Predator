import React from 'react';
export const TicTacToeApp: React.FC = () => {
  return <div className="h-full bg-gray-900 grid grid-cols-3 gap-1 p-2">{[...Array(9)].map((_, i) => <div key={i} className="bg-gray-800"></div>)}</div>;
};