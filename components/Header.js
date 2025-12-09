import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Wander<span className="text-amber-400">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">
              Home
            </Link>
            <Link href="/region/india" className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">
              🇮🇳 India
            </Link>
            <Link href="/region/international" className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium">
              🌍 International
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-emerald-900 px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5">
              Plan Your Trip
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              Home
            </Link>
            <Link href="/region/india" className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              🇮🇳 India
            </Link>
            <Link href="/region/international" className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              🌍 International
            </Link>
            <button className="w-full mt-2 bg-gradient-to-r from-amber-400 to-orange-500 text-emerald-900 px-5 py-2.5 rounded-xl font-semibold">
              Plan Your Trip
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
