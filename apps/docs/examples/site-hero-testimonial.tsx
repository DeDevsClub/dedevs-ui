'use client';

import { Hero } from '@repo/site/hero';

const Example = () => {
  return (
    <div className="w-full">
      <Hero
        title="Trusted by Developers Worldwide"
        description="Join thousands of developers who are building amazing applications with our comprehensive component library."
        primaryAction={{
          label: "Start Building",
          onClick: () => console.log("Start Building clicked")
        }}
        testimonial={{
          text: "DeDevs UI has completely transformed our development workflow. The components are beautifully designed and incredibly easy to integrate.",
          author: "Sarah Chen",
          role: "Senior Frontend Developer",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
        }}
      />
    </div>
  );
};

export default Example;
