import { useState } from 'react'

export default function BookingModal({ isOpen, onClose, packageData, destination }) {
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation
  const [loading, setLoading] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingId, setBookingId] = useState('')
  
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    email: '',
    phone: '',
    travelers: 1,
    // Travel Details
    travelDate: '',
    specialRequests: '',
    // Payment Details
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number'
    if (!formData.travelDate) newErrors.travelDate = 'Travel date is required'
    if (formData.travelers < 1) newErrors.travelers = 'At least 1 traveler required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number'
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required'
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'Invalid CVV'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (loading) return // Prevent double submission
    
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      handleBooking()
    }
  }

  const handleBooking = async () => {
    if (loading) return // Prevent double submission
    setLoading(true)
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageTitle: packageData?.title,
          packagePrice: packageData?.price,
          packageDays: packageData?.days,
          packageProvider: packageData?.provider,
          destination: destination?.name,
          totalAmount: (packageData?.price || 0) * formData.travelers,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setBookingId(data.bookingId)
        setBookingComplete(true)
        setStep(3)
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      travelers: 1,
      travelDate: '',
      specialRequests: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    })
    setErrors({})
    setBookingComplete(false)
    setBookingId('')
    onClose()
  }

  const totalAmount = (packageData?.price || 0) * formData.travelers

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {step === 3 ? '🎉 Booking Confirmed!' : 'Book Your Trip'}
                </h2>
                <p className="text-emerald-100 text-sm mt-1">
                  {packageData?.title} • {destination?.name}
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress Steps */}
            {step < 3 && (
              <div className="flex items-center gap-2 mt-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${step >= 1 ? 'bg-white/20' : 'bg-white/10'}`}>
                  <span className="w-5 h-5 bg-white text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  Details
                </div>
                <div className="w-8 h-0.5 bg-white/30" />
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${step >= 2 ? 'bg-white/20' : 'bg-white/10'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-white text-emerald-600' : 'bg-white/30 text-white'}`}>2</span>
                  Payment
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            
            {/* Step 1: Personal & Travel Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.fullName ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.phone ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="9876543210"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Number of Travelers *</label>
                      <input
                        type="number"
                        name="travelers"
                        min="1"
                        max="20"
                        value={formData.travelers}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.travelers ? 'border-red-400' : 'border-slate-200'}`}
                      />
                      {errors.travelers && <p className="text-red-500 text-xs mt-1">{errors.travelers}</p>}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    Travel Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Travel Date *</label>
                      <input
                        type="date"
                        name="travelDate"
                        min={minDate}
                        value={formData.travelDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.travelDate ? 'border-red-400' : 'border-slate-200'}`}
                      />
                      {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Special Requests</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        placeholder="Any dietary requirements, accessibility needs, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </span>
                    Payment Information
                    <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Demo Mode</span>
                  </h3>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                    <p className="text-sm text-amber-800">
                      🔒 This is a demo payment form. No real transactions will be processed.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        maxLength={19}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.cardNumber ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Name on Card *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.cardName ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="JOHN DOE"
                      />
                      {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          maxLength={5}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.expiryDate ? 'border-red-400' : 'border-slate-200'}`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CVV *</label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          maxLength={4}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.cvv ? 'border-red-400' : 'border-slate-200'}`}
                          placeholder="•••"
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Booking Successful!</h3>
                <p className="text-slate-600 mb-6">
                  Your booking has been confirmed. A confirmation email has been sent to <span className="font-medium text-emerald-600">{formData.email}</span>
                </p>
                
                <div className="bg-slate-50 rounded-2xl p-6 text-left mb-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                    <span className="text-slate-500">Booking ID</span>
                    <span className="font-mono font-bold text-emerald-600">{bookingId}</span>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Package</span>
                      <span className="font-medium">{packageData?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Destination</span>
                      <span className="font-medium">{destination?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Travel Date</span>
                      <span className="font-medium">{new Date(formData.travelDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Travelers</span>
                      <span className="font-medium">{formData.travelers} {formData.travelers === 1 ? 'person' : 'people'}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Total Paid</span>
                      <span className="font-bold text-emerald-600 text-lg">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {step < 3 && (
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Amount</p>
                  <p className="text-2xl font-bold text-slate-800">₹{totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">{formData.travelers} × ₹{(packageData?.price || 0).toLocaleString()}</p>
                </div>
                
                <div className="flex gap-3">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : step === 1 ? (
                      <>
                        Continue to Payment
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Pay ₹{totalAmount.toLocaleString()}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

