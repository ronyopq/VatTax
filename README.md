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

## GitHub Pages (Configured)
This project is configured for GitHub Pages at:
- https://ronyopq.github.io/VatTax/

What is already set:
- Vite base path is set to `/VatTax/`
- GitHub Actions workflow is added in `.github/workflows/deploy-pages.yml`

How to enable in repository settings:
1. Go to GitHub repository `Settings` > `Pages`.
2. Under `Build and deployment`, set `Source` to `GitHub Actions`.
3. Push to `main` branch (or run the workflow manually from Actions tab).

## Notes
- PDF export and Excel export are not implemented yet (future scope).
- No sensitive data is stored.
