'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FeaturePoint {
  title: string
  description: string
}

interface FeatureSectionProps {
  title: string
  points: FeaturePoint[]
  align?: 'left' | 'right'
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function FeatureSection({ 
  title, 
  points, 
  align = 'left',
  imageSrc,
  imageAlt,
  className
}: FeatureSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className={cn(
        'relative w-full transition-all duration-700 ease-out mb-8',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        align === 'left' ? 'pr-[40%]' : 'pl-[40%]',
        className
      )}
    >
      <div className="bg-[#e6d7cf] p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-medium text-[#5d4d41] mb-4">{title}</h3>
        <div className="space-y-3">
          {points.map((point, index) => (
            <div key={index} className="space-y-1">
              {point.title && (
                <h4 className="text-sm font-medium text-[#5d4d41]">{point.title}</h4>
              )}
              <p className="text-xs text-[#8c7569]">{point.description}</p>
            </div>
          ))}
        </div>
        {imageSrc && (
          <div className="absolute -left-24 top-1/2 -translate-y-1/2">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              width={200}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  )
}

