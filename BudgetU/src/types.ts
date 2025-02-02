export interface Category {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextPayment: string;
  frequency: 'monthly' | 'yearly';
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}