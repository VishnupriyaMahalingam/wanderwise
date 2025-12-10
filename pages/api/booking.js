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

    // Create booking data
    const bookingData = {
      booking_id: bookingId,
      passenger_name: fullName,
      email: email,
      phone: phone,
      package_name: packageTitle,
      destination: destination,
      travel_date: travelDate,
      duration: packageDays || 1,
      travelers: travelers,
      total_amount: totalAmount,
      provider: packageProvider || 'WanderWise',
    }

    console.log('📦 New Booking Data:', JSON.stringify(bookingData, null, 2))

    // Save booking to Contentstack (this triggers Automation Hub)
    const contentstackResult = await saveBookingToContentstack(bookingData)
    
    console.log('📝 Contentstack Result:', JSON.stringify(contentstackResult, null, 2))

    return res.status(200).json({
      success: true,
      bookingId,
      message: 'Booking confirmed successfully',
      contentstackSaved: contentstackResult.success
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
  
  console.log('🔑 API Key exists:', !!apiKey)
  console.log('🔑 Management Token exists:', !!managementToken)
  console.log('🔑 Management Token (first 10 chars):', managementToken?.substring(0, 10))
  
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
  
  console.log('🌐 API Base URL:', apiBaseUrl)
  console.log('🌐 Region:', region)

  const entryData = {
    entry: {
      title: `Booking - ${bookingData.booking_id}`,
      booking_id: bookingData.booking_id,
      passenger_name: bookingData.passenger_name,
      email: bookingData.email,
      phone: bookingData.phone,
      package_name: bookingData.package_name,
      destination: bookingData.destination,
      travel_date: bookingData.travel_date,
      duration: String(bookingData.duration),
      travelers: String(bookingData.travelers),
      total_amount: String(bookingData.total_amount),
      provider: bookingData.provider,
    }
  }

  console.log('📤 Sending to Contentstack:', JSON.stringify(entryData, null, 2))

  try {
    const url = `${apiBaseUrl}/v3/content_types/bookings/entries?locale=en-us`
    console.log('🔗 Request URL:', url)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api_key': apiKey,
        'authorization': managementToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    })

    console.log('📥 Response Status:', response.status)
    
    const responseText = await response.text()
    console.log('📥 Response Body:', responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { message: responseText }
      }
      console.error('❌ Contentstack API error:', errorData)
      return { success: false, error: errorData }
    }

    const result = JSON.parse(responseText)
    console.log('✅ Entry created:', result.entry?.uid)

    // Auto-publish the entry to trigger Automation Hub
    if (result.entry?.uid) {
      await publishEntry(apiBaseUrl, apiKey, managementToken, result.entry.uid)
    }

    return { success: true, entry: result.entry }

  } catch (error) {
    console.error('❌ Error saving to Contentstack:', error.message)
    return { success: false, error: error.message }
  }
}

// Publish the entry to trigger Automation Hub
async function publishEntry(apiBaseUrl, apiKey, managementToken, entryUid) {
  try {
    const environment = process.env.CONTENTSTACK_ENVIRONMENT || 'development'
    console.log('📢 Publishing entry to environment:', environment)
    
    const response = await fetch(
      `${apiBaseUrl}/v3/content_types/bookings/entries/${entryUid}/publish`,
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

    const responseText = await response.text()
    console.log('📢 Publish Response:', response.status, responseText)

    if (response.ok) {
      console.log('✅ Entry published - Automation Hub will send email')
    } else {
      console.log('⚠️ Could not auto-publish')
    }
  } catch (error) {
    console.error('❌ Publish error:', error.message)
  }
}
