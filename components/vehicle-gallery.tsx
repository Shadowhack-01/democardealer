"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Filter, Grid3X3, LayoutList, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { vehicles, brands } from "@/lib/vehicles"

const brandFilters = ["All", ...brands.map(b => b.name)]

export function VehicleGallery() {
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredVehicles = selectedBrand === "All" 
    ? vehicles.slice(0, 6) 
    : vehicles.filter(v => v.brand === selectedBrand).slice(0, 6)

  return (
    <section id="inventory" className="py-20 px-4 bg-black relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a3e635' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-lime-400 text-sm font-semibold uppercase tracking-widest">
                Current Stock
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
                Checkout Our <span className="text-lime-400">Lineup</span>
              </h2>
              <p className="text-zinc-400 mt-4 max-w-xl">
                Hand-selected luxury cars, fully verified and ready for delivery. 
                Experience unmatched quality and selection.
              </p>
            </div>

            {/* View All Button */}
            <Link href="/inventory">
              <motion.button
                className="self-start lg:self-auto inline-flex items-center gap-2 px-6 py-3 border-2 border-lime-400 text-lime-400 font-semibold rounded-full hover:bg-lime-400 hover:text-black transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800"
        >
          {/* Brand Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 mr-2 text-zinc-500">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filter:</span>
            </div>
            {brandFilters.slice(0, 7).map((brand) => (
              <motion.button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedBrand === brand
                    ? "bg-lime-400 text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {brand}
              </motion.button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-zinc-900 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid" ? "bg-lime-400 text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list" ? "bg-lime-400 text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutList className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Vehicle Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(vehicle.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/vehicles/${vehicle.slug}`}>
                  <motion.div 
                    className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 cursor-pointer"
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 2,
                      rotateX: -1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "aspect-video md:aspect-[21/9]" : "aspect-[4/3]"}`}>
                      <Image
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                      
                      {/* Verified Badge */}
                      {vehicle.verified && (
                        <Badge className="absolute top-3 left-3 bg-lime-400 text-black text-xs gap-1">
                          <Check className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}

                      {/* View Details Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === vehicle.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-full">
                          View Details
                        </span>
                      </motion.div>

                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ boxShadow: "inset 0 0 0 0 rgba(163, 230, 53, 0)" }}
                        animate={{
                          boxShadow: hoveredId === vehicle.id 
                            ? "inset 0 0 30px 5px rgba(163, 230, 53, 0.1)" 
                            : "inset 0 0 0 0 rgba(163, 230, 53, 0)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs text-lime-400 font-medium mb-1">{vehicle.brand}</p>
                      <h3 className="font-semibold text-white text-lg group-hover:text-lime-400 transition-colors mb-1">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-zinc-500 mb-3">
                        {vehicle.year} • {vehicle.mileage} • {vehicle.transmission}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-lime-400">{vehicle.formattedPrice}</p>
                        <Button
                          size="sm"
                          className="bg-lime-400 text-black hover:bg-lime-300"
                          onClick={(e) => {
                            e.preventDefault()
                            window.open("https://wa.me/2349032809424", "_blank")
                          }}
                        >
                          Chat to Buy
                        </Button>
                      </div>
                    </div>

                    {/* Corner accent on hover */}
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === vehicle.id ? 1 : 0 }}
                    >
                      <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-lime-400 rounded-tr-xl" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === vehicle.id ? 1 : 0 }}
                    >
                      <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-lime-400 rounded-bl-xl" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/inventory">
            <Button
              variant="outline"
              size="lg"
              className="border-zinc-700 text-zinc-400 hover:border-lime-400 hover:text-lime-400 hover:bg-lime-400/10"
            >
              View All {vehicles.length} Vehicles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
