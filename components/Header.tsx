"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import LoginDialog from "./LoginDialog";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 py-4"
        style={{
          background: "linear-gradient(to right, #B29792, #F1EEE6)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Waiter Company"
              width={200}
              height={100}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={scrollToFeatures}
              className="text-[#4E3E3B] hover:text-[#8A7F7C] transition-colors"
            >
              About Us
            </button>
            <Link
              href="mailto:founder@thewaitercompany.in"
              target="_blank"
              className="text-[#4E3E3B] hover:text-[#8A7F7C] transition-colors"
            >
              Contact Us
            </Link>
            <LoginDialog />
            <Link
              href="#demo"
              className="bg-[#B29792] text-white px-6 py-2 rounded hover:bg-[#a08884] transition-colors"
            >
              Book A Demo
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-[#4E3E3B] hover:opacity-80 transition-opacity"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-0 bg-[#F8F5F1] py-6 px-4 shadow-lg"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#4E3E3B] hover:opacity-80 transition-opacity"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-6">
              <button
                onClick={() => {
                  scrollToFeatures();
                  setIsOpen(false);
                }}
                className="text-[#4E3E3B] text-lg hover:opacity-80 transition-opacity"
              >
                About Us
              </button>
              <Link
                href="mailto:founder@thewaitercompany.in"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="text-[#4E3E3B] text-lg hover:opacity-80 transition-opacity"
              >
                Contact Us
              </Link>
              <LoginDialog />
              <Link
                href="#demo"
                onClick={() => setIsOpen(false)}
                className="bg-[#B29792] text-white px-8 py-2 rounded text-lg hover:bg-[#a08884] transition-colors"
              >
                Book A Demo
              </Link>
            </nav>
          </motion.div>
        </div>
      )}
    </>
  );
}
