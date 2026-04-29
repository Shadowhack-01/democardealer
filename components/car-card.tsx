"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, MessageCircle, Fuel, Gauge, Settings2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarCardProps {
  id: string
  name: string
  image: string
  price: string
  year: number
  mileage: string
  fuelType: string
  transmission: string
  isVerified?: boolean
  onViewDetails?: () => void
  onChatToBuy?: () => void
}

export function CarCard({
  name,
  image,
  price,
  year,
  mileage,
  fuelType,
  transmission,
  isVerified = true,
  onViewDetails,
  onChatToBuy,
}: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Verified Badge */}
      {isVerified && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-white uppercase tracking-wider">Verified</span>
        </div>
      )}

      {/* Image Container with 3D effect */}
      <motion.div
        className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-lime-400/20 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Quick View Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">
            {name}
          </h3>
          <p className="text-zinc-400 text-sm">
            {year} • {mileage}
          </p>
        </div>

        {/* Specs Grid */}
        <motion.div
          className="grid grid-cols-3 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <Calendar className="h-3.5 w-3.5 text-lime-400" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <Fuel className="h-3.5 w-3.5 text-lime-400" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <Settings2 className="h-3.5 w-3.5 text-lime-400" />
            <span>{transmission}</span>
          </div>
        </motion.div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <p className="text-xl font-bold text-lime-400">{price}</p>
          <div className="flex items-center gap-1 text-zinc-500 text-xs">
            <Gauge className="h-3.5 w-3.5" />
            <span>{mileage}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onChatToBuy}
          className="w-full bg-lime-400 text-black font-semibold hover:bg-lime-300 transition-all"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat to Buy
        </Button>
      </div>

      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}
