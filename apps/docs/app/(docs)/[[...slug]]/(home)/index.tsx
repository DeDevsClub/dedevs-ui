import { Blocks } from './components/blocks';
import { CallToAction } from './components/call-to-action';
import { Components } from './components/components';
import { Hero } from './components/hero';
import { Features } from './components/features';
import { Stats } from './components/stats';
import { Testimonials } from './components/testimonials';
import { TechStack } from './components/tech-stack';
import { UseCases } from './components/use-cases';

const Home = () => (
  <div className="mt-[var(--fd-nav-height)] w-full">
    <Hero />
    <Stats />
    <Features />
    <TechStack />
    <Components />
    <UseCases />
    <Blocks />
    <Testimonials />
    <CallToAction />
  </div>
);

export default Home;
