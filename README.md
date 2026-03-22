# Bangladesh VAT & TAX Calculator Web App

A public web application for Bangladesh VAT and TAX calculations based on Gross-Up, Procurement/Vendor, and Category-based rules.

## Tech Stack
- Vite
- Vanilla JavaScript (no backend)
- CSS3
- UTF-8 Bangla + English UI

## Features
- Gross Up VAT & TAX calculator
- Procurement/Vendor calculator (bill includes VAT/TAX)
- Category-based VAT/TAX auto-fill from JSON
- Input validation:
  - numeric only
  - no negative values
  - VAT/TAX range: 0 to 100
  - maximum bill amount: 1 crore (10,000,000)
- LocalStorage history (recent calculations)
- Result share link (copy URL with query parameters)
- Responsive UI for desktop and mobile
- Category list table rendered from JSON

## Formula Rules
### Gross-Up
- Base Value = Bill Amount
- VAT = Base Value * VAT%
- TAX = Base Value * TAX%
- Total = Base Value + VAT + TAX

### Procurement/Vendor
- Base Value = Bill Amount / (1 + VAT% + TAX%)
- VAT = Base Value * VAT%
- TAX = Base Value * TAX%
- Actual Pay = Base Value

## Category Data
Category list is stored in:
- `src/data/categories.json`

You can edit VAT/TAX rates and category names directly in this file.

## Functional Requirement Mapping
- FR-01, FR-02: bill/rate based automatic calculation
- FR-03: category select auto-fills VAT/TAX
- FR-04: browser history in LocalStorage
- FR-05: colored result table output
- FR-06: mobile responsive layout

## Run Locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deployment
Can be deployed on:
- Vercel
- Netlify
- Azure Static Web Apps
- Any static hosting

## Notes
- PDF export and Excel export are not implemented yet (future scope).
- No sensitive data is stored.
