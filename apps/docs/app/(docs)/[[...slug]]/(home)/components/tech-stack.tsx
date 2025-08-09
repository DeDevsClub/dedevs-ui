import {
  SiLucide,
  SiRadixui,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiFramer,
  SiPrisma,
} from '@icons-pack/react-simple-icons';
import { Badge } from '@repo/shadcn-ui/components/ui/badge';
import { Card, CardContent } from '@repo/shadcn-ui/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/shadcn-ui/components/ui/tooltip';
import { cn } from '@repo/shadcn-ui/lib/utils';

const techStack = [
  {
    category: 'Frontend',
    technologies: [
      {
        icon: SiReact,
        name: 'React',
        color: '#087ea4',
        description: 'Component library foundation'
      },
      {
        icon: SiTypescript,
        name: 'TypeScript',
        color: '#3178c6',
        description: 'Type-safe development'
      },
      {
        icon: SiTailwindcss,
        name: 'Tailwind CSS',
        color: '#00bcff',
        description: 'Utility-first styling'
      },
      {
        icon: SiNextdotjs,
        name: 'Next.js',
        color: '#000000',
        description: 'Full-stack framework'
      }
    ]
  },
  {
    category: 'UI Foundation',
    technologies: [
      {
        icon: SiRadixui,
        name: 'Radix UI',
        color: '#000000',
        description: 'Accessible primitives'
      },
      {
        icon: SiLucide,
        name: 'Lucide',
        color: '#f67373',
        description: 'Beautiful icons'
      },
      {
        icon: SiFramer,
        name: 'Framer Motion',
        color: '#0055ff',
        description: 'Smooth animations'
      }
    ]
  },
  {
    category: 'Backend',
    technologies: [
      {
        icon: SiPrisma,
        name: 'Prisma',
        color: '#2d3748',
        description: 'Database toolkit'
      }
    ]
  }
];

export const TechStack = () => (
  <section className="relative py-16 bg-muted/30">
    <div className="container">
      <div className="mx-auto max-w-full text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Built with modern technologies
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Leveraging the best tools in the ecosystem for performance, accessibility, and developer experience
        </p>
      </div>
      
      <div className="mx-auto mt-16 max-w-full">
        <div className="grid gap-8 lg:grid-cols-3">
          {techStack.map((stack) => (
            <Card key={stack.category} className="border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-6">
                  <Badge variant="outline" className="mb-2">
                    {stack.category}
                  </Badge>
                </div>
                <div className="grid gap-4">
                  {stack.technologies.map((tech) => (
                    <Tooltip key={tech.name}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-text"
                            style={{ backgroundColor: tech.color }}
                          >
                            <tech.icon className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{tech.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {tech.description}
                            </div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tech.name} - {tech.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);
