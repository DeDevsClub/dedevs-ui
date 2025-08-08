import { Avatar, AvatarFallback, AvatarImage } from '@repo/shadcn-ui/components/ui/avatar';
import { Card, CardContent } from '@repo/shadcn-ui/components/ui/card';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    content: "DeDevs UI has transformed how we build AI interfaces. The components are incredibly well-designed and save us weeks of development time.",
    author: {
      name: "Sarah Chen",
      role: "Senior Frontend Engineer",
      company: "AI Startup",
      avatar: "SC",
      image: null
    },
    rating: 5
  },
  {
    content: "The DeFi components are production-ready and beautifully crafted. We've built our entire trading platform using these components.",
    author: {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      company: "DeFi Protocol",
      avatar: "MR",
      image: null
    },
    rating: 5
  },
  {
    content: "As a freelance developer, these components help me deliver professional portfolios quickly. The documentation is outstanding.",
    author: {
      name: "Emily Johnson",
      role: "Freelance Developer",
      company: "Independent",
      avatar: "EJ",
      image: null
    },
    rating: 5
  },
  {
    content: "The modular architecture is perfect for our needs. We can pick exactly what we need without bloating our bundle size.",
    author: {
      name: "David Kim",
      role: "Tech Lead",
      company: "Fintech Company",
      avatar: "DK",
      image: null
    },
    rating: 5
  },
  {
    content: "Exceptional quality and attention to accessibility. These components work perfectly with our design system.",
    author: {
      name: "Lisa Thompson",
      role: "Design Systems Lead",
      company: "Enterprise Corp",
      avatar: "LT",
      image: null
    },
    rating: 5
  },
  {
    content: "The TypeScript support is excellent, and the components integrate seamlessly with Next.js. Highly recommended!",
    author: {
      name: "Alex Patel",
      role: "Full Stack Developer",
      company: "Tech Agency",
      avatar: "AP",
      image: null
    },
    rating: 5
  }
];

export const Testimonials = () => (
  <section className="relative py-16 sm:py-20 lg:py-24 bg-muted/30">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by developers worldwide
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          See what developers are saying about DeDevs UI components
        </p>
      </div>
      
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={cn(
                "group relative overflow-hidden border-0 bg-background/50 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5",
                "hover:bg-background/80"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="h-5 w-5 text-primary/60" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-sm leading-relaxed text-muted-foreground mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {testimonial.author.image ? (
                      <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {testimonial.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{testimonial.author.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.author.role} · {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);
