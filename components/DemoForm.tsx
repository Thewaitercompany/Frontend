"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import emailjs from "@emailjs/browser";

const formVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID = "service_qi9an8i";
const EMAILJS_TEMPLATE_ID = "template_qcncunp";
const EMAILJS_PUBLIC_KEY = "c9-nLDwVSLi4__FGT";

export default function DemoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = {
        restaurant_name: form.restaurant.value,
        city: form.city.value,
        contact_name: (form.elements.namedItem("name") as HTMLInputElement).value,
        phone: form.phone.value,
        email: form.email.value,
      };

      console.log("Sending form data:", formData);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS Response:", result);

      if (result.status === 200) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

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
            className="md:flex-1"
          >
            <div className="max-w-xl mx-auto md:mx-0">
              <h2 className="text-[2rem] text-[#4E3E3B] font-medium mb-2">
                Book your free demo today!
              </h2>
              <p className="text-[#8A7F7C] text-lg italic mb-8">
                Let The Waiter Company call you with the recipe for success.
              </p>

              {/* Mobile GIF */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-[200px] mb-8 md:hidden"
              >
                <Image
                  src="/form.gif"
                  alt="Demo Animation"
                  fill
                  className="rounded-lg object-contain"
                  unoptimized
                />
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="restaurant"
                    className="block text-[#4E3E3B] mb-2"
                  >
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="restaurant"
                    name="restaurant"
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
                    name="city"
                    required
                    placeholder="Enter Location of your Restaurant"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#4E3E3B] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[#4E3E3B] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
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
                    name="email"
                    required
                    placeholder="Enter Email ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-[#4E3E3B] focus:outline-none focus:ring-1 focus:ring-[#B29792] focus:border-[#B29792] bg-white placeholder:text-[#8A7F7C] shadow-sm"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="text-green-600 font-medium">
                    Thank you! We&apos;ll contact you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="text-red-600 font-medium">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#B29792] text-white px-8 py-3 rounded-md font-medium hover:bg-[#a08884] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-32 text-center shadow-sm"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Desktop GIF */}
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
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
