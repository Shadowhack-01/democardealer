"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Eye } from "lucide-react"
import { vehicles } from "@/lib/vehicles"

const featuredVehicles = vehicles.slice(0, 3)

function VehicleCard3D({ vehicle, index }: { vehicle: typeof vehicles[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      className="group cursor-pointer"
    >
      <Link href={`/vehicles/${vehicle.slug}`}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={vehicle.images[0]}
              alt={vehicle.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* 3D Floating overlay */}
            <motion.div
              style={{ transform: "translateZ(50px)" }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "radial-gradient(circle at center, rgba(163, 230, 53, 0.15) 0%, transparent 70%)",
              }}
            />

            {/* View Details button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                style={{ transform: "translateZ(75px)" }}
                className="flex items-center gap-2 px-6 py-3 bg-lime-400 text-black font-semibold rounded-full"
              >
                <Eye className="h-5 w-5" />
                View Details
              </motion.span>
            </motion.div>
          </div>

          {/* Content - 3D depth effect */}
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="relative p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lime-400 text-xs font-medium mb-1">{vehicle.brand}</p>
                <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                  {vehicle.name}
                </h3>
                <p className="text-zinc-500 text-sm mt-1">
                  {vehicle.year} • {vehicle.mileage}
                </p>
              </div>
              <p className="text-lime-400 font-bold">{vehicle.formattedPrice}</p>
            </div>
          </motion.div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="w-full h-full border-t-2 border-r-2 border-lime-400 rounded-tr-lg" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="w-full h-full border-b-2 border-l-2 border-lime-400 rounded-bl-lg" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function FeaturedVehicles() {
  return (
    <section className="py-20 px-4 bg-zinc-950 relative overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-lime-400/20 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: "-100%",
              right: "-100%",
            }}
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured <span className="text-lime-400">Vehicles</span>
            </h2>
            <p className="text-zinc-400 mt-4 max-w-lg">
              Discover our handpicked selection of premium vehicles, each one thoroughly 
              inspected and ready for delivery.
            </p>
          </div>

          <Link href="/inventory">
            <motion.button
              className="self-start md:self-auto inline-flex items-center gap-2 text-lime-400 font-semibold hover:text-lime-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              View All
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle, index) => (
            <VehicleCard3D key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
