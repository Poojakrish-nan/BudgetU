import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Category } from '../types';

interface ExpenseAlertProps {
  category: Category;
  onClose: () => void;
}

export function ExpenseAlert({ category, onClose }: ExpenseAlertProps) {
  const spentPercentage = Math.round((category.spent / category.allocated) * 100);

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 border-yellow-500 p-4 animate-slide-in">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            Budget Alert: {category.name}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            You've spent {spentPercentage}% of your budget for {category.name}.
            Only ${category.allocated - category.spent} remaining.
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}