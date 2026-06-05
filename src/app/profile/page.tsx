import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type GoogleProfile = {
  name?: string;
  email?: string;
  picture?: string;
};

function parseProfileCookie(value: string | undefined): GoogleProfile | null {
  if (!value) return null;

  const decodeJson = (raw: string) => {
    try {
      return JSON.parse(raw) as GoogleProfile;
    } catch {
      return null;
    }
  };

  const decodedFromBase64 = (() => {
    try {
      return Buffer.from(value, "base64").toString("utf-8");
    } catch {
      return null;
    }
  })();

  if (decodedFromBase64) {
    const parsed = decodeJson(decodedFromBase64);
    if (parsed) return parsed;
  }

  try {
    const decodedValue = decodeURIComponent(value);
    return decodeJson(decodedValue);
  } catch {
    return null;
  }
}

export default async function Profile() {
  const cookieStore = await cookies();
  const profile = parseProfileCookie(cookieStore.get("google_profile")?.value);

  if (!profile) {
    redirect("/");
  }

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
        @keyframes avatarPop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-avatar { animation: avatarPop 0.5s 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
      `}</style>

      <div className="animate-fade-up w-full max-w-md bg-[#0d0d0d] border border-white/[0.07] rounded-2xl px-10 py-12 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-9">
          <img src="https://spara.ir/favicon.ico" alt="Logo" className="w-6 h-6 rounded-sm object-contain" />
          <span className="font-serif-display text-white text-xl tracking-tight">Acme</span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[10px] font-semibold text-white/20 tracking-widest uppercase">Your profile</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="animate-avatar relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-white/10 to-white/0 blur-sm" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.picture}
              alt={profile.name || "Profile"}
              className="relative w-20 h-20 rounded-full object-cover ring-1 ring-white/10"
            />
          </div>
        </div>

        {/* Name & Email */}
        <div className="text-center mb-8">
          <h1 className="font-serif-display text-[2rem] leading-tight tracking-tight text-white mb-1">
            {profile.name}
          </h1>
          <p className="text-base text-white/25 font-light">{profile.email}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* Info rows */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xs font-semibold text-white/25 tracking-widest uppercase">Name</span>
            <span className="text-base text-white/60 font-medium">{profile.name}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xs font-semibold text-white/25 tracking-widest uppercase">Email</span>
            <span className="text-base text-white/60 font-medium">{profile.email}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xs font-semibold text-white/25 tracking-widest uppercase">Provider</span>
            <span className="flex items-center gap-2 text-base text-white/60 font-medium">
              <svg width="13" height="13" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Google
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <a
          href="/logout"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-950/30 hover:bg-red-900/40 border border-red-900/30 hover:border-red-700/40 rounded-xl text-base font-semibold text-red-500/60 hover:text-red-400 tracking-tight transition-all duration-700 hover:-translate-y-px cursor-pointer mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </a>

        {/* Footer */}
        <p className="text-center text-xs text-white/15">
          Signed in via Google OAuth
        </p>

      </div>
    </main>
  );
}