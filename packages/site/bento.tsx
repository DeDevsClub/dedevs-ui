"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  icons?: boolean;
  href?: string;
  feature?:
    | "chart"
    | "counter"
    | "code"
    | "timeline"
    | "spotlight"
    | "icons"
    | "typing"
    | "metrics";
  spotlightItems?: string[];
  timeline?: Array<{ year: string; event: string }>;
  code?: string;
  codeLang?: string;
  typingText?: string;
  metrics?: Array<{
    label: string;
    value: number;
    suffix?: string;
    color?: string;
  }>;
  statistic?: {
    value: string;
    label: string;
    start?: number;
    end?: number;
    suffix?: string;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface BentoGridProps {
  items: BentoItem[];
  className?: string;
  title?: string;
  subtitle?: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const SpotlightFeature = ({ items }: { items: string[] }) => {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, index) => (
        <motion.li
          key={`spotlight-${item.toLowerCase().replace(/\s+/g, "-")}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
};

const CounterAnimation = ({
  start,
  end,
  suffix = "",
}: {
  start: number;
  end: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - (1 - progress) ** 3;
      const current = start + (end - start) * easedProgress;

      setCount(Math.min(current, end));

      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [start, end]);

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        {count.toFixed(1).replace(/\.0$/, "")}
      </span>
      <span className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
        {suffix}
      </span>
    </div>
  );
};

const ChartAnimation = ({ value }: { value: number }) => {
  return (
    <div className="mt-2 w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

const IconsFeature = ({ icons }: { icons?: React.ReactNode[] }) => {
  const defaultIcons = [
    <div key="icon-1" className="w-8 h-8 bg-blue-500 rounded-lg" />,
    <div key="icon-2" className="w-8 h-8 bg-green-500 rounded-lg" />,
    <div key="icon-3" className="w-8 h-8 bg-purple-500 rounded-lg" />,
    <div key="icon-4" className="w-8 h-8 bg-orange-500 rounded-lg" />,
    <div key="icon-5" className="w-8 h-8 bg-red-500 rounded-lg" />,
    <Plus key="icon-more" className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />,
  ];

  const displayIcons = icons || defaultIcons;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {displayIcons.map((icon, index) => (
        <motion.div
          key={`icon-${index}`}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const TimelineFeature = ({
  timeline,
}: {
  timeline: Array<{ year: string; event: string }>;
}) => {
  return (
    <div className="mt-3 relative">
      <div className="absolute top-0 bottom-0 left-[9px] w-[2px] bg-neutral-200 dark:bg-neutral-700" />
      {timeline.map((item, index) => (
        <motion.div
          key={`timeline-${item.year}-${item.event
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="flex gap-3 mb-3 relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.15 * index,
          }}
        >
          <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 flex-shrink-0 z-10 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {item.year}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {item.event}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const TypingCodeFeature = ({ text, filename = "code.ts" }: { text: string; filename?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);

        if (terminalRef.current) {
          terminalRef.current.scrollTop =
            terminalRef.current.scrollHeight;
        }
      }, Math.random() * 30 + 10);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className="mt-3 relative">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {filename}
        </div>
      </div>
      <div
        ref={terminalRef}
        className="bg-neutral-900 dark:bg-black text-neutral-100 p-3 rounded-md text-xs font-mono h-[150px] overflow-y-auto"
      >
        <pre className="whitespace-pre-wrap">
          {displayedText}
          <span className="animate-pulse">|</span>
        </pre>
      </div>
    </div>
  );
};

const MetricsFeature = ({
  metrics,
}: {
  metrics: Array<{
    label: string;
    value: number;
    suffix?: string;
    color?: string;
  }>;
}) => {
  const getColorClass = (color = "emerald") => {
    const colors = {
      emerald: "bg-emerald-500 dark:bg-emerald-400",
      blue: "bg-blue-500 dark:bg-blue-400",
      violet: "bg-violet-500 dark:bg-violet-400",
      amber: "bg-amber-500 dark:bg-amber-400",
      rose: "bg-rose-500 dark:bg-rose-400",
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="mt-3 space-y-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={`metric-${metric.label
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="space-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * index }}
        >
          <div className="flex justify-between items-center text-sm">
            <div className="text-neutral-700 dark:text-neutral-300 font-medium flex items-center gap-1.5">
              {metric.label === "Uptime" && (
                <Clock className="w-3.5 h-3.5" />
              )}
              {metric.label === "Response time" && (
                <Zap className="w-3.5 h-3.5" />
              )}
              {metric.label === "Cost reduction" && (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {metric.label}
            </div>
            <div className="text-neutral-700 dark:text-neutral-300 font-semibold">
              {metric.value}
              {metric.suffix}
            </div>
          </div>
          <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${getColorClass(
                metric.color
              )}`}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, metric.value)}%`,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.15 * index,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const BentoCard = ({ item }: { item: BentoItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  const CardContent = (
    <div
      className={`
        group relative flex flex-col gap-4 h-full rounded-xl p-5
        bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 
        dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30
        border border-neutral-200/60 dark:border-neutral-800/60
        before:absolute before:inset-0 before:rounded-xl
        before:bg-gradient-to-b before:from-white/10 before:via-white/20 before:to-transparent 
        dark:before:from-black/10 dark:before:via-black/20 dark:before:to-transparent
        before:opacity-100 before:transition-opacity before:duration-500
        after:absolute after:inset-0 after:rounded-xl after:bg-neutral-50/70 dark:after:bg-neutral-900/70 after:z-[-1]
        backdrop-blur-[4px]
        shadow-[0_4px_20px_rgb(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)]
        hover:border-neutral-300/50 dark:hover:border-neutral-700/50
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
        hover:backdrop-blur-[6px]
        hover:bg-gradient-to-b hover:from-neutral-50/60 hover:via-neutral-50/30 hover:to-neutral-50/20
        dark:hover:from-neutral-800/60 dark:hover:via-neutral-800/30 dark:hover:to-neutral-800/20
        transition-all duration-500 ease-out ${item.className || ''}
      `}
    >
      <div
        className="relative z-10 flex flex-col gap-3 h-full"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="space-y-2 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
              {item.title}
            </h3>
            {item.href && (
              <div className="text-neutral-400 dark:text-neutral-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 tracking-tight">
            {item.description}
          </p>

          {/* Feature specific content */}
          {item.feature === "spotlight" && item.spotlightItems && (
            <SpotlightFeature items={item.spotlightItems} />
          )}

          {item.feature === "counter" && item.statistic && (
            <div className="mt-auto pt-3">
              <CounterAnimation
                start={item.statistic.start || 0}
                end={item.statistic.end || 100}
                suffix={item.statistic.suffix}
              />
            </div>
          )}

          {item.feature === "chart" && item.statistic && (
            <div className="mt-auto pt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {item.statistic.label}
                </span>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {item.statistic.end}
                  {item.statistic.suffix}
                </span>
              </div>
              <ChartAnimation value={item.statistic.end || 0} />
            </div>
          )}

          {item.feature === "timeline" && item.timeline && (
            <TimelineFeature timeline={item.timeline} />
          )}

          {item.feature === "icons" && <IconsFeature />}

          {item.feature === "typing" && item.typingText && (
            <TypingCodeFeature text={item.typingText} />
          )}

          {item.feature === "metrics" && item.metrics && (
            <MetricsFeature metrics={item.metrics} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {item.href ? (
        <a
          href={item.href}
          className="block h-full"
          tabIndex={0}
          aria-label={`${item.title} - ${item.description}`}
        >
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </motion.div>
  );
};

export function BentoGrid({ items, className, title, subtitle }: BentoGridProps) {
  return (
    <section className={cn("relative py-24 sm:py-32 bg-white dark:bg-black overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-6 auto-rows-fr"
        >
          {items.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { BentoCard };