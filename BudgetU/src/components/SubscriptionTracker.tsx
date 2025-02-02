import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { Subscription } from '../types';

interface SubscriptionTrackerProps {
  subscriptions: Subscription[];
}

export function SubscriptionTracker({ subscriptions }: SubscriptionTrackerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Subscription Tracker</h2>
      <div className="space-y-4">
        {subscriptions.map(sub => (
          <div
            key={sub.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{sub.name}</h3>
                <p className="text-sm text-gray-600">${sub.amount} / {sub.frequency}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Next: {new Date(sub.nextPayment).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}