"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { brands } from "@/lib/vehicles"

export function BrandMarquee() {
  return (
    <section className="py-12 bg-zinc-900/50 border-y border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-center text-zinc-500 text-sm uppercase tracking-widest">
          Authorized Dealer For
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        {/* Marquee */}
        <motion.div
          className="flex gap-16"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {/* Double the items for seamless loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 w-32 h-20 relative grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
