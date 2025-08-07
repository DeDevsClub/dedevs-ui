// site-features.tsx
"use client";

import { Features, type Feature } from "@repo/site";
import { 
  Zap, 
  Shield, 
  Palette, 
  Code, 
  Rocket, 
  Heart,
  Globe,
  Smartphone,
  Lock
} from "lucide-react";

const sampleFeatures: Feature[] = [
  {
    id: "performance",
    title: "Lightning Fast",
    description: "Built with performance in mind. Components are optimized for speed and efficiency.",
    icon: Zap,
    iconColor: "text-yellow-500",
    badge: "New"
  },
  {
    id: "secure",
    title: "Secure by Default",
    description: "Security best practices built into every component. Your data stays safe.",
    icon: Shield,
    iconColor: "text-green-500"
  },
  {
    id: "customizable",
    title: "Fully Customizable",
    description: "Tailwind CSS powered components that adapt to your design system.",
    icon: Palette,
    iconColor: "text-purple-500"
  },
  {
    id: "developer-friendly",
    title: "Developer Experience",
    description: "TypeScript support, excellent documentation, and intuitive APIs.",
    icon: Code,
    iconColor: "text-blue-500"
  },
  {
    id: "production-ready",
    title: "Production Ready",
    description: "Battle-tested components used in production by thousands of developers.",
    icon: Rocket,
    iconColor: "text-red-500"
  },
  {
    id: "community",
    title: "Community Driven",
    description: "Open source and community driven. Contributions welcome from everyone.",
    icon: Heart,
    iconColor: "text-pink-500"
  },
  {
    id: "global",
    title: "Global CDN",
    description: "Components delivered via global CDN for maximum performance worldwide.",
    icon: Globe,
    iconColor: "text-indigo-500"
  },
  {
    id: "responsive",
    title: "Mobile First",
    description: "Responsive design patterns that work perfectly on all device sizes.",
    icon: Smartphone,
    iconColor: "text-emerald-500"
  },
  {
    id: "privacy",
    title: "Privacy Focused",
    description: "No tracking, no analytics. Your privacy is respected and protected.",
    icon: Lock,
    iconColor: "text-gray-500"
  }
];

export default function SiteFeaturesExample() {
  return (
    <div className="space-y-12">
      {/* Grid Layout Example */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Grid Layout (3 columns)</h2>
        <Features
          features={sampleFeatures.slice(0, 6)}
          title="Why Choose Our Components?"
          subtitle="Everything you need to build modern web applications"
          layout="grid"
          columns={3}
          className="max-w-6xl"
        />
      </div>

      {/* List Layout Example */}
      <div>
        <h2 className="text-2xl font-bold mb-6">List Layout</h2>
        <Features
          features={sampleFeatures.slice(0, 4)}
          title="Core Features"
          subtitle="The essentials for modern development"
          layout="list"
          className="max-w-4xl"
        />
      </div>

      {/* Alternating Layout Example */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Alternating Layout</h2>
        <Features
          features={sampleFeatures.slice(0, 3)}
          title="Highlighted Features"
          subtitle="Our most important capabilities"
          layout="alternating"
          showImages={true}
          className="max-w-5xl"
        />
      </div>

      {/* 4 Column Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">4 Column Grid</h2>
        <Features
          features={sampleFeatures.slice(0, 8)}
          title="Complete Feature Set"
          layout="grid"
          columns={4}
          className="max-w-7xl"
        />
      </div>

      {/* 2 Column Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">2 Column Grid</h2>
        <Features
          features={sampleFeatures.slice(0, 4)}
          title="Key Benefits"
          subtitle="Why developers love our components"
          layout="grid"
          columns={2}
          className="max-w-4xl"
        />
      </div>
    </div>
  );
}
