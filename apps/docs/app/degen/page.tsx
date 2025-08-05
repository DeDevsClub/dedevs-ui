import { Metadata } from "next";
// import { AIAnnouncement } from "./components/ai-announcement";
// import { AIChatHero } from "./components/ai-chat-hero";
import { v0 } from 'v0-sdk'

// No initialization needed - uses V0_API_KEY automatically
export const metadata: Metadata = {
  title: "Image to shadcn/ui theme. Generate with AI — DeDevs",
  description:
    "Transform images into stunning shadcn/ui themes instantly with DeDevs' AI theme generator. Upload any image or describe your vision—our AI creates custom Tailwind CSS themes with real-time preview. Perfect for developers who want beautiful, production-ready themes in seconds.",
  keywords:
    "ai theme generator, image to theme, shadcn/ui themes, tailwind css generator, ai design tool, theme from image, ui customization, tweakcn, visual theme creator, color palette generator, design system ai, frontend theming, web design automation",
  robots: "index, follow",
};

// Create a new chat
const chat = await v0.chats.create({
  message: 'Create a responsive navbar with Tailwind CSS'
})

export default async function AiPage() {
  return (
    <div className="relative isolate container mx-auto flex flex-1 flex-col gap-24 overflow-x-hidden overflow-y-auto px-4 md:px-6">
      {/* AI Chat entry point section */}
      {/* <section className="relative isolate flex flex-col gap-4 pt-28 lg:pt-44">
        <AIAnnouncement />
        <AIChatHero />
      </section> */}

      {/* Community themes section */}
      <section className="relative isolate flex flex-col gap-4 pt-28 lg:pt-44">

        {/* Use the Demo URL in an iframe */}
        <iframe
          src={chat.demo}
          width="100%"
          height="600">
        </iframe>
      </section>
    </div>
  );
}
