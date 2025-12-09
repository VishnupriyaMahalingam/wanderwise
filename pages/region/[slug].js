import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DestinationCard from '../../components/DestinationCard'
import { getEntries } from '../../lib/contentstack'

export default function RegionPage({ region, destinations }) {
  if (!region) {
    return (
      <>
        <Header />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Region Not Found</h1>
            <p className="text-slate-500 mb-6">The region you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className="text-emerald-600 font-semibold hover:text-emerald-700">
              ← Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const isIndia = region.slug === 'india'
  const emoji = isIndia ? '🇮🇳' : '🌍'

  return (
    <>
      <Head>
        <title>{region.title} Destinations | WanderWise</title>
        <meta name="description" content={region.description} />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400 rounded-full filter blur-3xl"></div>
          </div>
          
          {/* Large Emoji Background */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[200px] opacity-10">
            {emoji}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{emoji}</span>
              <h1 className="text-4xl md:text-5xl font-extrabold">
                {region.title}
              </h1>
            </div>
            
            <p className="text-xl text-white/80 max-w-2xl">
              {region.description || `Discover amazing destinations in ${region.title}.`}
            </p>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">{destinations.length}</div>
                  <div className="text-white/70 text-sm">Destinations</div>
                </div>
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

        {/* Destinations Grid */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            {destinations && destinations.length > 0 ? (
              <>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      All {region.title} Destinations
                    </h2>
                    <p className="text-slate-500 mt-1">
                      {destinations.length} amazing {destinations.length === 1 ? 'place' : 'places'} to explore
                    </p>
                  </div>
                  
                  {/* Filter/Sort Options - Placeholder */}
                  <div className="flex items-center gap-3">
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option>Sort by: Popular</option>
                      <option>Sort by: Price (Low to High)</option>
                      <option>Sort by: Price (High to Low)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {destinations.map((d, index) => (
                    <div 
                      key={d.uid} 
                      className={`animate-fade-in-up stagger-${(index % 6) + 1}`}
                      style={{ opacity: 0 }}
                    >
                      <DestinationCard destination={d} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  No Destinations Yet
                </h3>
                <p className="text-slate-500 max-w-md mx-auto mb-6">
                  We&apos;re working on adding amazing destinations for {region.title}. 
                  Check back soon!
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Other Region CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4">
                {isIndia ? 'Want to explore beyond borders?' : 'Discover the beauty of India too!'}
              </h2>
              <p className="text-emerald-800/80 mb-6 max-w-xl mx-auto">
                {isIndia 
                  ? 'Check out our international destinations and plan your dream world tour.'
                  : 'India offers incredible diversity - from beaches to mountains, temples to wildlife.'}
              </p>
              <Link 
                href={isIndia ? '/region/international' : '/region/india'}
                className="inline-flex items-center gap-2 bg-emerald-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-colors"
              >
                <span>{isIndia ? '🌍' : '🇮🇳'}</span>
                Explore {isIndia ? 'International' : 'India'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const res = await getEntries('region')
  const regions = (res && Array.isArray(res)) ? res : []
  const paths = regions.map(r => ({ params: { slug: r.slug } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const regionRes = await getEntries('region')
  const allRegions = (regionRes && Array.isArray(regionRes)) ? regionRes : []
  const region = allRegions.find(r => r.slug === params.slug) || null
  
  const destRes = await getEntries('destination')
  const allDest = (destRes && Array.isArray(destRes)) ? destRes : []
  const destinations = region 
    ? allDest.filter(d => d.region && d.region[0] && d.region[0].uid === region.uid)
    : []
  
  return { 
    props: { region, destinations }, 
    revalidate: 60 
  }
}
