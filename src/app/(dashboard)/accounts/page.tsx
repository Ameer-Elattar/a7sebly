"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Wallet, 
  CreditCard, 
  Banknote, 
  MoreVertical, 
  Search, 
  Filter,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { GET_ACCOUNTS_QUERY } from "@/graphql/queries/accounts";
import { Account } from "@/types/account";
import { AccountType } from "@/types/enums";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AccountsPage() {
  const { loading, error, data } = useQuery<{ accounts: Account[] }>(GET_ACCOUNTS_QUERY);

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case AccountType.CASH: return <Banknote className="h-6 w-6" />;
      case AccountType.CREDIT: return <CreditCard className="h-6 w-6" />;
      case AccountType.DEBIT: return <Wallet className="h-6 w-6" />;
      default: return <Wallet className="h-6 w-6" />;
    }
  };

  const getAccountColor = (type: AccountType) => {
    switch (type) {
      case AccountType.CASH: return "bg-emerald-500 text-white shadow-emerald-500/20";
      case AccountType.CREDIT: return "bg-rose-500 text-white shadow-rose-500/20";
      case AccountType.DEBIT: return "bg-indigo-600 text-white shadow-indigo-600/20";
      default: return "bg-slate-600 text-white shadow-slate-600/20";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full shadow-lg" />
          <p className="text-slate-500 font-bold animate-pulse text-sm uppercase tracking-widest">Loading Accounts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center p-6 text-center">
         <div className="max-w-md space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mb-2">
               <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Oops! Failed to load accounts</h2>
            <p className="text-slate-500 leading-relaxed font-medium">Please check your connection and try again. Error: {error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              Retry
            </button>
         </div>
      </div>
    );
  }

  const accounts = data?.accounts || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">Financial Accounts</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track your balances across all your wallets.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
             <Filter className="h-4 w-4" />
             Filter
          </button>
          <Link 
            href="/accounts/new"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl text-sm font-black shadow-xl shadow-indigo-600/25 transition-all active:scale-95 group"
          >
             <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
             New Account
          </Link>
        </div>
      </div>

      {accounts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-300 rounded-[2.5rem] text-center px-6"
        >
          <div className="h-20 w-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-6">
            <Wallet className="h-10 w-10 opacity-20" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No accounts yet</h3>
          <p className="text-slate-500 mt-2 max-w-sm font-medium">Create your first account to start tracking your financial life with A7sebly.</p>
          <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
             Get Started
          </button>
        </motion.div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {accounts.map((acc) => (
            <motion.div 
              key={acc.id} 
              variants={item}
              whileHover={{ y: -5 }}
              className="group p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                 <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                    <MoreVertical className="h-5 w-5" />
                 </button>
              </div>

              <div className="flex flex-col h-full">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg mb-8 ${getAccountColor(acc.type as AccountType)}`}>
                  {getAccountIcon(acc.type as AccountType)}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
                    {acc.type}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{acc.name}</h3>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 flex items-end justify-between">
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Net Balance</p>
                      <h4 className="text-3xl font-black text-slate-900 tracking-tighter">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: acc.currency.toUpperCase() }).format(acc.balance)}
                      </h4>
                   </div>
                   <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-emerald-500 text-xs font-black bg-emerald-50 px-2 py-1 rounded-lg">
                        <TrendingUp className="h-3 w-3" />
                        +1.4%
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">vs last month</p>
                   </div>
                </div>

                {acc.notes && (
                  <p className="mt-6 text-sm text-slate-400 italic font-medium line-clamp-2">
                    {acc.notes}
                  </p>
                )}

                <div className="mt-8">
                  <Link 
                    href={`/accounts/${acc.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 py-3 rounded-2xl text-xs font-black transition-all group"
                  >
                    ACCOUNT DETAILS
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              {/* Subtle background decoration */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-slate-50/50 rounded-full blur-3xl group-hover:bg-indigo-50/50 transition-colors -z-10" />
            </motion.div>
          ))}

          {/* New Account Placeholder Card */}
          <motion.div 
            variants={item}
          >
            <Link 
              href="/accounts/add"
              className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex flex-col items-center justify-center group gap-4 min-h-[400px] w-full"
            >
              <div className="h-16 w-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 group-hover:scale-110 transition-all shadow-sm">
                 <Plus className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Add Account</h3>
                <p className="text-sm text-slate-500 font-medium">Set up a new wallet or card</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Summary Section */}
      {accounts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
             <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-4xl font-black tracking-tighter">Total Assets Overview</h2>
                <p className="text-slate-400 max-w-md font-medium text-lg">Consolidated view of all your financial mediums. Managed and calculated in real-time.</p>
             </div>
             
             <div className="grid grid-cols-2 gap-8 lg:gap-16">
                <div>
                   <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Total Balance</p>
                   <h3 className="text-5xl font-black tracking-tighter">
                     {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(accounts.reduce((sum, acc) => sum + acc.balance, 0))}
                   </h3>
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-3">Growth</p>
                  <h3 className="text-5xl font-black tracking-tighter text-emerald-400">
                    +4.2<span className="text-2xl ml-1">%</span>
                  </h3>
                </div>
             </div>

             <div className="w-full lg:w-auto">
                <button className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all active:scale-95 shadow-xl shadow-indigo-600/30">
                  Export Statement
                </button>
             </div>
          </div>

          {/* Decorations */}
          <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[150%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      )}
    </div>
  );
}
