import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Contact QuiikTool", description: "Contact the QuiikTool team." };
export default function ContactPage() { return <LegalPage title="Contact" intro="Feedback, questions, and reports help us make these utilities more useful and dependable." sections={[{ heading: "Get in touch", body: "Use the email address below to report a broken tool, request an improvement, or ask a general question. We read every message." }, { heading: "Security reports", body: "Please include enough detail to reproduce a security or privacy concern. Do not send personal files or sensitive information by email." }]}/>; }
