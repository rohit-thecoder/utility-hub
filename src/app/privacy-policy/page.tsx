import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Privacy Policy", description: "How QuiikTool handles local files, online lookups, cookies and advertising." };
export default function Page() { return <LegalPage title="Privacy Policy" intro="Last updated: November 28, 2026. This notice explains how QuiikTool processes information when you visit or use a tool." sections={[
  {
    "heading": "Local tools and device storage",
    "body": "Most file conversions, text utilities and calculators process inputs in your browser without uploading them to QuiikTool. Recent tools and some productivity tools may store preferences, notes, tasks or progress in browser local storage. You can remove this data through your browser’s site-data settings. No account is required."
  },
  {
    "heading": "Online tools and third-party services",
    "body": "YouTube metadata requests send the supplied video identifier to YouTube Data API Services through our server. Instagram and Facebook caption lookups may send the public post URL to a configured RapidAPI provider. If you choose hosted transcription, your selected media file is sent through our server to Groq for processing. These services may handle information under their own terms and privacy policies. Do not upload confidential or unauthorized material. Manual caption analysis is available without an online lookup. If enabled, authorized Meta media downloads send the user-supplied access token and media identifier through our server to Meta for a single request. The application does not retain the token, and does not proxy the returned media file. PDF rendering, encryption and AI upscaling process selected files on the device using self-hosted libraries; OCR may fetch language-model assets."
  },
  {
    "heading": "Hosting and technical information",
    "body": "The IP and network test tools make a request to our own hosting service and may display the IP address reported by that service. YouTube thumbnail previews request images from YouTube. Vercel and other infrastructure providers may process IP addresses, browser and device information, URLs, timestamps and request logs for delivery, security, debugging and service reliability. Our tools do not require registration. We do not intentionally create a permanent database of your tool inputs; infrastructure and third-party providers may retain logs under their own policies."
  },
  {
    "heading": "Google advertising and cookies",
    "body": "If advertising is enabled, Google AdSense and its advertising partners may use cookies, web beacons, IP addresses and other identifiers to deliver, personalize, measure and protect ads. Google and third-party vendors may use cookies based on your previous visits to this or other websites. You can manage personalized ads through Google My Ad Center at myadcenter.google.com and use browser settings to control cookies. Where required, consent and privacy choices must be provided through the applicable consent management platform before advertising is enabled."
  },
  {
    "heading": "Your choices and rights",
    "body": "You can clear local storage, avoid optional online tools, manage advertising preferences and contact us regarding privacy, access, correction or deletion requests. The rights available depend on your location. If a provider holds information separately, you may need to contact that provider."
  },
  {
    "heading": "Children and changes",
    "body": "QuiikTool is a general-purpose service, not specifically directed to children. Do not submit personal information belonging to children. We may revise this notice as tools or service providers change; the date above identifies the latest revision."
  },
  {
    "heading": "Contact",
    "body": "Use the contact email below for privacy inquiries, including questions about third-party processing or removal requests."
  }
]}/>; }
