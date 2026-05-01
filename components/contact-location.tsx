'use client'

import { useInView } from '../hooks/useInView'
import { Phone, MessageCircle, Clock, MapPin } from 'lucide-react'

export default function ContactLocation() {
  const { ref, isInView } = useInView(0.15)

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-[2] bg-[#050505] py-20 md:py-[120px] px-6"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase">
            VISIT OUR SHOWROOM
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Contact info + Map */}
          <div
            className={`transition-all duration-[600ms] ${
              isInView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ccff00] mt-0.5 flex-shrink-0" />
                <p className="text-[#a0a0a0]">
                  8B Mobolaji Bank Anthony Way, beside AfriGlobal, Opebi, Ikeja 100271, Lagos
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#ccff00] flex-shrink-0" />
                <a
                  href="tel:+2349099710000"
                  className="text-white font-semibold hover:text-[#ccff00] transition-colors"
                >
                  +234 909 971 0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#ccff00] flex-shrink-0" />
                <a
                  href="https://wa.me/2349099710000?text=Hi, I'm interested in visiting your showroom."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ccff00] font-semibold hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#ccff00] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#666666]">
                  MON–SAT: 9AM – 6PM | SUN: BY APPOINTMENT
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 rounded-lg overflow-hidden border border-[#222222]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.547!2d3.370961!3d6.605764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8a7a7a7a7a7d%3A0x5c5c5c5c5c5c5c5c!2s8B%20Mobolaji%20Bank%20Anthony%20Way%2C%20Opebi%2C%20Ikeja%20100271%2C%20Lagos!5e0!3m2!1sen!2sng!4v1640000000000"
                width="100%"
                height="280"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Naija Car Shop Showroom Location - 8B Mobolaji Bank Anthony Way, Opebi, Ikeja"
              />
            </div>
          </div>

          {/* Right: Showroom photo */}
          <div
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <img
              src="/images/cars/mercedes-benz.jpg"
              alt="Naija Car Shop Showroom Exterior"
              className="w-full h-full object-cover rounded-lg min-h-[400px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
