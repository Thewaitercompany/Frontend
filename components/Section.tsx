'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'right'
  gifUrl?: string
}

export function Section({ children, className, align = 'left', gifUrl }: SectionProps) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'w-full transition-all duration-1000 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
          className
        )}
      >
        <div
          className={cn(
            'relative flex w-full items-center',
            align === 'left' ? 'justify-start' : 'justify-end'
          )}
        >
          <div
            className={cn(
              'w-[60%] bg-[#e6d7cf] p-8 md:p-12',
              align === 'left' ? 'rounded-r-3xl' : 'rounded-l-3xl'
            )}
          >
            {children}
          </div>
          {gifUrl && (
            <div
              className={cn(
                'absolute top-1/2 h-full w-[45%] -translate-y-1/2',
                align === 'left' ? 'right-0' : 'left-0'
              )}
            >
              <div className="relative h-full w-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={gifUrl} type="video/mp4" />
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

