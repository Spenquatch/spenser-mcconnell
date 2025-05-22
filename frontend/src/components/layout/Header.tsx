'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            SpenserMcConnell
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Home
          </Link>
          <Link href="/projects" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Projects
          </Link>
          <Link href="/updates" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Updates
          </Link>
          <Link href="/an-ai-a-day" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            AI A Day
          </Link>
          <Link href="/resources" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Resources
          </Link>
          <Link href="/press-kit" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Press
          </Link>
          <Link href="/booking" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Booking
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="/updates" 
              className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Updates
            </Link>
            <Link 
              href="/an-ai-a-day" 
              className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              AI A Day
            </Link>
            <Link 
              href="/resources" 
              className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              href="/press-kit" 
              className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Press
            </Link>
            <Link 
              href="/booking" 
              className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Booking
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
