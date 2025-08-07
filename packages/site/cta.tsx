"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@repo/shadcn-ui/components/ui/button";
import { cn } from "@repo/shadcn-ui/lib/utils";

export interface CTAAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface CTATestimonial {
  text: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface CTAProps {
  title: string;
  description: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  features?: string[];
  testimonial?: CTATestimonial;
  variant?: "default" | "gradient" | "minimal" | "card";
  backgroundImage?: string;
  className?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export function CTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  features,
  testimonial,
  variant = "default",
  backgroundImage,
  className,
}: CTAProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white";
      case "minimal":
        return "bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800";
      case "card":
        return "bg-neutral-50 dark:bg-neutral-900";
      default:
        return "bg-neutral-900 dark:bg-neutral-950 text-white";
    }
  };

  const getTextClasses = () => {
    if (variant === "gradient" || variant === "default") {
      return {
        title: "text-white",
        description: "text-white/90",
        feature: "text-white/80",
      };
    }
    return {
      title: "text-neutral-900 dark:text-neutral-100",
      description: "text-neutral-600 dark:text-neutral-400",
      feature: "text-neutral-500 dark:text-neutral-400",
    };
  };

  const textClasses = getTextClasses();

  return (
    <section
      className={cn(
        "relative py-24 sm:py-32 overflow-hidden",
        getVariantClasses(),
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Background Pattern */}
      {variant !== "minimal" && (
        <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5" />
      )}

      {/* Floating Elements */}
      {variant === "gradient" && (
        <>
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full blur-xl animate-pulse delay-2000" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {variant === "card" ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 sm:p-12 shadow-xl border border-neutral-200 dark:border-neutral-700">
              <div className="text-center space-y-8">
                <motion.div variants={fadeInUp} className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h2>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    {description}
                  </p>
                </motion.div>

                {features && features.length > 0 && (
                  <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm">
                    {features.map((feature, index) => (
                      <span
                        key={`feature-${index}`}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      >
                        <Star className="w-3 h-3" />
                        {feature}
                      </span>
                    ))}
                  </motion.div>
                )}

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group px-8 py-3 text-base font-medium"
                    asChild={!!primaryAction.href}
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.href ? (
                      <a href={primaryAction.href}>
                        {primaryAction.label}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <>
                        {primaryAction.label}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  {secondaryAction && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-3 text-base font-medium"
                      asChild={!!secondaryAction.href}
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.href ? (
                        <a href={secondaryAction.href}>{secondaryAction.label}</a>
                      ) : (
                        secondaryAction.label
                      )}
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h2 className={cn("text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight", textClasses.title)}>
                {title}
              </h2>
              <p className={cn("text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed", textClasses.description)}>
                {description}
              </p>
            </motion.div>

            {features && features.length > 0 && (
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm">
                {features.map((feature, index) => (
                  <span
                    key={`feature-${index}`}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1 rounded-full border",
                      variant === "gradient" || variant === "default"
                        ? "bg-white/10 text-white/90 border-white/20"
                        : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                    )}
                  >
                    <Star className="w-3 h-3" />
                    {feature}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className={cn(
                  "group px-8 py-3 text-base font-medium",
                  variant === "gradient" || variant === "default"
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : ""
                )}
                asChild={!!primaryAction.href}
                onClick={primaryAction.onClick}
              >
                {primaryAction.href ? (
                  <a href={primaryAction.href}>
                    {primaryAction.label}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <>
                    {primaryAction.label}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    "px-8 py-3 text-base font-medium",
                    variant === "gradient" || variant === "default"
                      ? "border-white/30 text-white hover:bg-white/10"
                      : ""
                  )}
                  asChild={!!secondaryAction.href}
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.href ? (
                    <a href={secondaryAction.href}>{secondaryAction.label}</a>
                  ) : (
                    secondaryAction.label
                  )}
                </Button>
              )}
            </motion.div>

            {testimonial && (
              <motion.div
                variants={fadeInUp}
                className="max-w-2xl mx-auto pt-8 border-t border-white/20 dark:border-neutral-800"
              >
                <blockquote className={cn("text-lg italic mb-4", textClasses.description)}>
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className="text-left">
                    <div className={cn("font-semibold", textClasses.title)}>
                      {testimonial.author}
                    </div>
                    <div className={cn("text-sm", textClasses.feature)}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
