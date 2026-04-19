"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Download,
  Plus,
  AlertCircle,
  Clock,
  Wallet,
  Tag,
} from "lucide-react";
import { GET_TRANSACTIONS_QUERY } from "@/graphql/queries/transaction";
import { Transaction } from "@/types/transaction";
import { TransactionType } from "@/types/enums";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function TransactionsPage() {
  const [filterType, setFilterType] = useState<TransactionType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, error, data } = useQuery<{ transactions: Transaction[] }>(
    GET_TRANSACTIONS_QUERY,
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full shadow-lg" />
          <p className="text-slate-500 font-bold animate-pulse text-sm uppercase tracking-widest font-display">
            Tracking History...
          </p>
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
          <h2 className="text-2xl font-bold text-slate-900">
            Failed to load transactions
          </h2>
          <p className="text-slate-500 font-medium">{error.message}</p>
        </div>
      </div>
    );
  }

  const transactions = data?.transactions || [];
  const filteredTransactions = transactions
    .filter((tx) => filterType === "all" || tx.type === filterType)
    .filter((tx) =>
      (tx.description?.toLowerCase() || "").includes(searchQuery.toLowerCase()),
    );

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return <ArrowDownRight className="h-5 w-5" />;
      case TransactionType.EXPENSE:
        return <ArrowUpRight className="h-5 w-5" />;
      case TransactionType.TRANSFER:
        return <ArrowRightLeft className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case TransactionType.EXPENSE:
        return "bg-rose-50 text-rose-600 border-rose-100";
      case TransactionType.TRANSFER:
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">
            Transactions
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            A detailed historical log of your financial movement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search by description..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 p-3.5 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Download className="h-5 w-5" />
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-xl shadow-indigo-600/25 transition-all active:scale-95 flex items-center gap-2 group shrink-0">
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
            New Record
          </button>
        </div>
      </div>

      {/* Highlights / Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-[1.5rem] w-fit shadow-inner">
            <button
              onClick={() => setFilterType("all")}
              className={`px-6 py-2.5 rounded-[1.2rem] text-xs font-black transition-all ${
                filterType === "all"
                  ? "bg-white text-indigo-600 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              ALL LISTS
            </button>
            <button
              onClick={() => setFilterType(TransactionType.EXPENSE)}
              className={`px-6 py-2.5 rounded-[1.2rem] text-xs font-black transition-all ${
                filterType === TransactionType.EXPENSE
                  ? "bg-white text-rose-600 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              EXPENSES
            </button>
            <button
              onClick={() => setFilterType(TransactionType.INCOME)}
              className={`px-6 py-2.5 rounded-[1.2rem] text-xs font-black transition-all ${
                filterType === TransactionType.INCOME
                  ? "bg-white text-emerald-600 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              INCOME
            </button>
            <button
              onClick={() => setFilterType(TransactionType.TRANSFER)}
              className={`px-6 py-2.5 rounded-[1.2rem] text-xs font-black transition-all ${
                filterType === TransactionType.TRANSFER
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              TRANSFERS
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest px-2">
          <Calendar className="h-4 w-4" />
          <span>March 2024</span>
        </div>
      </div>

      {/* Transaction Table / List */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Date & Time
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Description
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                  Reference
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                  <span className="block w-full">Amount</span>
                </th>
                <th className="px-8 py-5 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 relative">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <motion.tr
                      key={tx.id}
                      variants={item}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, x: 10 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`h-10 w-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${getTransactionColor(tx.type)}`}
                          >
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }).format(new Date(tx.date))}
                            </span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">
                              {new Intl.DateTimeFormat("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }).format(new Date(tx.date))}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col max-w-md">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${getTransactionColor(tx.type)}`}
                            >
                              {tx.type}
                            </span>
                            <span className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                              {tx.description || "No description provided"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Wallet className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">
                              {tx.account?.name || `Acc-${tx.accountId}`}
                            </span>
                          </div>
                          <div className="h-4 w-[1px] bg-slate-100" />
                          <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Tag className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">
                              {tx.category?.name || `Cat-${tx.categoryId}`}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span
                          className={`text-lg font-black tracking-tight ${
                            tx.type === TransactionType.INCOME
                              ? "text-emerald-500"
                              : tx.type === TransactionType.EXPENSE
                                ? "text-rose-600"
                                : "text-blue-500"
                          }`}
                        >
                          {tx.type === TransactionType.EXPENSE ? "-" : tx.type === TransactionType.INCOME ? "+" : ""}
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(tx.amount)}
                          {" "}
                          <span className="text-xs opacity-60 ml-1">
                            {tx.currency?.toUpperCase() || "USD"}
                          </span>
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-all rounded-xl hover:bg-white opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-slate-100">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-64"
                  >
                    <td colSpan={5} className="text-center py-20">
                      <div className="flex flex-col items-center gap-3">
                        <Clock className="h-10 w-10 text-slate-200" />
                        <p className="text-slate-400 font-bold text-sm">
                          No transaction records match your criteria.
                        </p>
                        <button
                          className="mt-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline"
                          onClick={() => {
                            setFilterType("all");
                            setSearchQuery("");
                          }}
                        >
                          Reset Global Filters
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            entries
          </p>
          <div className="flex gap-2">
            <button
              className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none"
              disabled
            >
              <ArrowRightLeft className="h-4 w-4 rotate-180" />
            </button>
            <button className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm">
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Mini-Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 bg-indigo-900 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-indigo-200 flex flex-col justify-between overflow-hidden relative"
        >
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] italic">
              Total Insight
            </p>
            <h3 className="text-3xl font-black tracking-tighter">
              Operational Efficiency
            </h3>
          </div>
          <p className="text-indigo-200/70 font-medium text-sm relative z-10">
            You've recorded {transactions.length} financial movements this
            cycle. Keeping descriptions detailed ensures better automated
            insights across all accounts.
          </p>
          <button className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg transition-all active:scale-95 relative z-10">
            Generate PDF Report
          </button>
          <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-indigo-500/20 rounded-full blur-3xl" />
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8 flex flex-col justify-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 mb-2">
              <ArrowDownRight className="h-5 w-5" />
            </div>
            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Total Intake
            </p>
            <h4 className="text-3xl font-black text-slate-900 tracking-tighter">
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                transactions
                  .filter((t) => t.type === TransactionType.INCOME)
                  .reduce((s, t) => s + t.amount, 0),
              )}
              <span className="text-sm opacity-40 ml-2">USD</span>
            </h4>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 flex flex-col justify-center gap-2 text-rose-600">
            <div className="h-10 w-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 mb-2">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <p className="text-xs font-black text-rose-600 uppercase tracking-widest">
              Total Spend
            </p>
            <h4 className="text-3xl font-black text-slate-900 tracking-tighter">
              -
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                transactions
                  .filter((t) => t.type === TransactionType.EXPENSE)
                  .reduce((s, t) => s + t.amount, 0),
              )}
              <span className="text-sm opacity-40 ml-2 text-rose-600 font-bold">USD</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
