import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PackageCard from '../../components/PackageCard'
import BookingModal from '../../components/BookingModal'
import { getEntries } from '../../lib/contentstack'

// Helper function to render rich text content
function RichText({ content }) {
  if (!content) return null
  
  // If it's already HTML, render it safely
  // Clean up common issues
  const cleanHtml = content
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
  
  return (
    <div 
      className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-800"
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  )
}

export default function DestinationPage({ destination, packages }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg)
    setIsBookingOpen(true)
  }

  const handleBookTrip = () => {
    // If there's only one package, select it automatically
    if (packages && packages.length === 1) {
      setSelectedPackage(packages[0])
    } else if (packages && packages.length > 0) {
      setSelectedPackage(packages[0])
    }
    setIsBookingOpen(true)
  }

  if (!destination) {
    return (
      <>
        <Header />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Destination Not Found</h1>
            <p className="text-slate-500 mb-6">The destination you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className="text-emerald-600 font-semibold hover:text-emerald-700">
              ← Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{destination.name} | WanderWise</title>
        <meta name="description" content={destination.short_description} />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {destination.cover_image ? (
            <img 
              src={destination.cover_image.url} 
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Link 
                href={destination.region && destination.region[0] ? `/region/${destination.region[0].slug || 'india'}` : '/'}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to destinations
              </Link>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                {destination.name}
              </h1>
              
              <div className="flex flex-wrap gap-4">
                {destination.best_time && (
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                    </svg>
                    Best time: {destination.best_time}
                  </div>
                )}
                {destination.approx_cost && (
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Starting ₹{destination.approx_cost.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* About */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    About {destination.name}
                  </h2>
                  
                  {destination.short_description && (
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      {destination.short_description}
                    </p>
                  )}
                  
                  {destination.long_description ? (
                    <RichText content={destination.long_description} />
                  ) : (
                    <p className="text-slate-500">
                      Discover the beauty and charm of {destination.name}. This destination offers 
                      unforgettable experiences and memories that will last a lifetime.
                    </p>
                  )}
                </div>

                {/* Packages */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    Available Packages
                  </h2>
                  
                  {packages && packages.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {packages.map(p => (
                        <PackageCard 
                          key={p.uid} 
                          pkg={p} 
                          onBookNow={handleBookNow}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl">
                      <div className="text-4xl mb-3">📦</div>
                      <p className="text-slate-500">
                        No packages available for this destination yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Quick Facts */}
                <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 sticky top-24">
                  <h3 className="font-bold text-lg text-slate-800 mb-4">Quick Facts</h3>
                  
                  <div className="space-y-4">
                    {destination.best_time && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Best Time to Visit</p>
                          <p className="font-semibold text-slate-800">{destination.best_time}</p>
                        </div>
                      </div>
                    )}
                    
                    {destination.approx_cost && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Approximate Cost</p>
                          <p className="font-semibold text-slate-800">₹{destination.approx_cost.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Packages Available</p>
                        <p className="font-semibold text-slate-800">{packages?.length || 0} options</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <button 
                      onClick={handleBookTrip}
                      disabled={!packages || packages.length === 0}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Book Your Trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false)
          setSelectedPackage(null)
        }}
        packageData={selectedPackage}
        destination={destination}
      />
    </>
  )
}

export async function getStaticPaths() {
  const res = await getEntries('destination')
  const dests = (res && Array.isArray(res)) ? res : []
  const paths = dests.map(d => ({ params: { slug: d.slug } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const destRes = await getEntries('destination')
  const allDests = (destRes && Array.isArray(destRes)) ? destRes : []
  const destination = allDests.find(d => d.slug === params.slug) || null
  
  const pkgRes = await getEntries('package')
  const packages = (pkgRes && Array.isArray(pkgRes)) ? pkgRes : []
  const packagesForDestination = destination 
    ? packages.filter(p => p.destination && p.destination[0] && p.destination[0].uid === destination.uid)
    : []
  
  return { 
    props: { destination, packages: packagesForDestination }, 
    revalidate: 60 
  }
}
