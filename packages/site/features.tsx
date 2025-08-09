"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@repo/shadcn-ui/lib/utils";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  href?: string;
  image?: string;
}

export interface FeaturesProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  layout?: "grid" | "list" | "alternating";
  columns?: 2 | 3 | 4;
  showImages?: boolean;
  className?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const FeatureCard = ({ feature, showImage = false }: { feature: Feature; showImage?: boolean }) => {
  const IconComponent = feature.icon;

  const content = (
    <div
      className={cn(
        "group relative h-full w-full p-6 rounded-xl border border-neutral-200 dark:border-neutral-800",
        "bg-background mx-auto justify-center items-center flex flex-col",
        "hover:border-neutral-300 dark:hover:border-neutral-700",
        "hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50",
        "transition-all duration-300 ease-out",
        feature.href && "cursor-pointer"
      )}
    >

      <div className="flex flex-col h-full w-full justify-start items-start space-y-4">
        {/* Icon or Image */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showImage && feature.image ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : IconComponent ? (
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  "bg-background",
                  feature.iconColor || "text-text"
                )}
              >
                <IconComponent className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-background" />
            )}
          </div>

          {feature.href && (
            <ArrowRight className="w-5 h-5 text-text group-hover:text-text transition-colors opacity-0 group-hover:opacity-100" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-text transition-colors">
            {feature.title}
          </h3>
          <p className="text-text leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );

  if (feature.href) {
    return (
      <a href={feature.href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
};

const AlternatingFeature = ({ feature, index, showImage = false }: { feature: Feature; index: number; showImage?: boolean }) => {
  const IconComponent = feature.icon;
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center",
      !isEven && "lg:grid-flow-col-dense"
    )}>
      {/* Content */}
      <div className={cn("space-y-6", !isEven && "lg:col-start-2")}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {showImage && feature.image ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : IconComponent ? (
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  "bg-background",
                  feature.iconColor || "text-text"
                )}
              >
                <IconComponent className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-background" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-text">
            {feature.title}
          </h3>
          
          <p className="text-lg text-text leading-relaxed">
            {feature.description}
          </p>

          {feature.href && (
            <a
              href={feature.href}
              className="inline-flex items-center gap-2 text-text hover:text-text font-medium transition-colors"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Visual */}
      <div className={cn(
        "relative",
        !isEven && "lg:col-start-1 lg:row-start-1"
      )}>
        <div className="aspect-video rounded-xl bg-background border border-neutral-200 overflow-hidden">
          {feature.image ? (
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {IconComponent ? (
                <IconComponent className="w-16 h-16 text-text" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-background" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function Features({
  features,
  title = "Features",
  subtitle,
  layout = "grid",
  columns = 3,
  showImages = false,
  className,
}: FeaturesProps) {
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4";
      default:
        return "md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section className={cn("py-24 sm:py-32 bg-background w-full justify-center items-center flex flex-col", className)}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-text">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Features */}
        {layout === "alternating" ? (
          <div className="space-y-24 w-full flex flex-col justify-center items-center mx-auto bg-background">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="w-full flex flex-col justify-center items-center mx-auto bg-background"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <AlternatingFeature
                  feature={feature}
                  index={index}
                  showImage={showImages}
                />
              </motion.div>
            ))}
          </div>
        ) : layout === "list" ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6 w-full flex flex-col justify-center items-center mx-auto bg-background"
          >
            {features.map((feature) => (
              <motion.div key={feature.id} className="w-full flex flex-col justify-center items-center mx-auto bg-background" variants={fadeInUp}>
                <FeatureCard feature={feature} showImage={showImages} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className={cn("grid gap-6 w-full flex flex-col justify-center items-center mx-auto bg-background", getGridCols())}
          >
            {features.map((feature) => (
              <motion.div key={feature.id} className="w-full flex flex-col justify-center items-center mx-auto bg-background" variants={fadeInUp}>
                <FeatureCard feature={feature} showImage={showImages} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
