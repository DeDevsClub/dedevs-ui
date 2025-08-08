import { Badge } from '@repo/shadcn-ui/components/ui/badge';
import { Card, CardContent } from '@repo/shadcn-ui/components/ui/card';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { 
  Blocks, 
  Code2, 
  Palette, 
  Zap, 
  Shield, 
  Smartphone,
  Globe,
  Puzzle
} from 'lucide-react';

const features = [
  {
    icon: Blocks,
    title: 'Modular Architecture',
    description: 'Mix and match components to build exactly what you need. Each component is designed to work independently or together.',
    badge: 'Core'
  },
  {
    icon: Code2,
    title: 'Developer First',
    description: 'Built with TypeScript, comprehensive documentation, and examples. Copy, paste, and customize with ease.',
    badge: 'DX'
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'Built on Tailwind CSS and Radix UI. Customize colors, spacing, and behavior to match your brand.',
    badge: 'Design'
  },
  {
    icon: Zap,
    title: 'Production Ready',
    description: 'Optimized for performance with tree-shaking, lazy loading, and minimal bundle impact.',
    badge: 'Performance'
  },
  {
    icon: Shield,
    title: 'Accessible by Default',
    description: 'WCAG compliant components with proper ARIA labels, keyboard navigation, and screen reader support.',
    badge: 'A11y'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Responsive design patterns that work beautifully across all devices and screen sizes.',
    badge: 'Responsive'
  },
  {
    icon: Globe,
    title: 'Framework Agnostic',
    description: 'While built for React, our patterns and designs can be adapted to any modern framework.',
    badge: 'Universal'
  },
  {
    icon: Puzzle,
    title: 'Easy Integration',
    description: 'Works seamlessly with shadcn/ui, Next.js, and your existing component library.',
    badge: 'Compatible'
  }
];

export const Features = () => (
  <section className="relative py-16 sm:py-20 lg:py-24">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to build modern UIs
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Our component registry provides the building blocks for AI interfaces, DeFi applications, and developer portfolios
        </p>
      </div>
      
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={cn(
                "group relative overflow-hidden border-0 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5",
                "hover:from-background/80 hover:to-background/60"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);
