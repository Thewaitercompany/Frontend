'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const formVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function DemoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <section className="py-16 bg-[#ffffff]" id="demo">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <h2 className="text-[2rem] text-[#4E3E3B] font-medium mb-2">
                Book your free demo today!
              </h2>
              <p className="text-[#8A7F7C] text-lg italic mb-8">
                Let The Waiter Company call you with the recipe for success.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="restaurant" className="block text-[#4E3E3B] mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="restaurant"
                    required
                    placeholder="Enter restaurant name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-[#4E3E3B] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    placeholder="Enter Location of your Restaurant"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#4E3E3B] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[#4E3E3B] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#4E3E3B] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Enter Email ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#B29792] text-white px-8 py-3 rounded-md font-medium hover:bg-[#a08884] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-32 text-center shadow-sm"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* GIF Space */}
          <div className="hidden md:flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-[200px] h-[200px]"
            >
              <Image
                src="/form.gif"
                alt="Demo Animation"
                fill
                className="rounded-lg object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

