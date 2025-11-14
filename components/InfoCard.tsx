import React from 'react';
import type { ContentCardData } from '../types';

interface InfoCardProps {
  card: ContentCardData;
}

const InfoCard: React.FC<InfoCardProps> = ({ card }) => {
  return (
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5">
      <div className="flex items-center space-x-2 mb-4">
        <h4 className="text-sm font-semibold text-slate-500">NGƯỜI THỰC HIỆN:</h4>
        <span className="px-2 py-0.5 text-xs font-bold text-orange-700 bg-orange-100 rounded-full">
          {card.performer}
        </span>
      </div>

      <div className="space-y-4">
        {/* Info Section */}
        <div className="bg-blue-50/50 p-4 rounded-lg border-l-4 border-blue-400">
          <h5 className="font-bold text-blue-800 mb-2">{card.info.title}</h5>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
            {card.info.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Note Section */}
        <div className="bg-yellow-50/50 p-4 rounded-lg border-l-4 border-yellow-400">
          <h5 className="font-bold text-yellow-800 mb-2">{card.note.title}</h5>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
            {card.note.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
