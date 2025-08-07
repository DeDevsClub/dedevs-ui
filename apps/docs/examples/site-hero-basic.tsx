'use client';

import { Hero } from '@repo/site/hero';

const Example = () => {
  return (
    <div className="w-full">
      <Hero
        title="Welcome to DeDevs UI"
        description="A modern component library for building beautiful user interfaces with React and TypeScript."
        primaryAction={{
          label: "Get Started",
          onClick: () => console.log("Get Started clicked")
        }}
        secondaryAction={{
          label: "Learn More",
          onClick: () => console.log("Learn More clicked")
        }}
      />
    </div>
  );
};

export default Example;
