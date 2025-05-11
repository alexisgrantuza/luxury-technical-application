"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { smoothScroll } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    smoothScroll(e, targetId);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100 shadow-md backdrop-blur-sm py-4"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 relative" ref={menuRef}>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold">
            <Image
              src="/brandname.webp"
              alt="Marci Metzger"
              width={150}
              height={150}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className={`hover:text-blue-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              HOME
            </a>
            <a
              href="#properties"
              onClick={(e) => handleNavClick(e, "properties")}
              className={`hover:text-blue-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              LISTINGS
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
              className={`hover:text-blue-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              LET&apos;S MOVE
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, "gallery")}
              className={`hover:text-blue-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              ABOUT US
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 ${
                isMenuOpen
                  ? "text-gray-800"
                  : isScrolled
                  ? "text-gray-800"
                  : "text-white"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-gray-100  mt-4 py-4 rounded-lg">
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "about")}
                className="text-gray-800 hover:text-blue-500 transition-colors py-2 text-lg"
              >
                HOME
              </a>
              <a
                href="#properties"
                onClick={(e) => handleNavClick(e, "properties")}
                className="text-gray-800 hover:text-blue-500 transition-colors py-2 text-lg"
              >
                LISTINGS
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "services")}
                className="text-gray-800 hover:text-blue-500 transition-colors py-2 text-lg"
              >
                LET&apos;S MOVE
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, "gallery")}
                className="text-gray-800 hover:text-blue-500 transition-colors py-2 text-lg"
              >
                ABOUT US
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
