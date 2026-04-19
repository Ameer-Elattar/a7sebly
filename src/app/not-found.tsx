"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Calculator, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8fafc] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          opacity: 0.5 
        }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Illustration/Icon Area */}
          <div className="relative mb-12 inline-block">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 w-48 h-48 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-slate-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white" />
              <Calculator className="w-24 h-24 text-indigo-600 relative z-20" />
              
              {/* Question marks floating around */}
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: [0, 20], y: [0, -40] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-8 right-8"
              >
                <HelpCircle className="w-8 h-8 text-indigo-300" />
              </motion.div>
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: [0, -30], y: [0, -30] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-12 left-8"
              >
                <HelpCircle className="w-6 h-6 text-indigo-200" />
              </motion.div>
            </motion.div>
            
            {/* 404 text behind */}
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-extrabold text-indigo-600/5 select-none tracking-tighter">
              404
            </h1>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight font-display">
            Page Not Found
          </h2>
          
          <p className="text-lg text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved to a new calculation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
            >
              <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </motion.div>
        
        {/* Footer brand */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 pt-8 border-t border-slate-200/50 flex items-center justify-center gap-3 opacity-40 grayscale"
        >
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Calculator className="h-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">A7sebly</span>
        </motion.div>
      </div>
    </div>
  );
}
