'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 py-3 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <Container>
        <div className="flex justify-between items-center max-w-full">
          <Link href="/" className="retro-button !p-3 w-12 h-12 flex items-center justify-center">
            <Image
              src="/ms-logo.svg"
              alt="MS Logo"
              width={24}
              height={24}
              className="dark:invert"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="retro-button"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button
            className="md:hidden retro-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 retro-card">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
} 