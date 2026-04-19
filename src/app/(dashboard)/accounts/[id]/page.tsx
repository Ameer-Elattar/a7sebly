"use client";

import React from "react";
import { useQuery } from "@apollo/client/react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Wallet, 
  Edit3, 
  AlertCircle,
  Loader2,
  Calendar,
  CreditCard,
  Banknote,
  TrendingUp,
  History,
  MoreVertical,
  Info
} from "lucide-react";
import { GET_ACCOUNT_QUERY } from "@/graphql/queries/accounts";
import { AccountType } from "@/types/enums";
import { Account } from "@/types/account";
import Link from "next/link";

export default function AccountDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data, loading, error } = useQuery<{ account: Account }>(GET_ACCOUNT_QUERY, {
    variables: { id },
    skip: !id
  });

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case AccountType.CASH: return <Banknote className="h-8 w-8" />;
      case AccountType.CREDIT: return <CreditCard className="h-8 w-8" />;
      case AccountType.DEBIT: return <Wallet className="h-8 w-8" />;
      default: return <Wallet className="h-8 w-8" />;
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
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse text-sm uppercase tracking-widest">Loading Details...</p>
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
            <h2 className="text-2xl font-bold text-slate-900">Failed to load account</h2>
            <p className="text-slate-500 font-medium">Error: {error.message}</p>
            <button 
              onClick={() => router.push("/accounts")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
            >
              Back to Accounts
            </button>
         </div>
      </div>
    );
  }

  const account = data?.account;

  if (!account) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/accounts" 
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">{account.name}</h1>
            <p className="text-slate-500 font-medium mt-1">Detailed overview of your account status.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link 
            href={`/accounts/${id}/edit`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-indigo-600/25 transition-all active:scale-95 group"
          >
             <Edit3 className="h-4 w-4" />
             Edit Account
          </Link>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors shadow-sm">
             <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Stats Card */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="lg:col-span-2 space-y-8"
         >
            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 relative overflow-hidden shadow-sm">
               <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className="space-y-6">
                     <div className={`h-20 w-20 rounded-[2rem] flex items-center justify-center shadow-2xl ${getAccountColor(account.type as AccountType)}`}>
                        {getAccountIcon(account.type as AccountType)}
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Net Balance</p>
                        <h2 className="text-6xl font-black text-slate-900 tracking-tighter">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: account.currency.toUpperCase() }).format(account.balance)}
                        </h2>
                     </div>
                  </div>
                  
                  <div className="space-y-4 w-full md:w-auto">
                     <div className="bg-slate-50 p-6 rounded-3xl space-y-1 inline-block w-full md:w-auto min-w-[200px]">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Type</p>
                        <p className="text-lg font-bold text-slate-900">{account.type.toUpperCase()}</p>
                     </div>
                     <div className="bg-emerald-50 p-6 rounded-3xl space-y-1 inline-block w-full md:w-auto min-w-[200px]">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-black text-emerald-600/60 uppercase tracking-widest">Monthly Growth</p>
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </div>
                        <p className="text-lg font-bold text-emerald-600">+12.5%</p>
                     </div>
                  </div>
               </div>

               {/* Decorations */}
               <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-0 opacity-50" />
               <div className="absolute bottom-[-10%] left-1/4 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -z-0 opacity-50" />
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                        <Calendar className="h-5 w-5" />
                     </div>
                     <h3 className="font-bold text-slate-900">Timeline</h3>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 font-medium tracking-tight">Created</span>
                        <span className="text-sm text-slate-900 font-bold">{new Date(account.createdDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 font-medium tracking-tight">Last Updated</span>
                        <span className="text-sm text-slate-900 font-bold">{new Date(account.updatedDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                        <Info className="h-5 w-5" />
                     </div>
                     <h3 className="font-bold text-slate-900">Notes</h3>
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                     {account.notes || "No additional notes for this account."}
                  </p>
               </div>
            </div>
         </motion.div>

         {/* Sidebar / Quick Actions */}
         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="space-y-6"
         >
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-8 overflow-hidden relative">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                     <History className="h-5 w-5 text-indigo-400" />
                     <h3 className="font-bold">Recent Activity</h3>
                  </div>
                  
                  <div className="space-y-6">
                     <p className="text-slate-400 text-sm font-medium">No recent transactions associated with this account.</p>
                     <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 py-4 rounded-2xl text-xs font-bold transition-all">
                        VIEW STATEMENT
                     </button>
                  </div>
               </div>
               
               {/* Decoration */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
               <h3 className="font-bold text-slate-900">Quick Actions</h3>
               <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 py-4 rounded-2xl text-xs font-black transition-all">
                     ADD TRANSACTION
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 py-4 rounded-2xl text-xs font-black transition-all">
                     TRANSFER FUNDS
                  </button>
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
