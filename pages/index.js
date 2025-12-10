import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DestinationCard from '../components/DestinationCard'
import TripPlannerModal from '../components/TripPlannerModal'
import { getEntries } from '../lib/contentstack'

export default function Home({ regions, destinations }) {
  const [tripPlannerOpen, setTripPlannerOpen] = useState(false)

  return (
    <>
      <Head>
        <title>WanderWise | Smart Journeys Start Here</title>
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                Discover 100+ Amazing Destinations
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Smart Journeys<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                  Start Here
                </span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
                Explore breathtaking destinations across India and around the world. 
                Find the perfect travel packages tailored to your dream vacation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/region/india"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-emerald-900 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-1"
                >
                  <span>🇮🇳</span> Explore India
                </Link>
                <Link 
                  href="/region/international"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  <span>🌍</span> Go International
                </Link>
              </div>
            </div>
          </div>

          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#f8fafc"/>
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-lg p-8 -mt-20 relative z-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-emerald-600">100+</div>
                  <div className="text-slate-500 text-sm mt-1">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-emerald-600">50+</div>
                  <div className="text-slate-500 text-sm mt-1">Tour Packages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-emerald-600">10K+</div>
                  <div className="text-slate-500 text-sm mt-1">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-emerald-600">4.9</div>
                  <div className="text-slate-500 text-sm mt-1">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regions Section */}
        {regions && regions.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
                  Choose Your Adventure
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Whether you&apos;re looking for domestic getaways or international escapades, 
                  we&apos;ve got you covered.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {regions.map((region) => (
                  <Link 
                    key={region.uid} 
                    href={`/region/${region.slug}`}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute -right-10 -bottom-10 text-9xl opacity-20 group-hover:opacity-30 transition-opacity">
                      {region.slug === 'india' ? '🇮🇳' : '🌍'}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-2">{region.title}</h3>
                      <p className="text-white/80 mb-4">{region.description}</p>
                      <span className="inline-flex items-center gap-2 text-amber-300 font-medium group-hover:gap-3 transition-all">
                        Explore destinations
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Destinations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
                  Featured Destinations
                </h2>
                <p className="text-slate-500">
                  Handpicked places waiting to be explored
                </p>
              </div>
              <Link 
                href="/region/india"
                className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2"
              >
                View all destinations
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {destinations && destinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((d, index) => (
                  <div key={d.uid} className={`animate-fade-in-up stagger-${index + 1}`} style={{ opacity: 0 }}>
                    <DestinationCard destination={d} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-3xl">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No destinations yet</h3>
                <p className="text-slate-500">
                  Add some destinations in your Contentstack CMS to see them here.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-emerald-800/80 text-lg mb-8 max-w-2xl mx-auto">
              Let us help you plan the perfect trip. Browse our destinations, 
              compare packages, and book your dream vacation today.
            </p>
            <button 
              onClick={() => setTripPlannerOpen(true)}
              className="bg-emerald-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all"
            >
              Start Planning Now
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Trip Planner Modal */}
      <TripPlannerModal 
        isOpen={tripPlannerOpen} 
        onClose={() => setTripPlannerOpen(false)} 
      />
    </>
  )
}

export async function getStaticProps() {
  const regionsRes = await getEntries('region')
  const destRes = await getEntries('destination')
  const regions = (regionsRes && Array.isArray(regionsRes)) ? regionsRes : []
  const destinations = (destRes && Array.isArray(destRes)) ? destRes : []
  return { props: { regions, destinations }, revalidate: 60 }
}
