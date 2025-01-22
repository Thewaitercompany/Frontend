"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/the-waiter-company",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/thewaitercompany",
      icon: Instagram,
    },
  ];

  const footerLinks = [
    { name: "About Us", href: "#" },
    { name: "Help", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Disclaimer", href: "#" },
  ];

  return (
    <footer className="bg-[#EBCDB5] py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top border line */}
          <div className="border-t border-[#B29792]/20 mb-8" />

          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Social Links */}
            <div className="space-y-4 text-center md:text-left">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 text-base text-[#4E3E3B] hover:text-[#8A7F7C] transition-colors group md:justify-start justify-center"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-serif">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Footer Links */}
            <div className="space-y-4 text-center md:text-left">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-base text-[#4E3E3B] hover:text-[#8A7F7C] transition-colors font-serif"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-center md:text-left">
              <p className="flex items-center gap-3 text-base text-[#4E3E3B] md:justify-start justify-center">
                <MapPin className="h-5 w-5" />
                <span className="font-serif">RV College</span>
              </p>
              <p className="flex items-center gap-3 text-base text-[#4E3E3B] md:justify-start justify-center">
                <Phone className="h-5 w-5" />
                <span className="font-serif">+91 8219058337</span>
              </p>
              <p className="flex items-center gap-3 text-base text-[#4E3E3B] md:justify-start justify-center">
                <Mail className="h-5 w-5" />
                <span className="font-serif">email@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Logo and Copyright */}
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="The Waiter Company"
                width={160}
                height={50}
                className="opacity-90"
              />
            </Link>
            <p className="text-sm text-[#4E3E3B] font-serif">
              Copyright © 2024 • the Waiter Company
            </p>
          </div>

          {/* Bottom border line */}
          <div className="border-b border-[#B29792]/20 mt-8" />
        </div>
      </div>
    </footer>
  );
}
