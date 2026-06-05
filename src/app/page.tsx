"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import GithubLoginButton from "@/components/GithubLoginButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-serif-display { font-family: 'DM Serif Display', serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      <div className="animate-fade-up w-full max-w-md bg-[#0d0d0d] border border-white/[0.07] rounded-2xl px-10 py-12 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-9">
          <img src="https://spara.ir/favicon.ico" alt="Logo" className="w-6 h-6 rounded-sm object-contain" />
          <span className="font-serif-display text-white text-lg tracking-tight">Spara Oauth Challange</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif-display text-[2rem] leading-tight tracking-tight text-white mb-2">
          Welcome<br />
          <span className="italic text-white/30">back.</span>
        </h1>
        <p className="text-sm text-white/25 mb-9 leading-relaxed">
          Sign in to continue to your workspace.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[10px] font-semibold text-white/20 tracking-widest uppercase">Quick access</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <GoogleLoginButton />
          <GithubLoginButton />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/20">
          No account?{" "}
          <a href="#" className="text-white/40 font-medium hover:text-white/70 transition-colors duration-150">
            Create one →
          </a>
        </p>

      </div>
    </main>
  );
}