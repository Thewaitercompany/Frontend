"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-[#F1EEE6] py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between lg:gap-8">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4 md:space-y-8">
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-5xl text-[#4E3E3B] leading-[1.2] font-normal italic font-Roboto"
                style={{ fontFamily: "Roboto" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Delivering innovative solutions to empower your cafe business!
              </motion.h1>
              <motion.p
                className="text-[#B29792] text-lg sm:text-2xl lg:text-3xl leading-relaxed font-light font-aleo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                The Waiter Company is a platform where with our simple solution,
                every manual process in a cafe is just a finger touch away.
              </motion.p>
            </div>
            <motion.h2
              className="text-2xl sm:text-4xl lg:text-6xl text-[#9D848080] opacity-60 italic leading-tight mt-8 md:mt-16 font-light font-aleo"
              style={{ fontFamily: "aleo" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Kitchen ke bahar hum dekhlenge!
            </motion.h2>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-[500px] mx-auto lg:max-w-[800px] lg:-right-20">
              <Image
                src="/mockup.png"
                alt="Platform mockup on laptop and phone"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
