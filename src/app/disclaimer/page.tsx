import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Disclaimer", description: "Limitations of calculations, online metadata, conversion and generated outputs." };
export default function Page() { return <LegalPage title="Disclaimer" intro="Last updated: November 28, 2026. QuiikTool offers general-purpose utilities for convenience and learning." sections={[
  {
    "heading": "Not professional advice",
    "body": "Financial, tax, health, legal and security-related outputs are general information, not individualized professional advice. Tax rates and formulas can depend on jurisdiction, dates and personal circumstances."
  },
  {
    "heading": "Check the output",
    "body": "Browser support, file formats, input quality and external provider availability can affect results. Keep an original copy of files and verify important outputs before submission, publication or use."
  },
  {
    "heading": "Creator and third-party information",
    "body": "YouTube and social metadata may be missing or restricted. Revenue projections are estimates, not promises of income. We do not own third-party titles, captions, thumbnails or trademarks. Obtain permission before reusing protected content."
  },
  {
    "heading": "External services and advertising",
    "body": "Third-party providers control their own content, services and policies. Advertising, when enabled, does not imply endorsement. The availability of any provider or tool may change."
  }
]}/>; }
