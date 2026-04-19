"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Wallet, 
  Save, 
  AlertCircle,
  Info,
  Loader2,
  Trash2
} from "lucide-react";
import { UPDATE_ACCOUNT } from "@/graphql/mutations/accounts";
import { GET_ACCOUNT_QUERY, GET_ACCOUNTS_QUERY } from "@/graphql/queries/accounts";
import { AccountType, CurrencyEnum } from "@/types/enums";
import { Account } from "@/types/account";
import Link from "next/link";

export default function EditAccountPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data, loading: queryLoading, error: queryError } = useQuery<{ account: Account }>(GET_ACCOUNT_QUERY, {
    variables: { id },
    skip: !id
  });

  const [formData, setFormData] = useState({
    name: "",
    type: AccountType.CASH,
    balance: 0,
    currency: CurrencyEnum.EGP,
    notes: ""
  });

  useEffect(() => {
    if (data?.account) {
      setFormData({
        name: data.account.name,
        type: data.account.type,
        balance: data.account.balance,
        currency: data.account.currency,
        notes: data.account.notes || ""
      });
    }
  }, [data]);

  const [updateAccount, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS_QUERY }, { query: GET_ACCOUNT_QUERY, variables: { id } }],
    onCompleted: () => {
       router.push(`/accounts/${id}`);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAccount({
        variables: {
          id,
          updateAccountInput: {
            name: formData.name,
            type: formData.type,
            notes: formData.notes
          }
        }
      });
    } catch (err) {
      console.error("Failed to update account:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (queryLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse text-sm uppercase tracking-widest">Loading Account Data...</p>
        </div>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="flex h-[60vh] items-center justify-center p-6 text-center">
         <div className="max-w-md space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mb-2">
               <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Failed to load account</h2>
            <p className="text-slate-500 font-medium">Error: {queryError.message}</p>
            <button 
              onClick={() => router.back()}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
            >
              Go Back
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">Edit Account</h1>
            <p className="text-slate-500 font-medium mt-1">Update your financial medium details.</p>
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
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Account Balance</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="balance" className="text-sm font-bold text-slate-700 ml-1">Balance</label>
                  <div className="relative">
                    <input
                      disabled
                      id="balance"
                      name="balance"
                      type="number"
                      step="0.01"
                      value={formData.balance}
                      className="w-full pl-5 pr-16 py-4 bg-slate-100 border border-slate-200 rounded-2xl font-medium shadow-sm opacity-60 cursor-not-allowed"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-slate-400 pointer-events-none text-xs">
                       {formData.currency.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="currency" className="text-sm font-bold text-slate-700 ml-1">Currency</label>
                  <select
                    disabled
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    className="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-2xl font-medium appearance-none shadow-sm opacity-60 cursor-not-allowed"
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
          {mutationError && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>Failed to update account: {mutationError.message}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
             <button
               type="button"
               onClick={() => router.back()}
               className="flex-1 flex items-center justify-center py-4 rounded-2xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all"
             >
               Cancel
             </button>
             <button
              type="submit"
              disabled={mutationLoading}
              className="flex-[2] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95 group"
            >
              {mutationLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  SAVE CHANGES
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
