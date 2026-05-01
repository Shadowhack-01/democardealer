"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Fuel, 
  Gauge, 
  Settings2, 
  Calendar,
  Shield,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface VehicleDetailModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: {
    name: string
    images: string[]
    price: string
    year: number
    mileage: string
    fuelType: string
    transmission: string
    description?: string
    features?: string[]
    location?: string
  } | null
}

export function VehicleDetailModal({ isOpen, onClose, vehicle }: VehicleDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  if (!vehicle) return null

  const images = vehicle.images.length > 0 ? vehicle.images : ["/images/cars/mercedes-benz.jpg"]
  
  const features = vehicle.features || [
    "Leather Interior",
    "Panoramic Sunroof",
    "360° Camera",
    "Adaptive Cruise Control",
    "Heated Seats",
    "Premium Sound System",
    "Wireless Charging",
    "Apple CarPlay/Android Auto"
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-zinc-900 rounded-2xl overflow-hidden z-50 flex flex-col lg:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-lime-400 hover:text-black transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image Gallery */}
            <div className="relative lg:w-2/3 h-64 lg:h-auto bg-black">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-lime-400 hover:text-black transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-lime-400 hover:text-black transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-lime-400 w-6" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Verified Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Shield className="h-4 w-4 text-lime-400" />
                <span className="text-xs font-medium text-white">Verified Vehicle</span>
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-1/3 p-6 lg:p-8 overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">{vehicle.name}</h2>
                  <p className="text-zinc-400 mt-1">{vehicle.year} • {vehicle.mileage}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-all ${
                      isLiked ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                  <button className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-lime-400">{vehicle.price}</p>
                <p className="text-zinc-500 text-sm mt-1">Negotiable • Financing Available</p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-zinc-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-lime-400/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Year</p>
                    <p className="text-white font-medium">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-lime-400/10 rounded-lg">
                    <Gauge className="h-5 w-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Mileage</p>
                    <p className="text-white font-medium">{vehicle.mileage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-lime-400/10 rounded-lg">
                    <Fuel className="h-5 w-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Fuel Type</p>
                    <p className="text-white font-medium">{vehicle.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-lime-400/10 rounded-lg">
                    <Settings2 className="h-5 w-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Transmission</p>
                    <p className="text-white font-medium">{vehicle.transmission}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-zinc-400 mb-6">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{vehicle.location || "Lagos, Nigeria"}</span>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mt-auto">
                <Button
                  className="w-full bg-lime-400 text-black font-semibold hover:bg-lime-300 h-12"
                  onClick={() => window.open("https://wa.me/2349099710000", "_blank")}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-white hover:bg-zinc-800 h-12"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Dealer
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
