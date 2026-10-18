<div align="center">

# 🏡 PropertyWebsite

**Modern real estate platform built with React 19 — property listings, mortgage calculator, and PDF reports**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Recharts](https://img.shields.io/badge/Recharts-3.8-22d3ee?style=for-the-badge)](https://recharts.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

[🌐 Live Demo](#) · [📖 Documentation](#)

</div>

---

## 📋 Overview

**PropertyWebsite** is a feature-rich real estate SPA (Single Page Application) that allows users to browse property listings, filter by parameters, compare properties side-by-side, calculate mortgage payments, and export property details to PDF.

---

## ✨ Features

- 🏘️ **Property listings** — filterable catalog with photos, specs, and pricing
- 🔍 **Advanced filters** — by price, location, bedrooms, property type
- 📊 **Interactive charts** — price trends and market analytics via Recharts
- 🧮 **Mortgage calculator** — monthly payment estimation with amortization schedule
- 📄 **PDF export** — generate property summary reports via jsPDF
- 🗺️ **Property map** — visual location overview
- 📱 **Responsive design** — works on all screen sizes
- 🌐 **Multi-language** — internationalization support

---

## 🚀 Quick Start

```bash
git clone https://github.com/daudbro73-collab/PropertyWebsite.git
cd PropertyWebsite
npm install
npm run dev
```

Open `http://localhost:5173`

### Production build

```bash
npm run build    # → dist/ folder
npm run preview  # Preview production build locally
```

---

## 🏗️ Project Structure

```
PropertyWebsite/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-based pages
│   ├── data/               # Property data & mock API
│   └── utils/              # Helpers (PDF, formatting)
├── public/                 # Static assets
├── dist/                   # Production build output
├── index.html
└── vite.config.js
```

---

## 💡 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite |
| Routing | React Router DOM 7 |
| Charts | Recharts 3.8 |
| PDF | jsPDF 4 |
| Icons | React Icons 5 |
| Linting | ESLint |

---

<div align="center">

Built with ❤️ by **Rustam Berheev**

[![GitHub](https://img.shields.io/badge/GitHub-daudbro73--collab-181717?style=flat-square&logo=github)](https://github.com/daudbro73-collab)

</div>
