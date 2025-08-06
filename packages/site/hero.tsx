"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  features?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    avatar?: string;
  };
  backgroundImage?: string;
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

export function Hero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  features,
  testimonial,
  backgroundImage,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-neutral-50 via-white to-neutral-100",
        "dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800",
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-neutral-200/50 dark:bg-grid-neutral-800/50" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/80 dark:from-neutral-950/80 dark:via-transparent dark:to-neutral-950/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                <Star className="w-4 h-4 text-yellow-500" />
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Features */}
          {features && features.length > 0 && (
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm">
              {features.map((feature, index) => (
                <span
                  key={`feature-${index}`}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {feature}
                </span>
              ))}
            </motion.div>
          )}

          {/* Actions */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryAction && (
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
            )}

            {secondaryAction && (
              <Button
                variant="outline"
                size="lg"
                className="group px-8 py-3 text-base font-medium"
                asChild={!!secondaryAction.href}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.href ? (
                  <a href={secondaryAction.href} className="flex items-center">
                    <Play className="mr-2 w-4 h-4" />
                    {secondaryAction.label}
                  </a>
                ) : (
                  <>
                    <Play className="mr-2 w-4 h-4" />
                    {secondaryAction.label}
                  </>
                )}
              </Button>
            )}
          </motion.div>

          {/* Testimonial */}
          {testimonial && (
            <motion.div
              variants={fadeInUp}
              className="max-w-2xl mx-auto pt-8 border-t border-neutral-200 dark:border-neutral-800"
            >
              <blockquote className="text-lg italic text-neutral-600 dark:text-neutral-400 mb-4">
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
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20 animate-pulse delay-2000" />
    </section>
  );
}
