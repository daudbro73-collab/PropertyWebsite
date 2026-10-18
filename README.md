<div align="center">
  <h1>🏡 Property Hub</h1>
  <p><strong>Full-featured real estate SPA — property listings, mortgage calculator, market charts, and PDF export</strong></p>

  [![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
  [![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
  [![Recharts](https://img.shields.io/badge/Recharts-3.8-22d3ee?style=flat-square)](https://recharts.org)
  [![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
</div>

---

## Overview

Property Hub is a modern real estate SPA built with **React 19** and **Vite**. It covers the full property browsing workflow — from filtering a catalog and comparing listings, through an interactive mortgage calculator, to exporting a property summary as a PDF.

The codebase is structured as a single-page application with client-side routing (React Router 7), data visualization (Recharts), and PDF generation (jsPDF) — no backend required.

---

## Features

### Property Catalog
- Grid / list toggle with smooth layout transition
- Filter by price range, bedrooms, bathrooms, property type, location
- Sort by price (asc/desc), newest, area
- Responsive property cards with photo gallery, specs, and price badge

### Property Detail Page
- Full photo gallery with thumbnail navigation
- Key stats: price, area (sqft/m²), rooms, floor, year built
- Agent contact form
- Neighborhood overview section
- Share & save (localStorage favorites)

### Mortgage Calculator
- Loan amount, interest rate, term input
- Monthly payment breakdown: principal + interest
- Amortization schedule table (full 30-year breakdown)
- Recharts area chart — principal vs interest over time

### Market Analytics
- Price trend chart by district (Recharts LineChart)
- Average price per sqm comparison
- Supply/demand indicators

### PDF Export
- One-click property summary PDF via jsPDF
- Includes: photos, specs, price, agent info, generated date

---

## Quick Start

```bash
git clone https://github.com/daudbro73-collab/PropertyWebsite.git
cd PropertyWebsite
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

---

## Architecture

```
PropertyWebsite/
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # Landing + featured listings
│   │   ├── Catalog.jsx        # Filterable property list
│   │   ├── Property.jsx       # Individual property detail
│   │   ├── Calculator.jsx     # Mortgage calculator + amortization
│   │   └── Analytics.jsx      # Market charts page
│   ├── components/
│   │   ├── PropertyCard/      # Listing card (grid + list view)
│   │   ├── Filters/           # Filter sidebar / drawer
│   │   ├── MortgageForm/      # Calculator inputs
│   │   ├── Charts/            # Recharts wrappers
│   │   └── ui/                # Button, Badge, Modal, etc.
│   ├── data/
│   │   └── properties.js      # Mock property catalog
│   └── utils/
│       ├── mortgage.js        # Amortization formula
│       ├── pdfExport.js       # jsPDF report generator
│       └── formatters.js      # Currency, area, date
├── public/
├── index.html
└── vite.config.js
```

---

## Tech Stack

| | Technology | Purpose |
|-|------------|---------|
| ⚛️ | React 19 | UI framework |
| ⚡ | Vite | Dev server + build tool |
| 🗺️ | React Router 7 | Client-side routing |
| 📊 | Recharts 3.8 | Market analytics charts |
| 📄 | jsPDF 4 | PDF property report export |
| 🔣 | React Icons 5 | Icon library |

---

<div align="center">
  <strong>Built by Rustam Berheev</strong><br/>
  <a href="https://github.com/daudbro73-collab">github.com/daudbro73-collab</a>
</div>
