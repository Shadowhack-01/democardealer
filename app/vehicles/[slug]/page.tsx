"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Share2,
  Heart,
  Check,
  Fuel,
  Gauge,
  Settings,
  Car,
  Palette,
  Users,
  Calendar,
  MapPin,
  Shield,
  Truck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getVehicleBySlug, vehicles } from "@/lib/vehicles"

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const vehicle = getVehicleBySlug(slug)
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-zinc-400 mb-8">The vehicle you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/inventory")} className="bg-lime-400 text-black hover:bg-lime-300">
            View All Vehicles
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  const specs = [
    { icon: Calendar, label: "Year", value: vehicle.year },
    { icon: Gauge, label: "Mileage", value: vehicle.mileage },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuelType },
    { icon: Settings, label: "Transmission", value: vehicle.transmission },
    { icon: Car, label: "Engine", value: vehicle.engine },
    { icon: Truck, label: "Drivetrain", value: vehicle.drivetrain },
    { icon: Palette, label: "Exterior", value: vehicle.exteriorColor },
    { icon: Users, label: "Seats", value: `${vehicle.seats} Passengers` },
  ]

  // Get related vehicles (same brand)
  const relatedVehicles = vehicles
    .filter(v => v.brand === vehicle.brand && v.id !== vehicle.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Gallery</span>
            </button>

            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                NAIJA CAR SHOP<span className="text-lime-400">.</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-zinc-400"}`}
                />
              </button>
              <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
                <Share2 className="h-5 w-5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section with Image Gallery */}
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="relative aspect-4/3 lg:aspect-auto lg:h-[calc(100vh-4rem)] bg-zinc-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={vehicle.images[currentImageIndex]}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Image navigation */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-lime-400 hover:text-black transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-lime-400 hover:text-black transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Image dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {vehicle.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-lime-400" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Verified badge */}
              {vehicle.verified && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-lime-400 text-black font-semibold gap-1">
                    <Check className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
              <div className="p-6 lg:p-10">
                {/* Brand & Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-lime-400 text-sm font-medium mb-2">{vehicle.brand}</p>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {vehicle.name}
                  </h1>
                  <p className="text-zinc-500 mb-6">
                    {vehicle.year} • {vehicle.mileage} • {vehicle.bodyType}
                  </p>
                </motion.div>

                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <p className="text-sm text-zinc-500 mb-1">Price</p>
                  <p className="text-4xl font-bold text-lime-400">{vehicle.formattedPrice}</p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-10"
                >
                  <Button
                    size="lg"
                    className="flex-1 bg-lime-400 text-black font-bold hover:bg-lime-300"
                    onClick={() => window.open("https://wa.me/2349032809424", "_blank")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat to Buy
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-zinc-700 text-white hover:bg-zinc-800"
                    onClick={() => window.open("tel:+2349032809424")}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </motion.div>

                {/* Specs Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-10"
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Vehicle Specifications</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center">
                            <spec.icon className="h-5 w-5 text-lime-400" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">{spec.label}</p>
                            <p className="text-sm font-medium text-white">{spec.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-10"
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Features & Equipment</h2>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300 border-zinc-700"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-10"
                >
                  <h2 className="text-lg font-semibold text-white mb-4">About This Vehicle</h2>
                  <p className="text-zinc-400 leading-relaxed">{vehicle.description}</p>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { icon: Shield, title: "Verified History", desc: "Full inspection report" },
                    { icon: Truck, title: "Nationwide Delivery", desc: "Door-to-door service" },
                    { icon: MapPin, title: "Visit Showroom", desc: "Lekki Phase 1, Lagos" },
                    { icon: Settings, title: "Flexible Payment", desc: "3-12 months plans" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-4 bg-zinc-900/30 rounded-xl border border-zinc-800"
                    >
                      <item.icon className="h-5 w-5 text-lime-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Vehicles */}
        {relatedVehicles.length > 0 && (
          <section className="py-16 px-4 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">
                More from <span className="text-lime-400">{vehicle.brand}</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedVehicles.map((relatedVehicle, index) => (
                  <motion.div
                    key={relatedVehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/vehicles/${relatedVehicle.slug}`}>
                        <div className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-lime-400/50 transition-all">
                        <div className="relative aspect-16/10 overflow-hidden">
                          <Image
                            src={relatedVehicle.images[0]}
                            alt={relatedVehicle.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent" />
                          {relatedVehicle.verified && (
                            <Badge className="absolute top-3 left-3 bg-lime-400 text-black text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-white group-hover:text-lime-400 transition-colors">
                            {relatedVehicle.name}
                          </h3>
                          <p className="text-xs text-zinc-500 mb-2">
                            {relatedVehicle.year} • {relatedVehicle.mileage}
                          </p>
                          <p className="text-lime-400 font-bold">{relatedVehicle.formattedPrice}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 px-4 bg-lime-400">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Ready to Own This {vehicle.name}?
            </h2>
            <p className="text-black/70 mb-6">
              Contact us now to schedule a viewing or start your purchase process.
            </p>
            <Button
              size="lg"
              className="bg-black text-lime-400 font-bold hover:bg-zinc-900"
              onClick={() => window.open("https://wa.me/2349032809424", "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.open("https://wa.me/2349032809424", "_blank")}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </motion.button>
    </div>
  )
}
