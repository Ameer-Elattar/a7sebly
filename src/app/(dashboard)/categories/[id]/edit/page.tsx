"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, AlertCircle, Loader2, Tag } from "lucide-react";
import { UPDATE_CATEGORY } from "@/graphql/mutations/category";
import { GET_CATEGORIES_QUERY, GET_CATEGORY_QUERY } from "@/graphql/queries/category";
import { Category } from "@/types/category";
import { CategoryType } from "@/types/enums";

type GetCategoryResponse = {
  getCategory: Category;
};

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  const { data, loading: queryLoading, error: queryError } = useQuery<GetCategoryResponse>(
    GET_CATEGORY_QUERY,
    {
      variables: { id },
      skip: Number.isNaN(id),
    },
  );

  const [formData, setFormData] = useState({
    name: "",
    type: CategoryType.EXPENSE,
  });

  useEffect(() => {
    if (data?.getCategory) {
      setFormData({
        name: data.getCategory.name,
        type: data.getCategory.type,
      });
    }
  }, [data]);

  const [updateCategory, { loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_CATEGORY,
    {
      refetchQueries: [
        { query: GET_CATEGORIES_QUERY },
        { query: GET_CATEGORY_QUERY, variables: { id } },
      ],
      onCompleted: () => {
        router.push("/categories");
      },
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCategory({
        variables: {
          id,
          category: {
            name: formData.name.trim(),
            type: formData.type,
          },
        },
      });
    } catch (err) {
      console.error("Failed to update category:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (queryLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse text-sm uppercase tracking-widest">
            Loading Category...
          </p>
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
          <h2 className="text-2xl font-bold text-slate-900">Failed to load category</h2>
          <p className="text-slate-500 font-medium">Error: {queryError.message}</p>
          <button
            onClick={() => router.push("/categories")}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">
            Edit Category
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Update category name and classification.
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

          {mutationError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>Failed to update category: {mutationError.message}</p>
            </motion.div>
          )}

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
              className="flex-[2] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
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
