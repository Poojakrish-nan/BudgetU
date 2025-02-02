import React, { useState } from 'react';
import { Wallet, PieChart, Receipt } from 'lucide-react';
import { BillScanner } from './components/BillScanner';
import { ExpenseChart } from './components/ExpenseChart';
import { SubscriptionTracker } from './components/SubscriptionTracker';
import { ExpenseModal } from './components/ExpenseModal';
import { ExpenseAlert } from './components/ExpenseAlert';
import { Category, Subscription, Expense } from './types';

function App() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Food', allocated: 200, spent: 0, color: '#EF4444' },
    { id: '2', name: 'Transport', allocated: 100, spent: 0, color: '#3B82F6' },
    { id: '3', name: 'Entertainment', allocated: 150, spent: 0, color: '#10B981' },
    { id: '4', name: 'Shopping', allocated: 100, spent: 0, color: '#F59E0B' },
  ]);

  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      name: 'Netflix',
      amount: 15.99,
      nextPayment: '2024-04-15',
      frequency: 'monthly'
    },
    {
      id: '2',
      name: 'Spotify',
      amount: 9.99,
      nextPayment: '2024-04-01',
      frequency: 'monthly'
    },
    {
      id: '3',
      name: 'Amazon Prime',
      amount: 139,
      nextPayment: '2024-12-01',
      frequency: 'yearly'
    }
  ]);

  const [scannedAmount, setScannedAmount] = useState<number | null>(null);
  const [alertCategory, setAlertCategory] = useState<Category | null>(null);

  const handleAmountDetected = (amount: number) => {
    setScannedAmount(amount);
  };

  const handleSaveExpense = (categoryId: string, amount: number) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        const newSpent = cat.spent + amount;
        const newCategory = {
          ...cat,
          spent: newSpent
        };
        
        // Check if we've exceeded 75% of the budget
        if (newSpent / cat.allocated >= 0.75 && cat.spent / cat.allocated < 0.75) {
          setAlertCategory(newCategory);
        }
        
        return newCategory;
      }
      return cat;
    }));
    setScannedAmount(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">BudgetU</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-semibold">Scan Bills</h2>
              </div>
              <BillScanner onAmountDetected={handleAmountDetected} />
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-semibold">Expenses Overview</h2>
              </div>
              <ExpenseChart categories={categories} />
            </section>
          </div>

          <section>
            <SubscriptionTracker subscriptions={subscriptions} />
          </section>
        </div>
      </main>

      {scannedAmount !== null && (
        <ExpenseModal
          amount={scannedAmount}
          categories={categories}
          onSave={handleSaveExpense}
          onClose={() => setScannedAmount(null)}
        />
      )}

      {alertCategory && (
        <ExpenseAlert
          category={alertCategory}
          onClose={() => setAlertCategory(null)}
        />
      )}
    </div>
  );
}

export default App;