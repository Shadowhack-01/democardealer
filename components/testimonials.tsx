"use client"

import { useInView } from "@/hooks/useInView"

interface Testimonial {
  name: string
  location: string
  quote: string
  car: string
  date: string
  image: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Chinedu O.',
    location: 'Lagos',
    quote:
      'I was skeptical buying a car online, but Naija Car Shop Ltd. sent me a full video inspection and delivered to my office in Ikoyi. 5 stars.',
    car: 'Mercedes C300',
    date: 'March 2025',
    image: '/images/testimonial-portrait-1.jpg',
  },
  {
    name: 'Amara K.',
    location: 'Abuja',
    quote:
      'The payment plan made it possible. I put down 30% and drove my Lexus home the same week.',
    car: 'Lexus RX 350',
    date: 'February 2025',
    image: '/images/testimonial-portrait-2.jpg',
  },
  {
    name: 'Tunde B.',
    location: 'Port Harcourt',
    quote:
      "Third car I've bought from Naija Car Shop Ltd. Every single one has been clean title, verified history. These guys don't play.",
    car: 'Toyota Prado',
    date: 'January 2025',
    image: '/images/testimonial-portrait-3.jpg',
  },
]

export default function Testimonials() {
  const { ref, isInView } = useInView(0.1)

  return (
    <section ref={ref as any} className="relative z-2 bg-[#0a0a0a] py-20 md:py-[120px] px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="text-base text-[#a0a0a0] mt-2">Verified buyers. Real stories.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.name}
              className={`bg-[#111111] border border-[#222222] rounded-lg p-6 transition-all duration-600 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Customer info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-[15px] font-semibold text-white">{t.name}</h4>
                  <p className="text-[13px] text-[#666666]">{t.location}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-[15px] text-[#a0a0a0] leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>

              {/* Car info */}
              <p className="font-mono text-xs text-[#ccff00] uppercase mt-4 tracking-wide">
                {t.car} — {t.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
