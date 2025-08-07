'use client';

import { Hero } from '@repo/site/hero';

const Example = () => {
  return (
    <div className="w-full">
      <Hero
        title="AI-Powered Components"
        subtitle="Next Generation Interface"
        description="Build intelligent applications with our AI-focused component library. From conversation interfaces to reasoning displays, create sophisticated AI experiences."
        primaryAction={{
          label: "Explore AI Components",
          onClick: () => console.log("Explore AI Components clicked")
        }}
        features={[
          "AI conversation interfaces",
          "Reasoning visualization",
          "Source attribution",
          "Tool integration",
          "Streaming responses",
          "Branch conversations"
        ]}
      />
    </div>
  );
};

export default Example;
