import React from 'react';
import { Country } from '../types';
import { MapPin, Flag, HelpCircle } from 'lucide-react';

interface GameCardProps {
  country: Country;
  showHint: boolean;
  currentHintIndex: number;
  onShowHint: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  country,
  showHint,
  currentHintIndex,
  onShowHint,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full">
      <img
        src={country.image}
        alt="Country"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="text-rose-500" />
            <span className="text-gray-600">Guess the Country</span>
          </div>
          <Flag className="text-blue-500" />
        </div>
        
        {showHint && currentHintIndex < country.hints.length && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-700">{country.hints[currentHintIndex]}</p>
          </div>
        )}
        
        <button
          onClick={onShowHint}
          disabled={currentHintIndex >= country.hints.length}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HelpCircle size={20} />
          <span>Need a hint?</span>
        </button>
      </div>
    </div>
  );
};