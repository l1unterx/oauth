import { NextResponse } from "next/server";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;

  const cookie = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = getCookieValue(request.headers.get("cookie"), "oauth_state");
  const murl = "http://sparaoauth.com";

  if (!code) {
    return NextResponse.redirect(new URL("/error?msg=missing_code", murl), 302);
  }

  if (!state || state !== cookieState) {
    return NextResponse.redirect(new URL("/error?msg=invalid_state", murl), 302);
  }

  

  const clientId = process.env.GOOGLE_CLIENT_ID ??
    "1083511301870-i2q93e0s6mllje12qs2i8n225h9v4k6n.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = new URL("/callback", url.origin).toString();

  if (!clientSecret) {
    return NextResponse.redirect(new URL("/error?msg=missing_client_secret", murl), 302);
  }

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL("/error?msg=token_exchange_failed", murl), 302);
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/error?msg=no_access_token", murl), 302);
  }

  const profileResponse = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!profileResponse.ok) {
    return NextResponse.redirect(new URL("/error?msg=userinfo_failed", murl), 302);
  }

  const profileData = await profileResponse.json();
  const { name, email, picture } = profileData;
  const profileValue = Buffer.from(JSON.stringify({ name, email, picture }), "utf-8").toString("base64");

  const response = NextResponse.redirect(new URL("/profile", murl), 302);

  response.cookies.set("google_profile", profileValue, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60,
  });

  response.cookies.set("oauth_state", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
