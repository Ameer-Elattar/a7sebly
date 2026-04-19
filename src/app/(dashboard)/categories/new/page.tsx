"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, AlertCircle, Tag } from "lucide-react";
import { CREATE_CATEGORY } from "@/graphql/mutations/category";
import { GET_CATEGORIES_QUERY } from "@/graphql/queries/category";
import { CategoryType } from "@/types/enums";

export default function AddCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultType = useMemo(
    () =>
      searchParams.get("type") === CategoryType.INCOME
        ? CategoryType.INCOME
        : CategoryType.EXPENSE,
    [searchParams],
  );

  const [formData, setFormData] = useState({
    name: "",
    type: defaultType,
  });

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES_QUERY }],
    onCompleted: () => {
      router.push("/categories");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory({
        variables: {
          category: {
            name: formData.name.trim(),
            type: formData.type,
          },
        },
      });
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/categories"
          className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">
            Add Category
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Create a category for your income or expense transactions.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Tag className="h-4 w-4 text-indigo-500" />
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                Category Information
              </h2>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">
                Category Name
              </label>
              <input
                required
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Groceries"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-bold text-slate-700 ml-1">
                Category Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium appearance-none shadow-sm"
              >
                {Object.values(CategoryType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>Failed to create category: {error.message}</p>
            </motion.div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link
              href="/categories"
              className="flex-1 flex items-center justify-center py-4 rounded-2xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  CREATE CATEGORY
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
