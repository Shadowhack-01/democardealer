"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { brands } from "@/lib/vehicles"

export function BrandShowcase() {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 px-4 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-400/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-lime-400 text-sm font-semibold uppercase tracking-widest">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Browse By <span className="text-lime-400">Brand</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            View our collection by brand and discover your next vehicle from the world&apos;s most prestigious manufacturers.
          </p>
        </motion.div>

        {/* Brand Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredBrand(brand.name)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <Link href={`/inventory?brand=${encodeURIComponent(brand.name)}`}>
                <motion.div
                  className="relative aspect-square rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: -5,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  {/* Brand Logo */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-lime-400/20 via-lime-400/5 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredBrand === brand.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ boxShadow: "0 0 0 0 rgba(163, 230, 53, 0)" }}
                    animate={{
                      boxShadow: hoveredBrand === brand.name 
                        ? "0 0 30px 5px rgba(163, 230, 53, 0.3)" 
                        : "0 0 0 0 rgba(163, 230, 53, 0)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-12 h-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredBrand === brand.name ? 1 : 0 }}
                  >
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-lime-400 rounded-tr-lg" />
                  </motion.div>
                </motion.div>

                {/* Brand Info */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredBrand === brand.name ? 1 : 0.7, 
                    y: hoveredBrand === brand.name ? 0 : 5 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-semibold group-hover:text-lime-400 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">
                    {brand.count} vehicles
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/inventory">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Auto Gallery
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
