'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeatureItem {
  title: string
  description: string
}

interface Feature {
  title: string
  items: FeatureItem[]
  media?: {
    type: 'image' | 'gif' | 'video'
    src: string
  }
}

const features: Feature[] = [
  {
    title: "Transform Customer Experience",
    items: [
      {
        title: "Instant Ordering",
        description: "QR menu for quick, independent orders."
      },
      {
        title: "Always Connected",
        description: "Manage dining experiences remotely via the cloud."
      }
    ],
    media: {
      type: 'image',
      src: "/ph2.png"
    }
  },
  {
    title: "Streamline Operations",
    items: [
      {
        title: "Live Inventory",
        description: "Real-time stock tracking, no spreadsheets."
      },
      {
        title: "Seamless Automation",
        description: "Orders to suppliers, all in one flow."
      },
      {
        title: "Error-Free Performance",
        description: "Minimize delays and human mistakes."
      }
    ],
    media: {
      type: 'gif',
      src: "/streamline operations.gif"
    }
  },
  {
    title: "Maximize Profits",
    items: [
      {
        title: "Smart Reordering",
        description: "Avoid stockouts and overordering with automated inventory updates."
      },
      {
        title: "Waste Reduction",
        description: "Align supplies with demand to cut costs and minimize waste."
      },
      {
        title: "Built to Scale",
        description: "Easily scale from a single cafe to a multi-location enterprise with TWC's flexible solutions."
      }
    ],
    media: {
      type: 'gif',
      src: "/maximise profits.gif"
    }
  },
  {
    title: "Simplify Setup",
    items: [
      {
        title: "Quick Onboarding",
        description: "Get started fast with TWC's intuitive interface, reducing training time."
      },
      {
        title: "24/7 Expert Support",
        description: "Enjoy round-the-clock assistance to maximize system benefits."
      }
    ],
    media: {
      type: 'gif',
      src: "/simplify setup.gif"
    }
  },
  {
    title: "Dependable & Secure",
    items: [
      {
        title: "Robust Security",
        description: "Protect your data and operations with enhanced safeguards."
      },
      {
        title: "Focus on Excellence",
        description: "Free your team from backend logistics to prioritize exceptional food and service."
      }
    ],
    media: {
      type: 'gif',
      src: "/dependable and secure.gif"
    }
  }
]

const backgroundImages = [
  { src: '/beetroot.png', left: '5%', top: '25%' },
  { src: '/freedhaniya.png', right: '10%', top: '1%' },
  { src: '/garlic.png', right: '15%', top: '45%' },
  { src: '/mushroom.png', left: '5%', top: '63%' },
  { src: '/Tomato.png', right: '10%', top: '80%' },
  { src: '/sweet ishan.png', right: '15%', top: '80%' },
  { src: '/leaf.png', right: '80%', top: '90%' },
]

function MediaContent({ media }: { media: Feature['media'] }) {
  if (!media) return null;

  switch (media.type) {
    case 'image':
      return (
        <Image
          src={media.src || "/placeholder.svg"}
          alt="Feature illustration"
          width={150}
          height={75}
          className="object-contain md:max-w-[150px] md:max-h-[400px] "
        />
      )
    case 'gif':
      return (
        <Image
          src={media.src || "/placeholder.svg"}
          alt="Feature illustration"
          width={250}
          height={250}
          className="w-full h-auto object-contain md:max-w-[250px]"
          unoptimized={media.type === 'gif'}
        />
      )
    case 'video':
      return (
        <video
          src={media.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-contain md:max-w-[250px]"
        />
      )
    default:
      return null
  }
}

function FeatureContent({ title, items }: { title: string; items: FeatureItem[] }) {
  return (
    <>
      <h3 className="text-2xl font-medium text-[#4E3E3B] mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx}>
            <h4 className="text-base font-medium text-[#4E3E3B]">{item.title}</h4>
            <p className="text-base text-[#8A7F7C] italic">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function FeatureCard({ title, items, media, index }: Feature & { index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className={`w-full max-w-[900px] ${isEven ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-[#F8F5F1] rounded-lg p-6 md:p-8 relative shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className={`w-full md:w-2/5 ${isEven ? 'md:order-first' : 'md:order-last'} ${index % 2 === 0 ? 'order-first' : 'order-last'}`}>
            {media && <MediaContent media={media} />}
          </div>
          <div className="w-full md:w-3/5">
            <FeatureContent title={title} items={items} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="pt-4 pb-8 md:pt-8 md:pb-16 relative overflow-hidden bg-[#F1EEE6]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-4 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
         <h2 className="text-2xl md:text-3xl font-normal mb-4 md:mb-8 text-[#B39793] transition-colors text-center">
            Why Choose <span className="text-black transition-colors">The Waiter Company</span> (TWC)?
          </h2>
        </motion.div>
        
        <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {backgroundImages.map((image, index) => (
          <motion.div 
            key={image.src}
            className="absolute w-32 h-32 md:w-40 md:h-40"
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              ...image,
            }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
      </div>
    </section>
  )
}

