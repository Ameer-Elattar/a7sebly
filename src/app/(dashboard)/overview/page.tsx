"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowRight,
  Plus,
  Search,
  Filter,
  MoreVertical
} from "lucide-react";

const stats = [
  { name: "Total Balance", value: "$12,450.00", icon: Wallet, color: "bg-indigo-600", trend: "+2.5%" },
  { name: "Monthly Income", value: "$4,200.00", icon: TrendingUp, color: "bg-emerald-500", trend: "+12%" },
  { name: "Monthly Expenses", value: "$1,850.00", icon: TrendingDown, color: "bg-rose-500", trend: "-5%" },
];

const transactions = [
  { id: 1, name: "Adobe Creative Cloud", date: "Mar 25, 2024", amount: "-$54.99", category: "Subscription", status: "Completed" },
  { id: 2, name: "Apple Store", date: "Mar 24, 2024", amount: "-$139.00", category: "Hardware", status: "Completed" },
  { id: 3, name: "Dribbble Pro", date: "Mar 22, 2024", amount: "-$12.00", category: "Subscription", status: "Pending" },
  { id: 4, name: "Stripe Payout", date: "Mar 20, 2024", amount: "+$2,450.00", category: "Income", status: "Completed" },
  { id: 5, name: "Uber Eats", date: "Mar 18, 2024", amount: "-$32.50", category: "Food & Drinks", status: "Completed" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back, your finance is looking good.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
             <Filter className="h-4 w-4" />
             Filters
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white ${stat.color} shadow-lg shadow-${stat.color.split('-')[1]}/20`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500">{stat.name}</p>
                <div className="flex items-end gap-2 mt-1">
                  <h3 className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</h3>
                  <span className={`text-xs font-bold mb-0.5 ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        
        {/* Recent Transactions (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
            <button className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1 group">
               View All
               <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Transaction</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{tx.name}</span>
                          <span className="text-xs font-medium text-slate-400">{tx.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          {tx.category}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-bold text-sm ${tx.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-900'}`}>
                        {tx.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold ${tx.status === 'Completed' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'} px-2 py-1 rounded-lg`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-900">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Insights / Action Card */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-slate-900 px-1">Quick Insights</h2>
           <div className="p-6 bg-indigo-600 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-indigo-600/20">
              <div className="relative z-10">
                <h3 className="text-lg font-bold">Monthly Budget</h3>
                <p className="text-indigo-100 text-xs mt-1">You've reached 65% of your total budget this month.</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>$1,850.00 spent</span>
                    <span className="text-indigo-200">of $2,845</span>
                  </div>
                  <div className="h-2 w-full bg-indigo-500 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <button className="mt-8 w-full bg-white text-indigo-600 px-4 py-2.5 rounded-xl text-sm font-black shadow-lg hover:bg-slate-100 transition-all active:scale-95">
                  Update Budget
                </button>
              </div>
              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl"></div>
           </div>

           <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-slate-900">Recent Activity</h3>
               <Search className="h-4 w-4 text-slate-400" />
             </div>
             <div className="space-y-5">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-3">
                   <div className="h-2 w-2 rounded-full mt-1.5 bg-indigo-500 shrink-0"></div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">
                     Added new account <span className="text-slate-900 font-bold">"Business Savings"</span> with $4,500 initial deposit.
                   </p>
                 </div>
               ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
