import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
        SỔ GHI ĐIỂM DÀNH CHO TIỂU HỌC
      </h1>
      <p className="mt-3 text-xl font-semibold text-slate-700">
        (Theo thông tư 27)
      </p>
    </header>
  );
};

export default Header;