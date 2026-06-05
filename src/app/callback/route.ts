import { NextResponse } from "next/server";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/?error=missing_code", url.origin));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID ??
    "1083511301870-50a5kd0qe6to82nc78lbs35vqnu4tmr4.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = new URL("/callback", url.origin).toString();

  if (!clientSecret) {
    return NextResponse.redirect(new URL("/?error=missing_client_secret", url.origin));
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
    return NextResponse.redirect(new URL("/?error=token_exchange_failed", url.origin));
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/?error=no_access_token", url.origin));
  }

  const profileResponse = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!profileResponse.ok) {
    return NextResponse.redirect(new URL("/?error=userinfo_failed", url.origin));
  }

  const profileData = await profileResponse.json();
  const { name, email, picture } = profileData;
  const profileValue = Buffer.from(JSON.stringify({ name, email, picture }), "utf-8").toString("base64");

  const response = NextResponse.redirect(new URL("/profile", url.origin));
 
  response.cookies.set("google_profile", profileValue, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60,
  });

  return response;
}
