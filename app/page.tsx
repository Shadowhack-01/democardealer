"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, MessageCircle, Menu, X } from "lucide-react"
import { BrandShowcase } from "@/components/brand-showcase"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { FeaturedVehicles } from "@/components/featured-vehicle"
import { BrandMarquee } from "@/components/brand-marquee"
import CityGridBackground from "@/components/city-grid-background"
import ShowroomVideo from "@/components/showroom-video"
import Testimonials from "@/components/testimonials"
import ContactLocation from "@/components/contact-location"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bgReady, setBgReady] = useState(false)
  const [showHero, setShowHero] = useState(false)

  // When the background signals it's ready, delay showing the hero slightly
  useEffect(() => {
    if (!bgReady) {
      setShowHero(false)
      return
    }
    const t = setTimeout(() => setShowHero(true), 500)
    return () => clearTimeout(t)
  }, [bgReady])
  const WHATSAPP_LINK = "https://wa.me/2349099710000"

  const navLinks = [
    { href: "#inventory", label: "Inventory" },
    { href: "#why-us", label: "Why Us" },
    { href: "#showroom", label: "Showroom" },
    { href: "#contact", label: "Contact" },
  ]

        return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                NAIJA CAR SHOP<span className="text-lime-400">.</span>
              </span>
              <span className="text-xs text-zinc-500 hidden sm:block">LTD.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-400 hover:text-lime-400 transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Button
                className="hidden md:flex bg-lime-400 text-black font-semibold hover:bg-lime-300"
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat on WhatsApp
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0 }}
          className="lg:hidden overflow-hidden bg-zinc-900"
        >
          <nav className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-zinc-400 hover:text-lime-400 transition-colors uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="w-full bg-lime-400 text-black font-semibold hover:bg-lime-300 mt-4"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </nav>
        </motion.div>
      </motion.header>

      <main className="pt-20">

        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background (Three.js) */}
          <CityGridBackground onReady={() => setBgReady(true)} />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              background:
                'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.7) 60%, #050505 100%)',
            }}
          />

          {/* Content (sized/placed per provided snippet) */}
          {showHero && (
            <div className="relative z-2 max-w-225 mx-auto px-6 text-center pt-20 pb-16">
            {/* Badge row */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {["PAY IN INSTALLMENTS", "VERIFIED VEHICLES ONLY", "DELIVERY NATIONWIDE"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 border border-[#333333] bg-[rgba(26,26,26,0.6)] px-3.5 py-1.5 text-[11px] uppercase text-[#a0a0a0] tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                    {badge}
                  </span>
                )
              )}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading font-extrabold text-5xl md:text-7xl uppercase leading-[1.05] tracking-[-0.02em] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span className={`block transition-all duration-800`} style={{ transitionDelay: '400ms' }}>
                OWN LUXURY.
              </span>
              <span
                className={`block text-[#ccff00] transition-all duration-800`}
                style={{ transitionDelay: '550ms' }}
              >
                DRIVE AUTHORITY.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-5 text-lg text-[#a0a0a0] max-w-140 mx-auto leading-relaxed"
            >
              Premium cars in Nigeria with verified history, flexible payment options,
              and nationwide delivery.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            >
              <a
                href="/inventory"
                className="bg-[#ccff00] text-[#050505] px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#b8e600] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(204,255,0,0.25)] transition-all duration-200"
              >
                VIEW AVAILABLE CARS
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#ccff00] text-[#ccff00] bg-transparent px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[rgba(204,255,0,0.1)] transition-all duration-200"
              >
                CHAT ON WHATSAPP
              </a>
            </motion.div>
            </div>
          )}

          {/* Scroll indicator */}
          {showHero && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex items-start justify-center p-2">
                <motion.div
                  className="w-1.5 h-1.5 bg-lime-400 rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </section>

        {/* Brand Marquee */}
        <BrandMarquee />

        {/* Featured Vehicles with 3D effect */}
        <FeaturedVehicles />

        {/* Browse by Brand */}
        <BrandShowcase />

        {/* Vehicle Gallery */}
        <VehicleGallery />

        {/* Why Choose Us */}
        <section id="why-us" className="py-20 px-4 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-lime-400/20 to-transparent" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/images/cars/mercedes-benz.jpg"
                />
                {/* Fallback image if video doesn&apos;t load */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Why Choose <span className="text-lime-400">Naija Car Shop</span>
                </h2>
                <p className="text-zinc-400 mb-8">
                  We don&apos;t just sell cars. We deliver confidence.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Verified & Accident-Free Cars",
                      description: "Every vehicle undergoes a 150-point inspection with full history report.",
                    },
                    {
                      title: "Direct Import — No Middlemen",
                      description: "We import directly from the US, UK, and UAE. No hidden brokers. No inflated prices.",
                    },
                    {
                      title: "Flexible Payment Plans",
                      description: "Spread your payment across 3-12 months. Zero collateral options available.",
                    },
                    {
                      title: "Nationwide Delivery",
                      description: "From Lagos to Abuja, Port Harcourt to Kano — we deliver to your doorstep.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0 w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-lime-400 rounded-full" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-zinc-500 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Showroom Video */}
        <ShowroomVideo />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact Location */}
        <ContactLocation />

        {/* CTA Banner */}
        <section className="py-16 px-4 bg-lime-400">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-black mb-4"
            >
              Limited Stock Available
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-black/70 mb-8"
            >
              Prices change based on dollar rate. Secure your vehicle today before the next forex adjustment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-black text-lime-400 font-bold text-lg px-8 py-6 hover:bg-zinc-900"
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              >
                Reserve Now on WhatsApp
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-4 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold text-white">
                  NAIJA CAR SHOP<span className="text-lime-400">.</span>
                </span>
              </Link>
              <p className="text-zinc-500 text-sm">
                Premium vehicles. Verified quality. Trusted delivery.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-2">
                {["Inventory", "Showroom", "Contact"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-zinc-500 hover:text-lime-400 transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-2">
                {["Vehicle Sourcing", "Import Assistance", "Delivery", "Trade-In"].map((service) => (
                  <li key={service}>
                    <Link href="#" className="text-zinc-500 hover:text-lime-400 transition-colors text-sm">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li>8B Mobolaji Bank Anthony Way, beside AfriGlobal, Opebi</li>
                <li>Ikeja 100271, Lagos</li>
                <li><a href="tel:+2349099710000" className="text-lime-400">0909 971 0000</a></li>
              </ul>
            </div>
          </div>

              <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
                © {new Date().getFullYear()} NAIJA CAR SHOP. All rights reserved.
              </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.open(WHATSAPP_LINK, "_blank")}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </motion.button>

      
    </div>
  )
}
