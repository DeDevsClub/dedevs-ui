"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showRating?: boolean;
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function Testimonials({
  testimonials,
  title = "What our community says",
  subtitle,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showRating = true,
  className,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      }
    });
  };

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-neutral-300 dark:text-neutral-600"
        )}
      />
    ));
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-24 sm:py-32 bg-neutral-50 dark:bg-neutral-900", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-80 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 max-w-3xl w-full">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />

                    {/* Testimonial Text */}
                    <blockquote className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    {/* Rating */}
                    {showRating && testimonials[currentIndex].rating && (
                      <div className="flex items-center gap-1">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      {testimonials[currentIndex].avatar && (
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div className="text-left">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {testimonials[currentIndex].author}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {testimonials[currentIndex].role}
                          {testimonials[currentIndex].company && (
                            <span> at {testimonials[currentIndex].company}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {showNavigation && testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(-1)}
                className="p-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentIndex
                        ? "bg-neutral-900 dark:bg-neutral-100"
                        : "bg-neutral-300 dark:bg-neutral-600"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(1)}
                className="p-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Grid View for Multiple Testimonials */}
        {testimonials.length > 3 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          >
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700"
              >
                <div className="space-y-4">
                  {showRating && testimonial.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  )}

                  <blockquote className="text-neutral-700 dark:text-neutral-300">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center gap-3">
                    {testimonial.avatar && (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {testimonial.role}
                        {testimonial.company && <span> at {testimonial.company}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
