'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

interface HeroSlideshowProps {
  images: string[]
}

export function HeroSlideshow({ images }: HeroSlideshowProps) {
  const slides = useMemo(() => (images.length > 0 ? images : ['/images/image.webp']), [images])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 3500)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [slides.length])

  return (
    <div className="glass-card relative overflow-hidden p-2 md:p-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#ece8e3]">
        {slides.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="StackBill product preview"
            fill
            className={`object-cover object-center transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index === 0}
            quality={72}
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
          />
        ))}

      </div>

      <p className="mt-3 text-center text-sm text-[#676060]">Clean interface. Built for developers.</p>

      {slides.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-[color:var(--brand-accent)]' : 'bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
