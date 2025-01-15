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
            <div className="max-w-md">
              <h2 className="text-3xl text-[#4E3E3B] font-medium mb-2">
                Book your free demo today!
              </h2>
              <p className="text-[#8A7F7C] text-2xl mb-8">
                Let The Waiter Company run with the recipe for success.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="restaurant" className="block text-sm text-[#4E3E3B] mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="restaurant"
                    required
                    placeholder="Enter restaurant name"
                    className="w-full px-3 py-2 border border-[#D4C3BE] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#B29792] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm text-[#4E3E3B] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    placeholder="Enter Location of your Restaurant"
                    className="w-full px-3 py-2 border border-[#D4C3BE] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#B29792] bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-[#4E3E3B] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Enter Name"
                      className="w-full px-3 py-2 border border-[#D4C3BE] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#B29792] bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-[#4E3E3B] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="Enter Phone Number"
                      className="w-full px-3 py-2 border border-[#D4C3BE] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#B29792] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-[#4E3E3B] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Enter Email ID"
                    className="w-full px-3 py-2 border border-[#D4C3BE] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#B29792] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#B29792] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#a08884] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            >
              <Image
                src="/form.gif"
                alt="Demo Animation"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

