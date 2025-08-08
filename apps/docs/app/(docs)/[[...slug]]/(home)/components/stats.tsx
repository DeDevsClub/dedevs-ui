import { cn } from '@repo/shadcn-ui/lib/utils';

const stats = [
  {
    value: '50+',
    label: 'Components',
    description: 'Ready-to-use components',
  },
  {
    value: '10K+',
    label: 'Downloads',
    description: 'Monthly installations',
  },
  {
    value: '3',
    label: 'Categories',
    description: 'AI, DeFi, Portfolio',
  },
  {
    value: '100%',
    label: 'Open Source',
    description: 'MIT licensed',
  },
];

export const Stats = () => (
  <section className="relative py-16 sm:py-20 lg:py-24">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Trusted by developers worldwide
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join thousands of developers building modern applications with component registries like ours.
        </p>
      </div>
      
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-2xl border bg-background/50 p-8 text-center backdrop-blur-sm transition-all hover:bg-background/80",
                "hover:shadow-lg hover:shadow-primary/5"
              )}
            >
              <div className="text-4xl font-bold text-primary lg:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-lg font-semibold">
                {stat.label}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
