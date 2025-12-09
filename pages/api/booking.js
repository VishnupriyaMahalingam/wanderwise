// pages/api/booking.js
// Handles booking submission and sends confirmation email
import nodemailer from 'nodemailer'

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

    // Calculate end date
    const endDate = new Date(travelDate)
    endDate.setDate(endDate.getDate() + (packageDays || 1) - 1)
    const formattedEndDate = endDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Create booking record (in a real app, save to database)
    const booking = {
      bookingId,
      fullName,
      email,
      phone,
      travelers,
      travelDate,
      formattedDate,
      formattedEndDate,
      specialRequests,
      packageTitle,
      packagePrice,
      packageDays,
      packageProvider,
      destination,
      totalAmount,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    }

    // Log the booking (in production, save to database)
    console.log('📦 New Booking Created:', booking)

    // Send confirmation email
    const emailSent = await sendConfirmationEmail(booking)
    
    if (emailSent) {
      console.log('📧 Confirmation email sent to:', email)
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

// Email sending function using Nodemailer
async function sendConfirmationEmail(booking) {
  const {
    bookingId,
    fullName,
    email,
    phone,
    travelers,
    formattedDate,
    formattedEndDate,
    packageTitle,
    packageDays,
    packageProvider,
    destination,
    totalAmount,
    specialRequests
  } = booking

  // HTML Email Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - WanderWise</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🌍 WanderWise</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Adventure Awaits!</p>
        </div>
        
        <!-- Success Banner -->
        <div style="background: #ecfdf5; padding: 20px; text-align: center; border-bottom: 1px solid #d1fae5;">
          <div style="width: 60px; height: 60px; background: #10b981; border-radius: 50%; margin: 0 auto 15px; line-height: 60px;">
            <span style="color: white; font-size: 30px;">✓</span>
          </div>
          <h2 style="color: #065f46; margin: 0;">Booking Confirmed!</h2>
          <p style="color: #047857; margin: 10px 0 0 0;">Thank you for booking with WanderWise</p>
        </div>
        
        <!-- Main Content -->
        <div style="background: white; padding: 30px;">
          
          <!-- Booking ID -->
          <div style="background: #f8fafc; padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
            <p style="color: #64748b; margin: 0 0 5px 0; font-size: 14px;">Booking Reference</p>
            <p style="color: #0f172a; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">${bookingId}</p>
          </div>
          
          <!-- Trip Details -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
              📦 Trip Details
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Package</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${packageTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Destination</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${destination}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Duration</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${packageDays} Days</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Tour Operator</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${packageProvider}</td>
              </tr>
            </table>
          </div>
          
          <!-- Travel Dates -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
              📅 Travel Dates
            </h3>
            <table style="width: 100%; background: #f8fafc; border-radius: 12px;">
              <tr>
                <td style="padding: 15px; text-align: center; border-right: 1px solid #e2e8f0; width: 50%;">
                  <p style="color: #64748b; margin: 0 0 5px 0; font-size: 12px;">CHECK-IN</p>
                  <p style="color: #0f172a; margin: 0; font-weight: 600;">${formattedDate}</p>
                </td>
                <td style="padding: 15px; text-align: center; width: 50%;">
                  <p style="color: #64748b; margin: 0 0 5px 0; font-size: 12px;">CHECK-OUT</p>
                  <p style="color: #0f172a; margin: 0; font-weight: 600;">${formattedEndDate}</p>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Traveler Info -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
              👤 Traveler Information
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Name</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Phone</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Travelers</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">${travelers} ${travelers === 1 ? 'Person' : 'People'}</td>
              </tr>
              ${specialRequests ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Special Requests</td>
                <td style="padding: 8px 0; color: #0f172a; text-align: right;">${specialRequests}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <!-- Payment Summary -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px;">
            <h3 style="color: #92400e; margin: 0 0 15px 0;">💰 Payment Summary</h3>
            <table style="width: 100%;">
              <tr>
                <td style="color: #92400e;">Total Amount Paid</td>
                <td style="color: #92400e; font-size: 28px; font-weight: bold; text-align: right;">₹${totalAmount.toLocaleString()}</td>
              </tr>
            </table>
            <p style="color: #a16207; margin: 10px 0 0 0; font-size: 12px;">✓ Payment received successfully</p>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="background: #1e293b; padding: 25px; border-radius: 0 0 16px 16px; text-align: center;">
          <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 14px;">
            Need help? Contact us at <a href="mailto:support@wanderwise.com" style="color: #38bdf8;">support@wanderwise.com</a>
          </p>
          <p style="color: #64748b; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} WanderWise. All rights reserved.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `

  // Plain text version for email clients that don't support HTML
  const textContent = `
WanderWise - Booking Confirmation

Booking ID: ${bookingId}

Trip Details:
- Package: ${packageTitle}
- Destination: ${destination}
- Duration: ${packageDays} Days
- Tour Operator: ${packageProvider}

Travel Dates:
- Check-in: ${formattedDate}
- Check-out: ${formattedEndDate}

Traveler Information:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Travelers: ${travelers}
${specialRequests ? `- Special Requests: ${specialRequests}` : ''}

Payment:
- Total Amount Paid: ₹${totalAmount.toLocaleString()}

Thank you for booking with WanderWise!
  `

  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️ Email credentials not configured. Skipping email send.')
      console.log('📧 Email would be sent to:', email)
      console.log('📧 Subject: WanderWise Booking Confirmation -', bookingId)
      return true // Return true so booking still succeeds
    }

    // Create transporter using Gmail SMTP (or any SMTP service)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    })

    // Alternative: Use custom SMTP
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: true,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // })

    // Send the email
    const info = await transporter.sendMail({
      from: `"WanderWise" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎉 Your WanderWise Booking Confirmation - ${bookingId}`,
      text: textContent,
      html: htmlContent,
    })

    console.log('📧 Email sent successfully:', info.messageId)
    return true

  } catch (error) {
    console.error('📧 Email sending failed:', error.message)
    // Don't throw - booking is still successful even if email fails
    return false
  }
}
