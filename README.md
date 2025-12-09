# 🌍 WanderWise

**Smart Journeys Start Here** — An interactive travel destination explorer built with Next.js and Contentstack CMS.

![WanderWise](https://img.shields.io/badge/Next.js-13-black?style=flat-square&logo=next.js)
![Contentstack](https://img.shields.io/badge/CMS-Contentstack-purple?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🗺️ **Explore Destinations** — Browse tourist destinations across India and International locations
- 📦 **Tour Packages** — View available tour packages from different travel companies
- 🔍 **Filter by Region** — Easy navigation between India and International destinations
- 🎨 **Beautiful UI** — Modern, responsive design with smooth animations
- ⚡ **Fast Performance** — Static site generation with incremental regeneration
- 🔄 **Live Preview** — Contentstack webhook integration for preview mode

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- A [Contentstack](https://www.contentstack.com/) account with a stack set up

### 1. Clone & Install

```bash
cd wanderwise
npm install
```

### 2. Set up Contentstack

Create the following content types in your Contentstack stack using the schemas in `/cms-schema/`:

| Content Type | File |
|--------------|------|
| Regions | `cms-schema/regions.json` |
| Destinations | `cms-schema/destinations.json` |
| Packages | `cms-schema/packages.json` |

Sample entries are provided in `cms-schema/sample-entries.json`.

### 3. Configure Environment Variables

Copy the example env file and add your Contentstack credentials:

```bash
cp env.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_stack_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=development
CONTENTSTACK_REGION=us
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
wanderwise/
├── components/          # React components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Site footer
│   ├── DestinationCard.js  # Destination card component
│   └── PackageCard.js  # Package card component
├── lib/
│   └── contentstack.js # Contentstack SDK configuration
├── pages/
│   ├── index.js        # Homepage
│   ├── destination/[slug].js  # Destination detail page
│   ├── region/[slug].js       # Region listing page
│   └── api/preview.js  # Preview webhook endpoint
├── cms-schema/         # Contentstack content type schemas
├── styles/
│   └── globals.css     # Global styles with Tailwind
└── automation/         # Automation Hub configurations
```

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 13** | React framework with SSG/ISR |
| **Contentstack** | Headless CMS for content management |
| **Tailwind CSS** | Utility-first CSS framework |
| **Contentstack Launch** | Hosting platform |
| **Automation Hub** | Slack notifications on publish |

## 🔧 CMS Content Types

### Regions
- Title, Slug, Description, Image
- Example: "India", "International"

### Destinations
- Name, Slug, Region (reference), Description
- Cover Image, Gallery, Best Time to Visit, Approx Cost
- Example: "Goa", "Paris", "Bali"

### Packages
- Title, Slug, Destination (reference)
- Provider, Days, Price, Description
- Example: "Goa Beach Escape - 4 Days"

## 🔄 Preview Mode

To enable preview mode for unpublished content:

1. Set `PREVIEW_SECRET_TOKEN` in your `.env.local`
2. Configure a webhook in Contentstack pointing to `/api/preview`
3. See `PREVIEW_INSTRUCTIONS.md` for detailed setup

## 🚀 Deployment

### Contentstack Launch

1. Connect your GitHub repository to Contentstack Launch
2. Set environment variables in Launch settings
3. Deploy!

### Alternative: Vercel

```bash
npm run build
vercel --prod
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

This project is a demo/presentation template. Feel free to fork and customize!

## 📄 License

MIT License — feel free to use this for your own projects.

---

Built with ❤️ using [Contentstack](https://www.contentstack.com/) + [Next.js](https://nextjs.org/)
