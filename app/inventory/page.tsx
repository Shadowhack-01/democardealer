"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Grid3X3,
  List,
  ArrowLeft,
  MessageCircle,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { vehicles, brands } from "@/lib/vehicles"

type SortOption = "price-asc" | "price-desc" | "year-desc" | "year-asc" | "name"

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("price-desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const bodyTypes = useMemo(() => {
    const types = [...new Set(vehicles.map(v => v.bodyType))]
    return types.sort()
  }, [])

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        v =>
          v.name.toLowerCase().includes(query) ||
          v.brand.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query)
      )
    }

    // Brand filter
    if (selectedBrand) {
      result = result.filter(v => v.brand === selectedBrand)
    }

    // Body type filter
    if (selectedBodyType) {
      result = result.filter(v => v.bodyType === selectedBodyType)
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "year-desc":
        result.sort((a, b) => b.year - a.year)
        break
      case "year-asc":
        result.sort((a, b) => a.year - b.year)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [searchQuery, selectedBrand, selectedBodyType, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrand(null)
    setSelectedBodyType(null)
    setSortBy("price-desc")
  }

  const hasActiveFilters = searchQuery || selectedBrand || selectedBodyType

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>

            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                NAIJA CAR SHOP<span className="text-lime-400">.</span>
              </span>
            </Link>

            <Button
              className="bg-lime-400 text-black font-semibold hover:bg-lime-300"
              onClick={() => window.open("https://wa.me/2349032809424", "_blank")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="py-12 px-4 bg-linear-to-b from-zinc-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our <span className="text-lime-400">Auto Gallery</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                Explore our curated collection of premium vehicles. Each car is verified, 
                inspected, and ready for delivery.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="sticky top-16 z-40 bg-black/95 backdrop-blur-md border-b border-zinc-800 py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-lime-400"
                />
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                {/* Mobile filter toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden border-zinc-700 text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 w-2 h-2 bg-lime-400 rounded-full" />
                  )}
                </Button>

                {/* Desktop filters */}
                <div className={`${showFilters ? "flex" : "hidden"} lg:flex flex-wrap gap-2 w-full lg:w-auto`}>
                  {/* Brand Filter */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-zinc-700 text-white">
                        {selectedBrand || "All Brands"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem
                        onClick={() => setSelectedBrand(null)}
                        className="text-white hover:bg-zinc-800 hover:text-lime-400"
                      >
                        All Brands
                      </DropdownMenuItem>
                      {brands.map((brand) => (
                        <DropdownMenuItem
                          key={brand.name}
                          onClick={() => setSelectedBrand(brand.name)}
                          className="text-white hover:bg-zinc-800 hover:text-lime-400"
                        >
                          {brand.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Body Type Filter */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-zinc-700 text-white">
                        {selectedBodyType || "All Types"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem
                        onClick={() => setSelectedBodyType(null)}
                        className="text-white hover:bg-zinc-800 hover:text-lime-400"
                      >
                        All Types
                      </DropdownMenuItem>
                      {bodyTypes.map((type) => (
                        <DropdownMenuItem
                          key={type}
                          onClick={() => setSelectedBodyType(type)}
                          className="text-white hover:bg-zinc-800 hover:text-lime-400"
                        >
                          {type}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Sort */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-zinc-700 text-white">
                        Sort By
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem
                        onClick={() => setSortBy("price-desc")}
                        className="text-white hover:bg-zinc-800 hover:text-lime-400"
                      >
                        Price: High to Low
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("price-asc")}
                        className="text-white hover:bg-zinc-800 hover:text-lime-400"
                      >
                        Price: Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("year-desc")}
                        className="text-white hover:bg-zinc-800 hover:text-lime-400"
                      >
                        Year: Newest First
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("year-asc")}
                        className="text-white hover:bg-zinc-800 hover:text-lime-400"
                      >
                        Year: Oldest First
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("name")}
                        className="text-white hover:bg-zinc-800 hover:text-lime-400"
                      >
                        Name: A-Z
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-lime-400 hover:text-lime-300"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* View toggle */}
                <div className="flex border border-zinc-700 rounded-lg overflow-hidden ml-auto lg:ml-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-lime-400 text-black" : "text-zinc-400 hover:text-white"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-lime-400 text-black" : "text-zinc-400 hover:text-white"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedBrand && (
                  <Badge variant="secondary" className="bg-lime-400/10 text-lime-400 border-lime-400/30">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand(null)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedBodyType && (
                  <Badge variant="secondary" className="bg-lime-400/10 text-lime-400 border-lime-400/30">
                    {selectedBodyType}
                    <button onClick={() => setSelectedBodyType(null)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="bg-lime-400/10 text-lime-400 border-lime-400/30">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results count */}
            <p className="text-zinc-400 text-sm mb-6">
              Showing <span className="text-white font-medium">{filteredVehicles.length}</span> vehicles
            </p>

            {/* Vehicle Grid/List */}
            <AnimatePresence mode="popLayout">
              {filteredVehicles.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <p className="text-zinc-400 text-lg mb-4">No vehicles found matching your criteria.</p>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              ) : viewMode === "grid" ? (
                <motion.div
                  layout
                  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/vehicles/${vehicle.slug}`}>
                        <div className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-1">
                          {/* Image */}
                          <div className="relative aspect-4/3 overflow-hidden">
                            <Image
                              src={vehicle.images[0]}
                              alt={vehicle.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent" />
                            
                            {/* Verified badge */}
                            {vehicle.verified && (
                              <Badge className="absolute top-3 left-3 bg-lime-400 text-black text-xs gap-1">
                                <Check className="h-3 w-3" />
                                Verified
                              </Badge>
                            )}

                            {/* View Details overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-lime-400 text-black font-semibold px-4 py-2 rounded-lg">
                                View Details
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <p className="text-xs text-lime-400 font-medium mb-1">{vehicle.brand}</p>
                            <h3 className="font-semibold text-white group-hover:text-lime-400 transition-colors text-lg mb-1">
                              {vehicle.name}
                            </h3>
                            <p className="text-xs text-zinc-500 mb-3">
                              {vehicle.year} • {vehicle.mileage} • {vehicle.transmission}
                            </p>
                            <p className="text-xl font-bold text-lime-400">{vehicle.formattedPrice}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div layout className="space-y-4">
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/vehicles/${vehicle.slug}`}>
                        <div className="group flex flex-col sm:flex-row bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-lime-400/50 transition-all">
                          {/* Image */}
                          <div className="relative w-full sm:w-72 aspect-video sm:aspect-auto sm:h-48 shrink-0 overflow-hidden">
                            <Image
                              src={vehicle.images[0]}
                              alt={vehicle.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {vehicle.verified && (
                              <Badge className="absolute top-3 left-3 bg-lime-400 text-black text-xs gap-1">
                                <Check className="h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                            <div>
                              <p className="text-xs text-lime-400 font-medium mb-1">{vehicle.brand}</p>
                              <h3 className="font-semibold text-white text-xl group-hover:text-lime-400 transition-colors mb-2">
                                {vehicle.name}
                              </h3>
                              <p className="text-sm text-zinc-500 mb-3">
                                {vehicle.year} • {vehicle.mileage} • {vehicle.transmission} • {vehicle.fuelType}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {vehicle.features.slice(0, 3).map((feature) => (
                                  <Badge key={feature} variant="secondary" className="bg-zinc-800 text-zinc-400 text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <p className="text-2xl font-bold text-lime-400">{vehicle.formattedPrice}</p>
                              <Button
                                size="sm"
                                className="bg-lime-400 text-black hover:bg-lime-300"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
