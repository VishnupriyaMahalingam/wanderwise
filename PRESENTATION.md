# WanderWise - Presentation Content
## Travel Booking Web Application

---

# SLIDE 1: Title Slide

## 🌍 WanderWise
### Smart Journeys Start Here

**A Content-Driven Travel Booking Platform**

Built with Contentstack CMS & Next.js

Presented by: [Your Name]
Date: December 2024

---

# SLIDE 2: Project Overview

## What is WanderWise?

WanderWise is an **interactive travel booking web application** that allows users to:

✅ Explore tourist destinations across **India** and **International** locations

✅ Browse destinations by **region**

✅ View detailed information about each place

✅ Check available **tour packages** from different travel companies

✅ **Book trips** with automated email confirmations

✅ Receive **Slack notifications** for new packages

---

# SLIDE 3: Problem Statement

## Why WanderWise?

| Challenge | Solution |
|-----------|----------|
| Static travel websites | Dynamic content from CMS |
| Manual booking process | Automated booking with email |
| No real-time updates | Instant content updates via Contentstack |
| Poor content management | Structured CMS modeling |
| No team notifications | Slack integration via Automation Hub |

---

# SLIDE 4: Tools & Technologies

## Tech Stack Overview

### Frontend
| Tool | Purpose |
|------|---------|
| **Next.js 13** | React framework with SSG/ISR |
| **Tailwind CSS** | Utility-first CSS styling |
| **React Hooks** | State management |

### Backend / CMS
| Tool | Purpose |
|------|---------|
| **Contentstack** | Headless CMS for content |
| **REST API** | Content delivery |
| **Management API** | Booking creation |

### Hosting & Automation
| Tool | Purpose |
|------|---------|
| **Contentstack Launch** | Website hosting |
| **Automation Hub** | Email & Slack notifications |

---

# SLIDE 5: Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CONTENTSTACK LAUNCH                           │
│                   (Hosting Platform)                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     NEXT.JS APP                            │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐   │  │
│  │  │  Pages  │  │Components│  │   API   │  │    Lib      │   │  │
│  │  │ - Home  │  │ - Header │  │ Routes  │  │ -Contentstack│   │  │
│  │  │ - Region│  │ - Footer │  │-booking │  │    SDK      │   │  │
│  │  │ - Dest  │  │ - Cards  │  │         │  │             │   │  │
│  │  └─────────┘  └─────────┘  └────┬────┘  └──────┬──────┘   │  │
│  └──────────────────────────────────┼─────────────┼──────────┘  │
└─────────────────────────────────────┼─────────────┼─────────────┘
                                      │             │
                    ┌─────────────────┼─────────────┼─────────────┐
                    │                 ▼             ▼             │
                    │         CONTENTSTACK CMS                    │
                    │  ┌─────────────────────────────────────┐   │
                    │  │           CONTENT TYPES              │   │
                    │  │  ┌─────────┐ ┌───────────┐ ┌──────┐ │   │
                    │  │  │ Regions │ │Destinations│ │Packages│ │   │
                    │  │  └─────────┘ └───────────┘ └──────┘ │   │
                    │  │           ┌──────────┐               │   │
                    │  │           │ Bookings │               │   │
                    │  │           └────┬─────┘               │   │
                    │  └────────────────┼─────────────────────┘   │
                    │                   │                         │
                    │  ┌────────────────▼─────────────────────┐   │
                    │  │        AUTOMATION HUB                 │   │
                    │  │  ┌──────────────┐ ┌───────────────┐  │   │
                    │  │  │ Email Action │ │ Slack Action  │  │   │
                    │  │  └──────┬───────┘ └───────┬───────┘  │   │
                    │  └─────────┼─────────────────┼──────────┘   │
                    └────────────┼─────────────────┼──────────────┘
                                 ▼                 ▼
                    ┌────────────────┐   ┌─────────────────┐
                    │  USER EMAIL    │   │  SLACK CHANNEL  │
                    │ (Confirmation) │   │ (Notifications) │
                    └────────────────┘   └─────────────────┘
```

---

# SLIDE 6: Contentstack - Content Modeling

## Content Types Structure

### 1. Regions
```
├── Title (text) - "India", "International"
├── Slug (text) - "india", "international"
├── Description (text)
└── Image (file)
```

### 2. Destinations
```
├── Name (text) - "Goa", "Paris"
├── Slug (text) - "goa", "paris"
├── Region (reference) → Links to Region
├── Short Description (text)
├── Long Description (rich text)
├── Cover Image (file)
├── Best Time to Visit (text)
└── Approx Cost (number)
```

### 3. Packages
```
├── Title (text) - "Goa Beach Escape"
├── Destination (reference) → Links to Destination
├── Provider (text) - "Sunny Travels"
├── Days (number) - 4
├── Price (number) - 15000
└── Description (rich text)
```

### 4. Bookings
```
├── Booking ID (text)
├── Passenger Name (text)
├── Email (text)
├── Phone (text)
├── Package Name (text)
├── Travel Date (text)
├── Duration (text)
├── Travelers (text)
├── Total Amount (text)
└── Provider (text)
```

---

# SLIDE 7: Contentstack - Delivery API

## How Content is Fetched

### SDK Configuration
```javascript
import Contentstack from 'contentstack'

const Stack = Contentstack.Stack({
  api_key: 'blt67514bc8c0da24ed',
  delivery_token: 'cs1ae0bf08a396694f65a2852d',
  environment: 'development',
  region: 'us'
})
```

### Fetching Entries
```javascript
export async function getEntries(contentTypeUid) {
  const Query = Stack.ContentType(contentTypeUid).Query()
  Query.includeReference(['region', 'destination'])
  const result = await Query.toJSON().find()
  return result[0] || []
}
```

### API Endpoints Used
| Endpoint | Purpose |
|----------|---------|
| `/v3/content_types/{uid}/entries` | Fetch all entries |
| `Query.where()` | Filter entries |
| `Query.includeReference()` | Resolve references |

---

# SLIDE 8: Contentstack - Management API

## Booking Creation Flow

### When User Books:
1. Form data collected on frontend
2. API route `/api/booking` receives data
3. Management API creates entry in Contentstack
4. Entry is auto-published
5. Automation Hub triggers email

### Management API Call
```javascript
const response = await fetch(
  'https://api.contentstack.io/v3/content_types/bookings/entries',
  {
    method: 'POST',
    headers: {
      'api_key': API_KEY,
      'authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entry: bookingData })
  }
)
```

---

# SLIDE 9: Contentstack - Automation Hub

## Automated Workflows

### Trigger: Entry Published (Bookings)
↓
### Action 1: Send Email
- **To:** `{{entry.email}}`
- **Subject:** Booking Confirmed - {{entry.booking_id}}
- **Body:** HTML template with booking details

### Action 2: Slack Notification
- **Channel:** #travel-alerts
- **Message:** New booking received!

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   TRIGGER   │────▶│   ACTION    │────▶│   OUTPUT    │
│  Entry      │     │  Send Email │     │  Customer   │
│  Published  │     │  + Slack    │     │  Notified   │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

# SLIDE 10: Contentstack Launch

## Hosting & Deployment

### Features Used:
✅ **Git Integration** - Connected to GitHub repository
✅ **Auto Deploy** - Triggers on git push
✅ **Environment Variables** - Secure credential storage
✅ **CDN** - Global content delivery
✅ **SSL** - Secure HTTPS

### Environment Variables Configured:
```
NEXT_PUBLIC_CONTENTSTACK_API_KEY
CONTENTSTACK_DELIVERY_TOKEN
CONTENTSTACK_MANAGEMENT_TOKEN
CONTENTSTACK_ENVIRONMENT
CONTENTSTACK_REGION
```

### Deployment URL:
**https://wanderwise.contentstackapps.com**

---

# SLIDE 11: Key Features

## Website Features

| Feature | Description |
|---------|-------------|
| 🏠 **Homepage** | Hero section, featured destinations, CTAs |
| 🗺️ **Region Pages** | India & International destination listings |
| 📍 **Destination Details** | Full info, images, available packages |
| 📦 **Package Cards** | Provider, duration, price, book button |
| 🎫 **Booking System** | Multi-step form with validation |
| 📧 **Email Confirmation** | Automated via Automation Hub |
| 🔔 **Slack Alerts** | Team notifications for new packages |
| 📱 **Responsive Design** | Mobile-first approach |
| 🔍 **Navigation Dropdowns** | Quick access to destinations |

---

# SLIDE 12: User Journey

## Booking Flow

```
1. USER visits homepage
        ↓
2. Clicks "Plan Your Trip"
        ↓
3. Selects India/International
        ↓
4. Browses destinations
        ↓
5. Views destination details
        ↓
6. Clicks "Book Now" on package
        ↓
7. Fills booking form
   - Personal details
   - Travel date
   - Payment info
        ↓
8. Submits booking
        ↓
9. SYSTEM creates entry in Contentstack
        ↓
10. AUTOMATION HUB sends email
        ↓
11. USER receives confirmation
```

---

# SLIDE 13: Screenshots

## Application Screenshots

### 1. Homepage
- Hero section with CTA buttons
- Stats section
- Featured destinations grid
- Plan your trip popup

### 2. Region Page
- Destination cards
- Filter options
- Region-specific styling

### 3. Destination Page
- Cover image hero
- About section
- Available packages
- Quick facts sidebar

### 4. Booking Modal
- Step 1: Personal details
- Step 2: Payment
- Step 3: Confirmation

### 5. Email Confirmation
- Beautiful HTML template
- All booking details
- Booking ID

---

# SLIDE 14: Technical Highlights

## Best Practices Implemented

### Performance
- ✅ Static Site Generation (SSG)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Image optimization
- ✅ Code splitting

### Security
- ✅ Environment variables for secrets
- ✅ Server-side API calls
- ✅ Input validation
- ✅ HTTPS only

### UX/UI
- ✅ Responsive design
- ✅ Loading states
- ✅ Form validation
- ✅ Smooth animations
- ✅ Accessible components

---

# SLIDE 15: Contentstack Benefits

## Why Contentstack?

| Benefit | Description |
|---------|-------------|
| **Headless CMS** | Decouple content from presentation |
| **API-First** | RESTful APIs for flexibility |
| **Content Modeling** | Structured, reusable content types |
| **Multi-Channel** | Same content, multiple platforms |
| **Automation Hub** | No-code workflow automation |
| **Launch** | One-click deployment |
| **Scalability** | Enterprise-grade infrastructure |
| **Real-time Preview** | See changes before publishing |

---

# SLIDE 16: Future Enhancements

## Roadmap

### Phase 2
- 🔐 User authentication & profiles
- 💳 Real payment gateway (Razorpay/Stripe)
- ⭐ Reviews & ratings system
- 🔍 Advanced search & filters

### Phase 3
- 📱 Mobile app (React Native)
- 🤖 AI-powered recommendations
- 💬 Live chat support
- 📊 Analytics dashboard

### Phase 4
- 🌐 Multi-language support
- 💱 Multi-currency pricing
- 🎯 Personalization engine

---

# SLIDE 17: Demo

## Live Demonstration

### Demo Scenarios:

1. **Browse Destinations**
   - Navigate to India/International
   - Show dropdown menus
   - View destination details

2. **Book a Package**
   - Select Goa Beach Escape
   - Fill booking form
   - Complete payment
   - Show confirmation

3. **Show Contentstack**
   - Content types
   - Entries created
   - Automation Hub logs

4. **Show Email Received**
   - Booking confirmation email
   - Formatted template

---

# SLIDE 18: Summary

## Project Summary

### ✅ Achieved Goals:
- Dynamic content-driven website
- Seamless CMS integration
- Automated booking workflow
- Email notifications
- Slack alerts
- Modern responsive UI

### 🛠️ Technologies Mastered:
- Contentstack CMS
- Next.js
- Tailwind CSS
- REST APIs
- Automation Hub
- Contentstack Launch

### 📈 Business Value:
- Faster content updates
- Reduced manual work
- Better user experience
- Scalable architecture

---

# SLIDE 19: Q&A

## Questions?

### Resources:

📚 **Contentstack Docs:** https://www.contentstack.com/docs

💻 **GitHub Repo:** https://github.com/VishnupriyaMahalingam/wanderwise

🌐 **Live Site:** https://wanderwise.contentstackapps.com

---

# SLIDE 20: Thank You

## 🌍 WanderWise
### Smart Journeys Start Here

**Thank you for your attention!**

---

**Contact:**
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: VishnupriyaMahalingam

---

# APPENDIX: Additional Slides

## API Response Examples

### Destination Response:
```json
{
  "uid": "dest_goa",
  "name": "Goa",
  "slug": "goa",
  "short_description": "Beaches and nightlife",
  "best_time": "November to February",
  "approx_cost": 30000,
  "region": [{ "uid": "reg_india", "title": "India" }]
}
```

### Booking Response:
```json
{
  "notice": "Entry created successfully.",
  "entry": {
    "uid": "blt48e821172afa1142",
    "booking_id": "WWMIZSGZWG2FGO",
    "passenger_name": "John Doe",
    "email": "john@example.com",
    "total_amount": "120000"
  }
}
```

---

## Color Palette Used

| Color | Hex | Usage |
|-------|-----|-------|
| Emerald | #059669 | Primary brand |
| Teal | #0d9488 | Gradients |
| Amber | #f59e0b | Accents, CTAs |
| Orange | #f97316 | Highlights |
| Slate | #1e293b | Text, footer |

---

## Folder Structure

```
wanderwise/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── DestinationCard.js
│   ├── PackageCard.js
│   ├── BookingModal.js
│   └── TripPlannerModal.js
├── pages/
│   ├── index.js
│   ├── _app.js
│   ├── api/booking.js
│   ├── destination/[slug].js
│   └── region/[slug].js
├── lib/
│   └── contentstack.js
├── styles/
│   └── globals.css
├── cms-schema/
│   ├── regions.json
│   ├── destinations.json
│   ├── packages.json
│   └── sample-entries.json
└── automation/
    └── contentstack-automation.json
```

