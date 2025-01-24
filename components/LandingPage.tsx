'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import Footer from './Footer'
import '../styles/animations.css'
import '../styles/gradients.css'
import { ArrowUp } from 'lucide-react'
import { aleo, roboto } from '../app/fonts'
import Header from './Header'

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const features = [
    { icon: "/clock.png", title: "Effortless Order Processing", content: "Reduce wait times with QR code-based digital ordering. Customers can access menus instantly, place orders independently, and enjoy a seamless dining experience. Enhance efficiency and keep your customers satisfied without manual interventions." },
    { icon: "/checkbox.png", title: "Real-Time Inventory Control", content: "Stay on top of your stock with real-time tracking linked to kitchen operations. Each order automatically updates ingredient levels, helping you manage supplies efficiently and trigger timely reorders—no spreadsheets required." },
    { icon: "/boxes.png", title: "Eliminate Stockouts and Waste", content: "Ensure optimal stock levels with automated reordering. Avoid shortages during peak hours, prevent over-ordering, and minimize food waste by aligning supplies with actual demand." },
    { icon: "/utensils.png", title: "Focus on Culinary Excellence", content: "Free your team from operational hassles and focus on delivering great food. TWC manages backend operations so you can craft exceptional culinary experiences without distractions." },
    { icon: "/automation.png", title: "End-to-End Automation", content: "Achieve seamless operations from order placement to supplier delivery with TWC's integrated system. Our automation simplifies every part of your restaurant management cycle, reducing workload and eliminating bottlenecks." },
    { icon: "/chefhat.png", title: "Tailored Solutions for Growth", content: "Our solutions scale effortlessly with your business. Whether you're running a single café or expanding into multiple locations, TWC grows alongside you, ensuring smooth operations at every stage." },
    { icon: "/check.png", title: "Reduce Errors & Delays", content: "Say goodbye to manual stock updates and operational delays. TWC's automated system minimizes human errors, ensuring consistent performance, even during peak hours." },
    { icon: "/shield.png", title: "Reliable and Secure", content: "Protect your business with TWC's robust security framework. Our platform ensures your operations run smoothly and your data stays safe at all times." },
    { icon: "/bolt.png", title: "Quick Setup and Training", content: "Get started quickly with TWC's intuitive system. Minimize staff training time and maximize productivity from day one." },
    { icon: "/globe.png", title: "Accessible Anytime, Anywhere", content: "Stay connected and in control on the go. Manage your operations remotely with TWC's cloud-based platform—accessible from any device, anytime." },
    { icon: "/call.png", title: "24x7 Expert Support", content: "Our dedicated support team is available round the clock to help you get the most out of TWC. We are passionate about your success." }
  ];

  return (
    <div className={`min-h-screen bg-[#F5F1EB] text-[#4A3F35] font-serif ${aleo.variable} ${roboto.variable}`}>
      <header className="fixed w-full top-0 z-50 bg-[#F5F1EB] shadow-sm">
        <Header />
      </header>
      <main className="container mx-auto px-6 pt-32 pb-12">
        <div className="flex flex-col lg:flex-row items-center mb-20">
          {/* Left content section */}
          <div className="lg:w-1/2 lg:pr-12 animate-slideInFromLeft">
            <h1 className="text-2xl lg:text-5xl text-[#B39793] font-normal leading-tight mb-6 italic font-aleo">
              Delivering innovative solutions to empower your cafe business!
            </h1>
            <p className="text-lg mb-8 font-roboto">
              The Waiter Company is a platform where with our simple solution, every manual process in a cafe is just a finger touch away. 
            </p>
            <p className="text-6xl font-heavy italic font-roboto">
              Kitchen ke bahar hum dekhlenge!
            </p>
          </div>
          
          {/* Device mockup section */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="relative justify-end right-0 w-full max-w-[800px] lg:-right-40">
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
          </div>
        </div>

        <section className="mt-20 animate-fadeIn">
          <h2 className="text-3xl font-normal mb-16 text-[#B39793] transition-colors text-center">
            
            Why Choose <span className="text-black transition-colors">The Waiter Company</span> (TWC)?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`animate-slideInFromBottom animate-delay-${(index % 5 + 1) * 100} group`}
              >
                <div className="flex flex-col space-y-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: "contain"
                      }} />
                  </div>
                  <h3 className="text-xl font-medium text-[#4A3F35]">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B5D52] leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      {showScrollTop && (
      <button
        title="Scroll to top"
        className="fixed bottom-8 right-8 bg-secondary text-primary p-3 rounded-full shadow-lg hover:bg-highlight transition-colors duration-300 animate-fadeIn"
        onClick={scrollToTop}
      >
         <ArrowUp size={24} />
      </button>
      )}
    </div>
  );
}

