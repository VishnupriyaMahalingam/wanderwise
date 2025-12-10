import Link from 'next/link'
import { useState, useEffect } from 'react'
import TripPlannerModal from './TripPlannerModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tripPlannerOpen, setTripPlannerOpen] = useState(false)
  const [indiaDropdown, setIndiaDropdown] = useState(false)
  const [intlDropdown, setIntlDropdown] = useState(false)
  const [mobileIndiaOpen, setMobileIndiaOpen] = useState(false)
  const [mobileIntlOpen, setMobileIntlOpen] = useState(false)

  // Sample destinations - in production, fetch from Contentstack
  const indiaDestinations = [
    { name: 'Goa', slug: 'goa', emoji: '🏖️' },
    { name: 'Kerala', slug: 'kerala', emoji: '🌴' },
    { name: 'Rajasthan', slug: 'rajasthan', emoji: '🏰' },
    { name: 'Himachal Pradesh', slug: 'himachal-pradesh', emoji: '🏔️' },
    { name: 'Ladakh', slug: 'ladakh', emoji: '🗻' },
    { name: 'Andaman', slug: 'andaman', emoji: '🏝️' },
  ]

  const intlDestinations = [
    { name: 'Paris', slug: 'paris', emoji: '🗼' },
    { name: 'Bali', slug: 'bali', emoji: '🌺' },
    { name: 'Dubai', slug: 'dubai', emoji: '🌆' },
    { name: 'Singapore', slug: 'singapore', emoji: '🦁' },
    { name: 'Thailand', slug: 'thailand', emoji: '🛕' },
    { name: 'Maldives', slug: 'maldives', emoji: '🐚' },
  ]

  return (
    <>
      <header className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 sticky top-0 z-40 shadow-lg">
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
              
              {/* India Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIndiaDropdown(true)}
                onMouseLeave={() => setIndiaDropdown(false)}
              >
                <button className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium flex items-center gap-1">
                  🇮🇳 India
                  <svg className={`w-4 h-4 transition-transform ${indiaDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* India Dropdown Menu */}
                {indiaDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl py-2 z-50 animate-fade-in-up border border-slate-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <Link 
                        href="/region/india" 
                        className="text-emerald-600 font-semibold text-sm hover:text-emerald-700 flex items-center gap-2"
                      >
                        View All India Destinations →
                      </Link>
                    </div>
                    {indiaDestinations.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/destination/${dest.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 transition-colors"
                      >
                        <span className="text-lg">{dest.emoji}</span>
                        <span className="text-slate-700 font-medium">{dest.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* International Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIntlDropdown(true)}
                onMouseLeave={() => setIntlDropdown(false)}
              >
                <button className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium flex items-center gap-1">
                  🌍 International
                  <svg className={`w-4 h-4 transition-transform ${intlDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* International Dropdown Menu */}
                {intlDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl py-2 z-50 animate-fade-in-up border border-slate-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <Link 
                        href="/region/international" 
                        className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-2"
                      >
                        View All International →
                      </Link>
                    </div>
                    {intlDestinations.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/destination/${dest.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-lg">{dest.emoji}</span>
                        <span className="text-slate-700 font-medium">{dest.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => setTripPlannerOpen(true)}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-emerald-900 px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5"
              >
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
            <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-1">
              <Link href="/" className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                Home
              </Link>
              
              {/* Mobile India Accordion */}
              <div>
                <button 
                  onClick={() => setMobileIndiaOpen(!mobileIndiaOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <span>🇮🇳 India</span>
                  <svg className={`w-4 h-4 transition-transform ${mobileIndiaOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileIndiaOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-amber-400/30 pl-4">
                    <Link href="/region/india" className="block px-3 py-2 text-amber-300 text-sm font-medium">
                      View All →
                    </Link>
                    {indiaDestinations.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/destination/${dest.slug}`}
                        className="block px-3 py-2 text-white/70 hover:text-white text-sm"
                      >
                        {dest.emoji} {dest.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile International Accordion */}
              <div>
                <button 
                  onClick={() => setMobileIntlOpen(!mobileIntlOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <span>🌍 International</span>
                  <svg className={`w-4 h-4 transition-transform ${mobileIntlOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileIntlOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-400/30 pl-4">
                    <Link href="/region/international" className="block px-3 py-2 text-blue-300 text-sm font-medium">
                      View All →
                    </Link>
                    {intlDestinations.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/destination/${dest.slug}`}
                        className="block px-3 py-2 text-white/70 hover:text-white text-sm"
                      >
                        {dest.emoji} {dest.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false)
                  setTripPlannerOpen(true)
                }}
                className="w-full mt-3 bg-gradient-to-r from-amber-400 to-orange-500 text-emerald-900 px-5 py-2.5 rounded-xl font-semibold"
              >
                Plan Your Trip
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Trip Planner Modal */}
      <TripPlannerModal 
        isOpen={tripPlannerOpen} 
        onClose={() => setTripPlannerOpen(false)} 
      />
    </>
  )
}
