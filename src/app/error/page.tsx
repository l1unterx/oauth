import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ErrorPage() {
  const referer = (await headers()).get("referer");

  redirect(referer || "/");
}