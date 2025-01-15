'use client'

import { motion } from 'framer-motion'

const backgroundImages = [
  { src: '/beetroot.png', left: '5%', top: '10%' },
  { src: '/freedhaniya.png', right: '10%', top: '20%' },
  { src: '/garlic.png', left: '15%', top: '40%' },
  { src: '/leaf.png', right: '5%', top: '60%' },
  { src: '/mushroom.png', left: '10%', top: '70%' },
  { src: '/sweet ishan.png', right: '15%', top: '80%' },
  { src: '/Tomato.png', left: '20%', top: '90%' },
]

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <motion.div 
          key={image.src}
          className="absolute w-32 h-32 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${image.src})`,
            ...image,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        />
      ))}
    </div>
  )
}

