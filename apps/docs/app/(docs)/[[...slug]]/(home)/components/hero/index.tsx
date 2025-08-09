import {
  SiLucide,
  SiRadixui,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons';
import { Button } from '@repo/shadcn-ui/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/shadcn-ui/components/ui/tooltip';
import Link from 'next/link';
import { GitHubButton } from '../github-button';
import Image from 'next/image';

const icons = [
  {
    icon: SiReact,
    name: 'React',
    color: '#087ea4',
  },
  {
    icon: SiTypescript,
    name: 'TypeScript',
    color: '#3178c6',
  },
  {
    icon: SiTailwindcss,
    name: 'Tailwind CSS',
    color: '#00bcff',
  },
  {
    icon: SiLucide,
    name: 'Lucide',
    color: '#f67373',
  },
  {
    icon: SiRadixui,
    name: 'Radix UI',
    color: '#000000',
  },
];

export const Hero = () => (
  <section
    className="relative isolate overflow-hidden rounded-4xl bg-background pt-8 sm:pt-12 md:pt-16 lg:pt-24"
    style={{
      backgroundColor: 'var(--background)',
      backgroundImage:
        'radial-gradient(at 81% 100%, var(--color-pink-300) 0px, transparent 50%), radial-gradient(at 19% 100%, var(--color-purple-300) 0px, transparent 50%)',
    }}
  >
    <div className="pointer-events-none absolute right-0 bottom-0 left-0 select-none border-background/15 border-t">
      <div className="grid grid-cols-24 divide-x divide-y divide-background/15">
        {new Array(24 * 12).fill(0).map((_, index) => (
          <div className="aspect-square w-full" key={index} />
        ))}
      </div>
    </div>
    <div className="container relative z-10 grid gap-8 sm:gap-12 md:gap-16">
      <div className="mx-auto flex flex-col justify-center gap-6 text-balance">
        <h1 className="mb-0 text-balance text-center font-semibold text-4xl tracking-[-0.06em]! sm:text-5xl md:text-6xl xl:text-7xl">
          The Ultimate{' '}
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Modular Design Registry
          </span>{' '}
          for Modern Web Apps
        </h1>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-0 mb-0 text-muted-foreground lg:text-lg xl:text-xl 2xl:text-2xl">
            Build AI interfaces, DeFi applications, and developer portfolios with our collection of 50+ production-ready, accessible components. Copy, paste, and customize with ease.
          </p>
        </div>
        
        {/* Technology Icons */}
        <div className="flex items-center justify-center gap-2 opacity-60">
          <span className="text-sm text-muted-foreground">Built with</span>
          <div className="-space-x-2 inline-flex items-center justify-center">
            {icons.map((icon, index) => (
              <Tooltip key={icon.name}>
                <TooltipTrigger asChild>
                  <div
                    className="inline-flex size-6 items-center justify-center rounded-full text-white sm:size-7 md:size-8"
                    style={{
                      backgroundColor: icon.color,
                      maskImage: index
                        ? 'radial-gradient(circle 20px at -12px 50%, transparent 99%, white 100%)'
                        : 'none',
                    }}
                  >
                    <icon.icon className="size-3 sm:size-3.5 md:size-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{icon.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/components">Browse components</Link>
          </Button>
          <GitHubButton />
        </div>
      </div>
      <div className="-mb-24 overflow-hidden rounded-4xl border-background/10 border-x bg-gradient-to-b from-background/15 to-background/40 p-8 backdrop-blur-lg">
        {/* <DemoVideo url="https://youtu.be/FqQ9j6bqtf0" /> */}
        <Image
          src="https://ui.dedevs.com/hero.png"
          alt="Hero"
          width={3072}
          height={2048}
          className="w-full rounded-md"
        />
      </div>
    </div>
  </section>
);
