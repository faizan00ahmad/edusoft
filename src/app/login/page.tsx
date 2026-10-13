import type { Metadata } from "next";
import LoginPage from "@/components/LoginPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "EduSoft Login" };

export default function Page() {
  return <LoginPage title="EduSoft Login" action={`${SITE.url}/ContactUs/VerifyEduLogin`} />;
}
