import { TextLoop } from '../../../../../components/motion-primitives/text-loop';
import { source } from '../../../../../lib/source';

const components = source
  .getPages()
  .filter((page: any) => page.slugs.at(0) === 'components')
  .map((page: any) => page.slugs.at(1))
  .filter((slug: any) => !slug?.startsWith('ai-'))
  .filter(Boolean) as string[];

const Terminal = () => (
  <div className="w-full overflow-hidden rounded-t-2xl border border-border bg-background shadow-2xl">
    {/* Terminal Header */}
    <div className="flex items-center justify-between border-border border-b bg-muted px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="font-medium text-muted-foreground text-sm">Terminal</div>
      <div className="w-14" /> {/* Spacer for centering */}
    </div>

    {/* Terminal Content */}
    <div className="h-[10rem] bg-background p-6 sm:h-[20rem]">
      <div className="flex items-center font-mono text-base">
        <code className="mr-2 text-blue-600 dark:text-blue-400">$</code>
        <code className="text-muted-foreground">npx dedevs-ui add&nbsp;</code>
        <TextLoop>
          {components.map((component) => (
            <span className="text-foreground" key={component}>
              {component}
            </span>
          ))}
        </TextLoop>
        <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-foreground" />
      </div>
    </div>
  </div>
);

export const CallToAction = () => (
  <section className="relative py-16 sm:py-20 lg:py-24">
    <div className="container">
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 p-8 md:p-16">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="relative grid gap-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build something amazing?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of developers using DeDevs UI to build modern applications. Get started in seconds.
            </p>
          </div>
          
          <div className="dark">
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  </section>
);
