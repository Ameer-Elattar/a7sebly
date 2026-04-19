"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Tag,
  TrendingUp,
  TrendingDown,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Shapes,
  Loader2,
} from "lucide-react";
import { GET_CATEGORIES_QUERY } from "@/graphql/queries/category";
import {
  ACTIVATE_CATEGORY,
  DEACTIVATE_CATEGORY,
  DELETE_CATEGORY,
} from "@/graphql/mutations/category";
import { Category } from "@/types/category";
import { CategoryType } from "@/types/enums";

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
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<CategoryType>(
    CategoryType.EXPENSE,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [statusActionId, setStatusActionId] = useState<number | null>(null);

  const { loading, error, data } = useQuery<{ categories: Category[] }>(
    GET_CATEGORIES_QUERY,
  );

  const [deleteCategory, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_CATEGORY, {
      update(cache, _result, { variables }) {
        const deletedId = Number(variables?.id);
        if (Number.isNaN(deletedId)) {
          return;
        }

        cache.updateQuery<{ categories: Category[] }>(
          { query: GET_CATEGORIES_QUERY },
          (existing) => {
            if (!existing) {
              return existing;
            }

            return {
              categories: existing.categories.filter(
                (category) => Number(category.id) !== deletedId,
              ),
            };
          },
        );
      },
    });

  const [activateCategory, { error: activateError }] = useMutation(
    ACTIVATE_CATEGORY,
    {
      update(cache, _result, { variables }) {
        const targetId = Number(variables?.id);
        if (Number.isNaN(targetId)) {
          return;
        }

        cache.updateQuery<{ categories: Category[] }>(
          { query: GET_CATEGORIES_QUERY },
          (existing) => {
            if (!existing) {
              return existing;
            }

            return {
              categories: existing.categories.map((category) =>
                Number(category.id) === targetId
                  ? { ...category, isActive: true }
                  : category,
              ),
            };
          },
        );
      },
    },
  );

  const [deactivateCategory, { error: deactivateError }] = useMutation(
    DEACTIVATE_CATEGORY,
    {
      update(cache, _result, { variables }) {
        const targetId = Number(variables?.id);
        if (Number.isNaN(targetId)) {
          return;
        }

        cache.updateQuery<{ categories: Category[] }>(
          { query: GET_CATEGORIES_QUERY },
          (existing) => {
            if (!existing) {
              return existing;
            }

            return {
              categories: existing.categories.map((category) =>
                Number(category.id) === targetId
                  ? { ...category, isActive: false }
                  : category,
              ),
            };
          },
        );
      },
    },
  );

  const handleDeleteCategory = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteCategory({
        variables: { id: deleteTarget.id },
        optimisticResponse: {
          deleteCategory: "Category deleted",
        },
      });
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const handleActivateCategory = async (id: number) => {
    setStatusActionId(id);
    try {
      await activateCategory({
        variables: { id },
        optimisticResponse: {
          activateCategory: "Category activated",
        },
      });
    } catch (err) {
      console.error("Failed to activate category:", err);
    } finally {
      setStatusActionId(null);
    }
  };

  const handleDeactivateCategory = async (id: number) => {
    setStatusActionId(id);
    try {
      await deactivateCategory({
        variables: { id },
        optimisticResponse: {
          deactivateCategory: "Category deactivated",
        },
      });
    } catch (err) {
      console.error("Failed to deactivate category:", err);
    } finally {
      setStatusActionId(null);
    }
  };

  const statusError = activateError || deactivateError;

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full shadow-lg" />
          <p className="text-slate-500 font-bold animate-pulse text-sm uppercase tracking-widest">
            Loading Categories...
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
            <XCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Failed to fetch categories
          </h2>
          <p className="text-slate-500 leading-relaxed font-medium">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  const allCategories = data?.categories || [];
  const filteredCategories = allCategories
    .filter((cat) => cat.type === activeTab)
    .filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">
            Categories
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Organize your financial flows with smart classification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-1 min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link
            href="/categories/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-xl shadow-indigo-600/25 transition-all active:scale-95 flex items-center gap-2 group shrink-0"
          >
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
            Add New
          </Link>
        </div>
      </div>

      {/* Logic Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] w-full max-w-md mx-auto lg:mx-0 shadow-inner">
        <button
          onClick={() => setActiveTab(CategoryType.EXPENSE)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.2rem] text-sm font-black transition-all ${
            activeTab === CategoryType.EXPENSE
              ? "bg-white text-indigo-600 shadow-md"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <TrendingDown className="h-4 w-4" />
          Expenses
        </button>
        <button
          onClick={() => setActiveTab(CategoryType.INCOME)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.2rem] text-sm font-black transition-all ${
            activeTab === CategoryType.INCOME
              ? "bg-white text-emerald-600 shadow-md"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          Income
        </button>
      </div>

      {statusError && (
        <p className="text-sm text-rose-600 font-semibold">
          Failed to update category status: {statusError.message}
        </p>
      )}

      {/* Categories Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={item}
                whileHover={{ y: -4 }}
                className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg ${
                      activeTab === CategoryType.INCOME
                        ? "bg-emerald-50 text-emerald-600 shadow-emerald-500/10"
                        : "bg-indigo-50 text-indigo-600 shadow-indigo-500/10"
                    }`}
                  >
                    <Tag className="h-6 w-6" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                      {category.name}
                    </h3>
                    {category.isActive ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-300" />
                    )}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {category.type}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-slate-400">
                    <Link
                      href={`/categories/${category.id}/edit`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(category)}
                      className="hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <button
                      onClick={() =>
                        category.isActive
                          ? handleDeactivateCategory(category.id)
                          : handleActivateCategory(category.id)
                      }
                      disabled={statusActionId === category.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        category.isActive
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      } disabled:opacity-60`}
                    >
                      {statusActionId === category.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : null}
                      {category.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={item}
              className="col-span-full py-20 bg-white border border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center px-6"
            >
              <Shapes className="h-12 w-12 text-slate-200 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">
                No categories found
              </h3>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Try searching for something else or create a new category.
              </p>
              <Link
                href={`/categories/new?type=${activeTab}`}
                className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm active:scale-95 transition-all"
              >
                Create {activeTab.toLowerCase()} Category
              </Link>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Helper Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 p-8 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] text-white relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black italic tracking-tighter uppercase">
              Smart Grouping
            </h3>
            <p className="text-indigo-200/70 font-medium max-w-md">
              Categorizing your transactions allows A7sebly to generate deep
              behavioral insights and spending reports.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-black tracking-tighter">
                {
                  allCategories.filter((c) => c.type === CategoryType.EXPENSE)
                    .length
                }
              </p>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">
                Expense Types
              </p>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-black tracking-tighter">
                {
                  allCategories.filter((c) => c.type === CategoryType.INCOME)
                    .length
                }
              </p>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1">
                Income Sources
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Shapes className="h-48 w-48" />
        </div>
      </motion.div>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl"
            >
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                <Trash2 className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Delete category?
              </h3>
              <p className="mt-2 text-slate-500 font-medium leading-relaxed">
                This will permanently remove <strong>{deleteTarget.name}</strong>.
              </p>

              {deleteError && (
                <p className="mt-4 text-sm text-rose-600 font-semibold">
                  Failed to delete category: {deleteError.message}
                </p>
              )}

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleteLoading}
                  className="py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCategory}
                  disabled={deleteLoading}
                  className="py-3 rounded-2xl bg-rose-600 text-white font-black hover:bg-rose-700 transition-all disabled:opacity-60"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
