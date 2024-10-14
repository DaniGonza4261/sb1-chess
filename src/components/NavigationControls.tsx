import React from 'react';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface NavigationControlsProps {
  onNavigate: (action: string) => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({ onNavigate }) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => onNavigate('start')}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <ChevronsLeft size={20} />
      </button>
      <button
        onClick={() => onNavigate('back')}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => onNavigate('forward')}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <ChevronRight size={20} />
      </button>
      <button
        onClick={() => onNavigate('end')}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
};

export default NavigationControls;