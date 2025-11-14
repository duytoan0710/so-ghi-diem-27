import React from 'react';
import type { StepData } from '../types';

interface SidebarProps {
  items: StepData['menuTitle'][];
  activeStep: number;
  setActiveStep: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, activeStep, setActiveStep }) => {
  return (
    <aside className="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
      <div className="space-y-4">
        {items.map((item, index) => {
          const isActive = activeStep === index;
          return (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-full flex items-center space-x-4 p-4 rounded-xl text-left transition-all duration-300 ${
                isActive 
                ? 'bg-blue-50 shadow-md scale-105' 
                : 'hover:bg-slate-100 hover:shadow-sm'
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-colors duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {index + 1}
              </div>
              <div>
                <span className="font-bold block text-blue-800">
                  {item.main}
                </span>
                <span className="text-sm font-bold text-red-600 whitespace-nowrap">
                  {item.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;