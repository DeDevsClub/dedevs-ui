import { Metadata } from "next";
import { AiChatInterface } from "./components/ai-chat-interface";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AI Component Generator — DeDevs",
  description:
    "Generate beautiful, functional UI components instantly with AI. Describe what you want and get production-ready React components with Tailwind CSS styling. Powered by v0.dev API.",
  keywords:
    "ai component generator, react components, tailwind css, ui generator, v0 api, component creation, ai design tool, shadcn/ui, frontend development, code generation",
  robots: "index, follow",
};

export default function AiPage() {
  return (
    <>
      <div className="relative isolate container mx-auto flex flex-1 flex-col gap-8 overflow-x-hidden overflow-y-auto px-4 md:px-6 py-8">
        <AiChatInterface />
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}
