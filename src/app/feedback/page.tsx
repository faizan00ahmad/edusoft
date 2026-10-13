import type { Metadata } from "next";
import LoginPage from "@/components/LoginPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Customer Login" };

export default function Page() {
  return <LoginPage title="Customer Login" action={`${SITE.url}/ContactUs/VerifyLogin`} />;
}
