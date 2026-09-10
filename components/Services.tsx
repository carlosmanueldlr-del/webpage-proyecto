"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/projects";
import { RevealText, Stagger, StaggerItem } from "./Reveal";

const EASE = [0.65, 0, 0.35, 1] as const;

export default function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="editorial-container pb-28 pt-[calc(var(--header-h)+3rem)] sm:pb-40">
      <RevealText as="h1" className="text-[0.95rem] uppercase tracking-label text-stone">
        Services
      </RevealText>

      <Stagger className="mt-10 border-t border-line sm:mt-16">
        {services.map((service) => {
          const isOpen = open === service.index;
          return (
            <StaggerItem key={service.index}>
              <div
                onMouseEnter={() => setOpen(service.index)}
                onMouseLeave={() => setOpen((v) => (v === service.index ? null : v))}
                onClick={() =>
                  setOpen((v) => (v === service.index ? null : service.index))
                }
                data-cursor="link"
                className="cursor-pointer border-b border-line py-7 sm:py-9"
              >
                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span className="text-micro text-stone">{service.index}</span>
                  <span className="text-[1.5rem] font-medium leading-none tracking-tightest sm:text-[2.3rem]">
                    {service.name}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-lg pl-[3.1rem] pt-4 text-[0.85rem] uppercase leading-[1.7] text-stone sm:pl-[4.4rem]">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
