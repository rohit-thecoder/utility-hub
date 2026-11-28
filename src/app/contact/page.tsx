import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Contact QuiikTool", description: "Report a tool problem, privacy concern or copyright issue." };
export default function Page() { return <LegalPage title="Contact QuiikTool" intro="Use the email below to reach QuiikTool about website functionality, feedback or policy concerns." sections={[
  {
    "heading": "Report a broken tool",
    "body": "Include the tool’s URL, the browser and device you used, steps to reproduce the problem, and the error shown. Use a non-sensitive example instead of a private file."
  },
  {
    "heading": "Privacy and security",
    "body": "For privacy or security issues, describe the concern without sending passwords, API keys, personal records or exploit payloads. Include a way for us to respond."
  },
  {
    "heading": "Copyright and content concerns",
    "body": "If you believe a tool is being used to infringe your rights, provide the relevant QuiikTool URL, a description of the material and your relationship to the rights holder. We can review specific reports."
  },
  {
    "heading": "Suggestions",
    "body": "Tell us which task you would like to complete and where the existing workflow falls short. We cannot guarantee a particular response time or that every request will be implemented."
  }
]}/>; }
