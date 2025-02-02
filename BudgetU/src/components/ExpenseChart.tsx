import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Category } from '../types';

interface ExpenseChartProps {
  categories: Category[];
}

export function ExpenseChart({ categories }: ExpenseChartProps) {
  const data = categories.map(cat => ({
    name: cat.name,
    allocated: cat.allocated,
    spent: cat.spent
  }));

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="allocated" fill="#4F46E5" name="Allocated" />
          <Bar dataKey="spent" fill="#EF4444" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}