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
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.8)] max-w-md w-full text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.picture}
          alt={profile.name || "Google profile"}
          className="mx-auto h-24 w-24 rounded-full object-cover"
        />
        <h1 className="mt-6 text-2xl font-semibold text-white">{profile.name}</h1>
        <p className="mt-2 text-sm text-slate-400">{profile.email}</p>
        <a
          href="/logout"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/15"
        >
          Logout
        </a>
      </div>
    </main>
  );
}
