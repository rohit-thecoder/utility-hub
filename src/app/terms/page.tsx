import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Terms of Use", description: "Conditions for using QuiikTool and third-party integrations." };
export default function Page() { return <LegalPage title="Terms of Use" intro="Last updated: November 28, 2026. By using QuiikTool, you agree to these terms and applicable law." sections={[
  {
    "heading": "Access and availability",
    "body": "The tools are offered without an account or required payment. Features may be maintained, changed or temporarily unavailable, especially when dependent on external APIs or browser support. We do not guarantee uninterrupted availability."
  },
  {
    "heading": "Your content and permissions",
    "body": "You retain rights in content you provide. Submit only files, text and links you are entitled to process. Do not use the service to infringe copyright, distribute harmful content, evade platform access controls or misuse personal data."
  },
  {
    "heading": "YouTube and other platforms",
    "body": "Some tools use YouTube API Services. By using those tools you also agree to YouTube’s Terms of Service at youtube.com/t/terms. Other external services have separate terms. QuiikTool is independent and is not endorsed by YouTube, Meta, or Google. Public access does not grant permission to republish someone else’s material."
  },
  {
    "heading": "Responsible use",
    "body": "Do not attempt to overload APIs, bypass limits, attack the service, upload malicious content, automate abusive traffic or access restricted information. We may limit access to protect reliability and comply with provider requirements."
  },
  {
    "heading": "Results and liability",
    "body": "Outputs are provided as-is for convenience. Verify calculations, converted files, generated code and other outputs before relying on them. To the extent allowed by applicable law, we are not responsible for losses from reliance on inaccurate results or third-party interruptions. Nothing in these terms limits rights that cannot lawfully be excluded."
  },
  {
    "heading": "Advertising and external links",
    "body": "Advertising may support the service when enabled. External links and advertisements are subject to their providers’ policies. Do not click ads merely to support the website."
  },
  {
    "heading": "Updates and questions",
    "body": "Terms may change with new functionality or legal requirements. Contact us using the email below for questions or concerns."
  }
]}/>; }
