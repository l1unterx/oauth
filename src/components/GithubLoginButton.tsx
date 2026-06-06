"use client";

import { useState } from "react";

export default function GoogleLoginButton() {
  const [showDialog, setShowDialog] = useState(false);

  const handleGoogleLogin = () => {
    const state = Math.random().toString(36).slice(2);
    document.cookie = `oauth_state=${state}; path=/; sameSite=lax`;
    setShowDialog(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-full py-3.5 bg-white hover:bg-zinc-100 active:bg-zinc-200 rounded-xl text-sm font-semibold text-black tracking-tight transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] mb-8 cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        Continue with Github
      </button>

      {/* Dialog Backdrop */}
      {showDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ animation: "fadeIn 0.2s ease both" }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDialog(false)}
          />

          {/* Dialog */}
          <div
            className="relative w-full max-w-sm bg-[#0d0d0d] border border-white/[0.07] rounded-2xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.9)]"
            style={{ animation: "slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1) both" }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-serif-display text-center text-white text-xl tracking-tight mb-2">
              GitHub Unavailable
            </h2>

            {/* Message */}
            <p className="text-center text-sm text-white/35 leading-relaxed mb-7">
              GitHub login is currently unavailable. Please use Google login instead.
            </p>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] mb-6" />

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                className="w-full py-3 bg-white hover:bg-zinc-100 active:bg-zinc-200 rounded-xl text-sm font-semibold text-black tracking-tight transition-all duration-150 hover:-translate-y-px cursor-pointer"
              >
                Use Google instead
              </button>
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                className="w-full py-3 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] rounded-xl text-sm font-semibold text-white/40 hover:text-white/60 tracking-tight transition-all duration-150 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}