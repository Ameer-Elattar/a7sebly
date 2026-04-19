"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Shield, 
  Zap, 
  Wallet,
  CheckCircle2,
  Calculator,
  LayoutDashboard
} from "lucide-react";

export default function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Calculator className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight font-display">A7sebly</span>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link 
                href="/overview" 
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="text-slate-600 hover:text-slate-900 font-bold text-sm px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest border border-indigo-100 mb-6">
                <Zap className="h-3 w-3 fill-indigo-600" />
                Next Gen Expense Tracking
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight font-display">
                Master Your Finances <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                  With Precision.
                </span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                A7sebly helps you track, analyze, and optimize your spending with an editorial-grade interface designed for clarity and efficiency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link 
                href={isAuthenticated ? "/overview" : "/login"}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all active:scale-95"
              >
                {isAuthenticated ? "Enter Dashboard" : "Start Tracking Now"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm transition-all">
                View Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 pt-4"
            >
              <div className="flex items-center gap-2 text-slate-400 group cursor-default">
                <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-bold group-hover:text-slate-600 transition-colors">Free Forever</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 group cursor-default">
                <Shield className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-bold group-hover:text-slate-600 transition-colors">End-to-End Secure</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 group cursor-default">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-bold group-hover:text-slate-600 transition-colors">Smart Analytics</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 relative w-full max-w-[600px]"
          >
            {/* Mockup Dashboard Element */}
            <div className="relative bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden transform perspective-1000 rotate-y-2 hover:rotate-y-0 transition-transform duration-700">
               <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
               </div>
               <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-32 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-10 w-10 bg-indigo-50 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20" />
                    <div className="h-32 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-4 w-4/5 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-4 w-3/5 bg-slate-100 rounded-lg animate-pulse" />
                  </div>
               </div>
            </div>
            
            {/* Absolute floating cards */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3"
            >
               <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Wallet className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance</p>
                  <p className="text-lg font-bold text-slate-900">$12,450.00</p>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
          <div className="flex items-center gap-3 grayscale">
             <Calculator className="h-5 w-5 text-slate-900" />
             <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">A7sebly &copy; 2024</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
