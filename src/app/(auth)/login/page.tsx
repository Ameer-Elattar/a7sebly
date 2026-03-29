"use client";

export default function Login() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 p-6 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
        <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="mb-10 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 dark:bg-zinc-100 p-3.5 shadow-xl shadow-black/10 dark:shadow-white/5 ring-1 ring-slate-800 dark:ring-zinc-200">
              <svg
                className="h-8 w-8 text-white dark:text-zinc-950"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 font-manrope">
              A7sebly
            </h1>
            <p className="mt-2 text-xl font-medium text-slate-500 dark:text-zinc-500 font-ibm-plex-arabic">
              أحسبلي الذكي
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
