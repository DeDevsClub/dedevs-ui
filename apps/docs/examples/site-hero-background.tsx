'use client';

import { Hero } from '@repo/site/hero';

const Example = () => {
  return (
    <div className="w-full">
      <Hero
        title="Beautiful Code Interfaces"
        description="Create stunning developer experiences with our code-focused components. From syntax highlighting to interactive editors."
        primaryAction={{
          label: "View Code Components",
          onClick: () => console.log("View Code Components clicked")
        }}
        backgroundImage="https://images.unsplash.com/photo-1669465716251-0973b3602278?q=80&w=1740&auto=format&fit=crop"
        className="text-white"
      />
    </div>
  );
};

export default Example;
