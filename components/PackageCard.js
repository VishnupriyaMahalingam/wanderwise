export default function PackageCard({ pkg, onBookNow }) {
  // Clean up description - remove HTML tags and decode entities
  const cleanDescription = (text) => {
    if (!text) return ''
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim()
  }

  const description = cleanDescription(pkg.description)

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-bold text-white text-lg">{pkg.title}</h4>
            <p className="text-white/80 text-sm mt-1">by {pkg.provider}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <span className="text-white font-bold text-lg">{pkg.days}</span>
            <span className="text-white/80 text-xs block">Days</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            All Inclusive
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Hotel Stay
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Best Value
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed">
          {description 
            ? (description.length > 120 ? description.substring(0, 120) + '...' : description)
            : 'Experience an unforgettable journey with our carefully curated travel package.'
          }
        </p>

        {/* Price & CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Price per person</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-800">₹{pkg.price?.toLocaleString()}</span>
              <span className="text-slate-400 text-sm">onwards</span>
            </div>
          </div>
          
          <button 
            onClick={() => onBookNow && onBookNow(pkg)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            Book Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
