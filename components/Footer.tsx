'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/the-waiter-company', icon: Linkedin },
    { name: 'Instagram', href: 'https://www.instagram.com/thewaitercompany', icon: Instagram }
  ]

  const footerLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Help', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Disclaimer', href: '#' }
  ]

  return (
    <footer className="bg-[#EBCDB5] py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#B29792]/20">
            {/* Social Links */}
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-[#8A7F7C] hover:text-[#4E3E3B] transition-colors group"
                  >
                    <Icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                    <span>{link.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Footer Links */}
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-[#8A7F7C] hover:text-[#4E3E3B] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm text-[#8A7F7C]">
                <MapPin className="h-4 w-4 opacity-70" />
                RV College
              </p>
              <p className="flex items-center gap-2 text-sm text-[#8A7F7C]">
                <Phone className="h-4 w-4 opacity-70" />
                +91 8219058337
              </p>
              <p className="flex items-center gap-2 text-sm text-[#8A7F7C]">
                <Mail className="h-4 w-4 opacity-70" />
                email@gmail.com
              </p>
            </div>
          </div>

          {/* Logo and Copyright */}
          <div className="pt-8 flex flex-col items-center space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="The Waiter Company"
                width={150}
                height={120}
                className="opacity-100 hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-xs text-[#8A7F7C]">
              Copyright © 2024 • The Waiter Company
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

