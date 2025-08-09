import { Badge } from '@repo/shadcn-ui/components/ui/badge';
import { Button } from '@repo/shadcn-ui/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/shadcn-ui/components/ui/card';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { 
  Bot, 
  Coins, 
  User, 
  ArrowRight,
  MessageSquare,
  TrendingUp,
  Code,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const useCases = [
  {
    icon: Bot,
    title: 'AI Interfaces',
    description: 'Build sophisticated AI-powered applications with conversation management, streaming responses, and intelligent interactions.',
    features: [
      'Chat interfaces with streaming',
      'Response formatting & markdown',
      'Source attribution & citations',
      'Reasoning visualization',
      'Input validation & controls'
    ],
    examples: ['ChatGPT-style interfaces', 'AI assistants', 'Code generation tools'],
    gradient: 'from-blue-500/20 to-purple-500/20',
    badge: 'AI',
    link: '/components?category=ai'
  },
  {
    icon: Coins,
    title: 'DeFi Applications',
    description: 'Create professional decentralized finance interfaces with trading, portfolio management, and blockchain interactions.',
    features: [
      'Trading interfaces & orderbooks',
      'Portfolio dashboards',
      'Token swapping components',
      'Price charts & analytics',
      'Wallet connection flows'
    ],
    examples: ['DEX interfaces', 'Portfolio trackers', 'Yield farming platforms'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    badge: 'DeFi',
    link: '/components?category=defi'
  },
  {
    icon: User,
    title: 'Developer Portfolios',
    description: 'Showcase your work with beautiful project displays, code snippets, and professional presentation components.',
    features: [
      'Project showcase grids',
      'Interactive code blocks',
      'Skill visualization',
      'Timeline components',
      'Contact forms & CTAs'
    ],
    examples: ['Personal websites', 'Agency portfolios', 'Team showcases'],
    gradient: 'from-orange-500/20 to-red-500/20',
    badge: 'Portfolio',
    link: '/components?category=portfolio'
  }
];

const stats = [
  { icon: MessageSquare, label: 'AI Components', value: '15+' },
  { icon: TrendingUp, label: 'DeFi Components', value: '20+' },
  { icon: Code, label: 'Code Components', value: '10+' },
  { icon: Sparkles, label: 'UI Components', value: '25+' }
];

export const UseCases = () => (
  <section className="relative py-16 w-full flex flex-col items-center">
    <div className="container">
      <div className="mx-auto max-w-full text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Built for modern applications
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you're building AI interfaces, DeFi platforms, or developer portfolios, we have the components you need
        </p>
      </div>

      {/* Stats Row */}
      <div className="mx-auto py-16 w-full max-w-full flex flex-col items-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-lg border bg-background/50 p-4 text-center backdrop-blur-sm"
            >
              <stat.icon className="h-6 w-6 text-primary" />
              <div className="mt-2 text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mx-auto mt-16 w-full max-w-full flex flex-col items-center">
        <div className="grid gap-8 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Card 
              key={useCase.title}
              className={cn(
                "group relative overflow-hidden border-0 transition-all hover:shadow-xl hover:shadow-primary/10",
                `bg-muted backdrop-blur-sm`
              )}
            >
              <CardHeader className="p-4 rounded-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-background/80 text-primary">
                    <useCase.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="bg-background text-xs">
                    {useCase.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{useCase.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {useCase.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4 p-4 rounded-sm border-2 border-background">
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Key Features</h4>
                  <ul className="space-y-2">
                    {useCase.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-3 text-sm font-semibold">Use Cases</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.examples.map((example) => (
                      <Badge key={example} variant="outline" className="bg-background text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link href={useCase.link} className="flex items-center justify-center gap-2">
                    Explore Components
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);
