"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Wallet, 
  Save, 
  AlertCircle,
  Info
} from "lucide-react";
import { CREATE_ACCOUNT } from "@/graphql/mutations/accounts";
import { GET_ACCOUNTS_QUERY } from "@/graphql/queries/accounts";
import { AccountType, CurrencyEnum } from "@/types/enums";
import Link from "next/link";

export default function AddAccountPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    type: AccountType.CASH,
    balance: 0,
    currency: CurrencyEnum.EGP,
    notes: ""
  });

  const [createAccount, { loading, error }] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS_QUERY }],
    onCompleted: () => {
       router.push("/accounts");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAccount({
        variables: {
          createAccountInput: {
            name: formData.name,
            type: formData.type,
            balance: Number(formData.balance),
            currency: formData.currency,
            notes: formData.notes
          }
        }
      });
    } catch (err) {
      console.error("Failed to create account:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/accounts" 
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">Add New Account</h1>
            <p className="text-slate-500 font-medium mt-1">Configure your financial medium details.</p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          {/* Account Basics Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
               <Info className="h-4 w-4 text-indigo-500" />
               <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Account Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Account Name</label>
                <input
                  required
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. My Savings Card"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-bold text-slate-700 ml-1">Account Type</label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium appearance-none shadow-sm"
                  >
                    {Object.values(AccountType).map(type => (
                      <option key={type} value={type}>{type.toUpperCase()}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Wallet className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Balance & Currency Section */}
          <div className="space-y-6">
             <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Initial Balance</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="balance" className="text-sm font-bold text-slate-700 ml-1">Current Balance</label>
                  <div className="relative">
                    <input
                      required
                      id="balance"
                      name="balance"
                      type="number"
                      step="0.01"
                      value={formData.balance}
                      onChange={handleChange}
                      className="w-full pl-5 pr-16 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium shadow-sm"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-slate-400 pointer-events-none text-xs">
                       {formData.currency.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="currency" className="text-sm font-bold text-slate-700 ml-1">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium appearance-none shadow-sm"
                  >
                    {Object.values(CurrencyEnum).map(curr => (
                      <option key={curr} value={curr}>{curr.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
             </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-bold text-slate-700 ml-1">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Add some details about this account (e.g. account number last 4 digits)..."
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium resize-none placeholder:text-slate-400 shadow-sm"
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>Failed to create account: {error.message}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
             <Link 
               href="/accounts"
               className="flex-1 flex items-center justify-center py-4 rounded-2xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all"
             >
               Cancel
             </Link>
             <button
              type="submit"
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95 group"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  CREATE ACCOUNT
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
