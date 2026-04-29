"use client"

import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { Volume2, VolumeX } from 'lucide-react'

const THUMBNAILS = [
  {
    src: '/images/customer-pickup-1.jpg',
    alt: 'Customer receiving their vehicle',
    caption: 'Customer receiving their vehicle',
  },
  {
    src: '/images/vehicle-inspection.jpg',
    alt: 'Vehicle inspection process',
    caption: 'Vehicle inspection process',
  },
  {
    src: '/images/customer-pickup-3.jpg',
    alt: 'Nationwide delivery service',
    caption: 'Nationwide delivery service',
  },
]

export default function ShowroomVideo() {
  const { ref, isInView } = useInView(0.1)
  const [muted, setMuted] = useState(true)

  return (
    <section
      id="showroom"
      ref={ref as any}
      className="relative z-2 bg-[#050505] py-20 md:py-[120px] px-6"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase">
            SEE THE SHOWROOM
          </h2>
          <p className="text-base text-[#a0a0a0] mt-2">
            Real cars. Real inspections. Real deliveries. No stock photos.
          </p>
        </div>

        {/* Video */}
        <div
          className={`relative aspect-video rounded-xl border border-[#222222] overflow-hidden transition-all duration-800 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <video
            autoPlay
            loop
            playsInline
            muted={muted}
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/images/cars/showroom-walkthrough.mp4" type="video/mp4" />
          </video>

          {/* Sound toggle */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-[rgba(5,5,5,0.7)] border border-[#333333] px-4 py-2.5 text-white text-sm hover:bg-[rgba(5,5,5,0.9)] transition-colors rounded"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {muted ? 'PLAY WITH SOUND' : 'MUTE'}
          </button>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {THUMBNAILS.map((thumb, index) => (
            <figure
              key={thumb.src}
              className={`rounded-lg overflow-hidden border border-[#222222] transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <img
                src={thumb.src}
                alt={thumb.alt}
                className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <figcaption className="px-3 py-2 text-sm text-zinc-400 bg-[#050505]">{thumb.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
