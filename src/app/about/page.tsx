import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "About QuiikTool", description: "Learn how QuiikTool builds browser-first utilities and handles online tools." };
export default function Page() { return <LegalPage title="About QuiikTool" intro="QuiikTool is an independent, general-purpose utility website designed for everyday tasks, from converting images to checking text and preparing creator workflows." sections={[
  {
    "heading": "What we build",
    "body": "Our goal is to provide useful, understandable tools without account creation. Image conversion, text processing, calculations and developer utilities are organized by task. Each tool should clearly explain what inputs it accepts, what result it returns and its limitations."
  },
  {
    "heading": "How processing works",
    "body": "We prefer local browser processing when supported. Online metadata lookups and optional hosted transcription require external services; those workflows are not browser-only. See our Privacy Policy for details."
  },
  {
    "heading": "Quality and accuracy",
    "body": "We maintain tools as browsers and external APIs change. Incomplete features may be temporarily unavailable rather than present misleading output. For an important conversion or calculation, check the result against your requirements."
  },
  {
    "heading": "How the site is funded",
    "body": "We may use advertising to help cover hosting and maintenance costs. Ads should be distinct from controls and should never be required to complete a download."
  },
  {
    "heading": "Feedback and support",
    "body": "We welcome reproducible bug reports and practical suggestions. Include the tool name, your browser and the steps needed to reproduce the issue, but do not send private files or credentials."
  }
]}/>; }
