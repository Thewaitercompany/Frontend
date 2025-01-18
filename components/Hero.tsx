'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="bg-[#F1EEE6] pt-16 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-2xl lg:text-5xl text-[#4E3E3B] font-normal leading-tight mb-6 italic font-aleo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Delivering innovative solutions to empower your cafe business!
              </motion.h1>
              <motion.p 
                className="text-[#B29792] text-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                The Waiter Company is a platform where with our simple solution, every manual process in a cafe is just a finger touch away.
              </motion.p>
            </div>
            <motion.h2 
              className="font-serif text-6xl text-[#B29792] opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Kitchen ke bahar hum dekhlenge!
            </motion.h2>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative justify-end right-0 w-full max-w-[800px] lg:-right-100">
              <Image
                src="/mockup.png"
                alt="Platform mockup on laptop and phone"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} /> 
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

