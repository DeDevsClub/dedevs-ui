'use client';

import { Hero } from '@repo/site/hero';

const Example = () => {
  return (
    <div className="w-full">
      <Hero
        title="Build Amazing DeFi Applications"
        subtitle="Professional Component Library"
        description="Create stunning decentralized finance interfaces with our comprehensive component library. From trading charts to swap interfaces, we provide everything you need to build professional DeFi applications."
        primaryAction={{
          label: "Get Started",
          onClick: () => console.log("Get Started clicked")
        }}
        secondaryAction={{
          label: "View Components",
          onClick: () => console.log("View Components clicked")
        }}
        features={[
          "Real-time trading charts",
          "Professional swap interfaces", 
          "Order book components",
          "Market data tickers",
          "Responsive design",
          "Dark mode support"
        ]}
        testimonial={{
          text: "This component library has completely transformed how we build DeFi interfaces. The quality and attention to detail is outstanding.",
          author: "Val Alexander",
          role: "Lead Developer at DeDevs Club",
          avatar: "https://github.com/bunsdev.png"
        }}
      />
    </div>
  );
};

export default Example;
