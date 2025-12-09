// pages/api/booking.js
// Handles booking submission and saves to Contentstack for email automation

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      fullName,
      email,
      phone,
      travelers,
      travelDate,
      specialRequests,
      packageTitle,
      packagePrice,
      packageDays,
      packageProvider,
      destination,
      totalAmount,
    } = req.body

    // Generate a unique booking ID
    const bookingId = 'WW' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase()

    // Format the travel date
    const formattedDate = new Date(travelDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Create booking data
    const bookingData = {
      booking_id: bookingId,
      passenger_name: fullName,
      email: email,
      phone: phone,
      package_name: packageTitle,
      destination_name: destination,
      travel_date: travelDate,
      duration: packageDays || 1,
      travelers: travelers,
      total_amount: totalAmount,
      provider: packageProvider || 'WanderWise',
      special_requests: specialRequests || '',
      formatted_date: formattedDate,
    }

    // Log the booking
    console.log('📦 New Booking:', bookingData)

    // Save booking to Contentstack (this triggers Automation Hub)
    const contentstackResult = await saveBookingToContentstack(bookingData)
    
    if (contentstackResult.success) {
      console.log('✅ Booking saved to Contentstack - Email will be sent via Automation Hub')
    } else {
      console.log('⚠️ Could not save to Contentstack, but booking is still confirmed')
    }

    return res.status(200).json({
      success: true,
      bookingId,
      message: 'Booking confirmed successfully'
    })

  } catch (error) {
    console.error('Booking error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to process booking'
    })
  }
}

// Save booking to Contentstack using Management API
async function saveBookingToContentstack(bookingData) {
  const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY
  const managementToken = process.env.CONTENTSTACK_MANAGEMENT_TOKEN
  
  if (!apiKey || !managementToken) {
    console.log('⚠️ Contentstack credentials not configured for booking storage')
    return { success: false, error: 'Missing credentials' }
  }

  // Determine the correct API base URL based on region
  const region = process.env.CONTENTSTACK_REGION || 'us'
  let apiBaseUrl = 'https://api.contentstack.io'
  if (region === 'eu') {
    apiBaseUrl = 'https://eu-api.contentstack.com'
  } else if (region === 'azure-na') {
    apiBaseUrl = 'https://azure-na-api.contentstack.com'
  } else if (region === 'azure-eu') {
    apiBaseUrl = 'https://azure-eu-api.contentstack.com'
  }

  try {
    // Create entry in Contentstack
    const response = await fetch(
      `${apiBaseUrl}/v3/content_types/booking/entries?locale=en-us`,
      {
        method: 'POST',
        headers: {
          'api_key': apiKey,
          'authorization': managementToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entry: {
            title: `Booking - ${bookingData.booking_id}`,
            booking_id: bookingData.booking_id,
            passenger_name: bookingData.passenger_name,
            email: bookingData.email,
            phone: bookingData.phone,
            package_name: bookingData.package_name,
            destination_name: bookingData.destination_name,
            travel_date: bookingData.travel_date,
            duration: bookingData.duration,
            travelers: bookingData.travelers,
            total_amount: bookingData.total_amount,
            provider: bookingData.provider,
          }
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Contentstack API error:', errorData)
      return { success: false, error: errorData }
    }

    const result = await response.json()
    console.log('📝 Entry created in Contentstack:', result.entry?.uid)

    // Auto-publish the entry to trigger Automation Hub
    if (result.entry?.uid) {
      await publishEntry(apiBaseUrl, apiKey, managementToken, result.entry.uid)
    }

    return { success: true, entry: result.entry }

  } catch (error) {
    console.error('Error saving to Contentstack:', error)
    return { success: false, error: error.message }
  }
}

// Publish the entry to trigger Automation Hub
async function publishEntry(apiBaseUrl, apiKey, managementToken, entryUid) {
  try {
    const environment = process.env.CONTENTSTACK_ENVIRONMENT || 'development'
    
    const response = await fetch(
      `${apiBaseUrl}/v3/content_types/booking/entries/${entryUid}/publish`,
      {
        method: 'POST',
        headers: {
          'api_key': apiKey,
          'authorization': managementToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entry: {
            environments: [environment],
            locales: ['en-us']
          }
        }),
      }
    )

    if (response.ok) {
      console.log('✅ Entry published - Automation Hub will send email')
    } else {
      const errorData = await response.json()
      console.log('⚠️ Could not auto-publish:', errorData)
    }
  } catch (error) {
    console.error('Publish error:', error)
  }
}
