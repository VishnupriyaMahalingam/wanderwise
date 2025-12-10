import { useRouter } from 'next/router'

export default function TripPlannerModal({ isOpen, onClose }) {
  const router = useRouter()

  if (!isOpen) return null

  const handleSelection = (region) => {
    onClose()
    router.push(`/region/${region}`)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8 text-white text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Plan Your Trip</h2>
              <p className="text-emerald-100 mt-2">Where would you like to explore?</p>
            </div>
            
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Options */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* India Option */}
              <button
                onClick={() => handleSelection('india')}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 p-6 text-white text-left hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:opacity-30 transition-opacity">
                  🇮🇳
                </div>
                <div className="relative z-10">
                  <span className="text-4xl mb-3 block">🇮🇳</span>
                  <h3 className="text-xl font-bold mb-1">Explore India</h3>
                  <p className="text-white/80 text-sm">Discover incredible destinations across the country</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                    <span>View destinations</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* International Option */}
              <button
                onClick={() => handleSelection('international')}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6 text-white text-left hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:opacity-30 transition-opacity">
                  🌍
                </div>
                <div className="relative z-10">
                  <span className="text-4xl mb-3 block">🌍</span>
                  <h3 className="text-xl font-bold mb-1">Go International</h3>
                  <p className="text-white/80 text-sm">Explore amazing places around the world</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                    <span>View destinations</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

            </div>

            {/* Popular destinations hint */}
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                ✨ Popular: Goa, Kerala, Bali, Dubai, Thailand
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

