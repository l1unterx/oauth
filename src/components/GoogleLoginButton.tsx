"use client";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const redirectUri = `${window.location.origin}/callback`;
    const state = crypto.randomUUID();
    document.cookie = `oauth_state=${state}; path=/; sameSite=lax`;

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", "1083511301870-50a5kd0qe6to82nc78lbs35vqnu4tmr4.apps.googleusercontent.com");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", state);

    window.location.href = authUrl.toString();
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-3 w-full py-3.5 bg-white hover:bg-zinc-100 active:bg-zinc-200 rounded-xl text-sm font-semibold text-black tracking-tight transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] mb-8 cursor-pointer"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
      {/* SVG */}
      Continue with Google
    </button>
  );
}