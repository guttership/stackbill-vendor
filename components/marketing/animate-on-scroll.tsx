'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: 'slide-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'scale-bounce'
  delay?: number
  className?: string
}

export function AnimateOnScroll({ 
  children, 
  animation = 'slide-up', 
  delay = 0,
  className = '' 
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ajouter l'animation après le délai
            setTimeout(() => {
              element.classList.add(`animate-${animation}`)
              element.style.opacity = '1'
            }, delay)
            
            // Optionnel: arrêter d'observer après l'animation
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1, // Trigger quand 10% visible
        rootMargin: '0px 0px -50px 0px' // Déclenche un peu avant d'arriver en bas
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [animation, delay])

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  )
}
