# Bangladesh VAT & TAX Calculator - Documentation Overview

**Live Site:** https://ronyopq.github.io/VatTax/  
**Repository:** https://github.com/ronyopq/VatTax  
**Version:** 1.0 (Minimal UI)  
**Built:** March 2026

---

## 📋 Complete Documentation Index

### 1. **SRS (Software Requirements Specification)** - [View SRS.md](SRS.md)
   - Executive summary and project vision
   - All functional requirements (5 major sections)
   - Non-functional requirements (performance, security, usability)
   - Use cases and testing requirements
   - **Key Sections:**
     - 5.1: Core Calculator Module (3 calculation modes)
     - 5.2: User Interface & Interaction
     - 5.3: History Management
     - 5.4: Advanced Tools (Analytics, Export, Print, Compare)
     - 5.5-5.7: Additional Features & Error Handling
     - Tech stack, data models, deployment requirements

---

## 🎯 Quick Start

### For Users:
1. Visit https://ronyopq.github.io/VatTax/
2. Select calculation mode (Gross, Vendor, or Category)
3. Enter bill amount and rates
4. Click Calculate → See results
5. Export CSV or Print report

### For Developers:
1. Clone repository
2. Run `npm install && npm run build`
3. Output: `dist/index.html` (single file)
4. Deploy to GitHub Pages (automatic via Actions)

---

## 📊 Feature Breakdown

### Core Calculator
- **Gross Up Mode:** Base + VAT + TAX = Total
- **Vendor/Procurement Mode:** Bill ÷ (1 + VAT + TAX) = Base
- **Category-Based Mode:** Auto-fill rates from 20 categories
- **Input Support:** English & Bengali numerals
- **Validation:** Format, range, and type checking
- **Precision:** 2 decimal places

### Result Display
- **Dual-Card Layout:**
  - Left: Total amount including VAT & TAX
  - Right: Base amount excluding VAT & TAX
  - Each card shows 6 breakdown rows
  - Indian-style number formatting (16,521.74)

### Bilingual Support
- **Bengali (বাংলা)** - Default
- **English** - Toggle via button
- Bengali numerals auto-conversion
- Locale-specific formatting

### History & Export
- Auto-save up to 50 calculations
- Paginated display (6 per page)
- CSV export with full details
- Print reports with QR verification
- Clear history option

### Advanced Tools (Collapsible)
1. **Analytics:** KPI cards (Total Bills, VAT, TAX sums)
2. **CSV Export:** Download calculation history
3. **Print Report:** Printable layout with QR code
4. **Scenario Comparison:** Compare two calculation approaches
5. **Formula Audit Trail:** Show step-by-step formulas
6. **Category List:** View all predefined categories & rates

### Data Persistence
- **Storage:** Browser localStorage
- **Key:** `bd_vat_tax_history_v2`
- **Max Items:** 50 calculations
- **Retention:** Until manually cleared or browser storage cleaned
- **No Server:** Completely client-side

---

## 🏗️ Architecture

```
index.html (Single File)
├── CSS Styles (inline)
│   ├── Layout & Responsive Grid
│   ├── Component Styling
│   ├── Print Styles
│   └── Animations
│
└── JavaScript (vanilla, no dependencies)
    ├── State Management
    ├── Calculator Functions (Gross/Vendor/Category)
    ├── UI Rendering
    ├── Event Handlers
    ├── localStorage Access
    └── Utility Functions
```

**Tech Stack:**
- Frontend: Vanilla JavaScript (ES6+)
- Framework: None (Vite for build only)
- Storage: Browser localStorage
- External APIs: Google Fonts, QR Server
- Deployment: GitHub Pages
- Build Tool: Vite 8.0+

---

## 📝 Category Reference

**20 Predefined Business Categories with IRD/NBR-approved rates:**

| # | Category | VAT | TAX |
|---|---|---|---|
| 1 | Local Goods Purchase | 15% | 3% |
| 2 | Supplier/Trading Bill | 15% | 3% |
| 3 | Civil/Work Contractor | 15% | 7.5% |
| 4 | Repair & Maintenance | 15% | 7.5% |
| 5 | Consultancy/Professional | 15% | 10% |
| 6 | Legal & Audit Service | 15% | 10% |
| 7 | Office/Building Rent | 15% | 5% |
| 8 | Transport & Logistics | 5% | 3% |
| 9 | Security Service | 15% | 7.5% |
| 10 | Cleaning/Janitorial | 15% | 7.5% |
| 11 | Manpower Supply | 15% | 10% |
| 12 | Commission/Brokerage | 15% | 10% |
| 13 | IT/Software Service | 15% | 10% |
| 14 | Training/Workshop | 15% | 10% |
| 15 | Event Management | 15% | 10% |
| 16 | Printing & Publication | 15% | 5% |
| 17 | Advertising/Media | 15% | 5% |
| 18 | Clearing & Forwarding | 15% | 5% |
| 19 | Hotel/Venue Service | 15% | 5% |
| 20 | Other Services | 15% | 5% |

---

## 🔧 Configuration & Customization

### Bill Amount Limits
- **Min:** 1 Taka
- **Max:** 1 Crore (10,000,000) Taka

### Rate Ranges
- **VAT Rate:** 0% to 100%
- **TAX Rate:** 0% to 100%

### Number Formatting
- **Format:** Indian-style grouping (16,521.74)
- **Decimals:** Show if fractional, hide if .00
- **Locales:** Bengali (bn), English (en-IN)

### Storage Keys
| Key | Purpose | Max Size |
|---|---|---|
| `bd_vat_tax_history_v2` | Calculation history | 50 items |
| `lang` | Language preference | 2 chars |
| `officialMode` | Official mode toggle | Boolean |

---

## ✅ Validation Rules

### Bill Amount
- ✓ Required field
- ✓ Must be numeric (≥ 0)
- ✓ Cannot exceed 10,000,000
- ✓ Supports Bengali & English numerals

### VAT Rate & TAX Rate
- ✓ Required field
- ✓ Must be numeric (0-100)
- ✓ Decimal places allowed
- ✓ Validated before calculation

### Error Messages (Bilingual)
| Error | Bengali | English |
|---|---|---|
| Required field | সব ইনপুট পূরণ করতে হবে | All fields are required |
| Non-numeric | শুধু সংখ্যা ইনপুট দিন | Only numeric input allowed |
| Negative | Negative ইনপুট গ্রহণযোগ্য নয় | Negative values not allowed |
| Rate out of range | VAT/TAX হার 0-100 এর মধ্যে | VAT/TAX must be 0-100 |
| Amount too large | বিল এমাউন্ট ১ কোটির বেশি হতে পারবে না | Bill cannot exceed 1 crore |

---

## 📱 Responsive Design

### Breakpoints
- **Desktop:** 960px and above (2-col sidebar)
- **Tablet:** 720px to 959px (flexible layout)
- **Mobile:** Below 720px (single column, stacked)

### Touch-Friendly
- **Button Size:** Minimum 50×50 pixels
- **Input Height:** 50px (desktop), scales down on mobile
- **Form Label:** 16px text, readable on small screens
- **Spacing:** 1rem gaps, consistent padding

---

## 🚀 Deployment & Releases

### Automatic Deployment
- **Trigger:** Push to main branch
- **Platform:** GitHub Pages (gh-pages branch)
- **Build:** Vite (npm run build)
- **URL:** https://ronyopq.github.io/VatTax/
- **Time to Live:** ~2 minutes

### Release Checklist
- Code reviewed & tested
- Build succeeds without errors
- No console errors on live site
- Browser compatibility verified
- Categories updated (if NBR changes)
- Version & commit tagged
- Documentation updated

### Git Workflow
```bash
# Local development
git checkout -b feature/xxx

# Push to main when ready
git add -A
git commit -m "Clear, descriptive message"
git push origin main

# Automatic deployment to GitHub Pages
# Live site updated within 2 minutes
```

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. **No Offline Mode:** Requires internet (QR API, fonts)
2. **No Cloud Sync:** History per browser per device
3. **Limited History:** 50 items max (older ones removed)
4. **No User Accounts:** No personal data, no login
5. **Print Dependencies:** Print-to-PDF, not native PDF export

### Browser Support
- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+
- ✗ IE 11 (deprecated)

### Device Support
- ✓ Desktop (1920×1080+)
- ✓ Tablet (768×1024)
- ✓ Mobile (320×568+)
- ✓ Touch & keyboard input

---

## 📚 File Structure

```
repository/
├── index.html              # Main app (85 kB, 18 kB gzip)
├── SRS.md                  # This documentation
├── README.md               # Project overview
├── package.json            # Node.js config
├── vite.config.ts          # Vite build config
├── dist/                   # Built output
│   └── index.html          # Compiled single file
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
└── node_modules/           # Dependencies (dev only)
```

---

## 🔐 Security & Privacy

### Data Security
- ✓ No sensitive data stored
- ✓ Input validation prevents XSS
- ✓ No eval() or dangerous patterns
- ✓ localStorage (browser-level encryption)
- ✓ HTTPS enforced (GitHub Pages default)

### Privacy
- ✓ No user tracking
- ✓ No analytics cookies
- ✓ No external data transmission
- ✓ Calculations stay local
- ✓ No logs or monitoring

### Best Practices
- Sanitize all user inputs
- Validate on client & server
- Use Content Security Policy
- Regular security reviews
- Update dependencies (npm audit)

---

## 💡 FAQs & Troubleshooting

### Q: Why doesn't my history save?
**A:** Check browser localStorage settings. If disabled, history won't persist across sessions.

### Q: Can I use this offline?
**A:** No, fonts and QR API require internet. Calculations will work locally, but fonts may not load.

### Q: How do I clear my history?
**A:** Click "Clear History" button in History tab or Advanced Tools section.

### Q: What file formats can I export?
**A:** CSV only (which opens in Excel, Google Sheets, etc.).

### Q: How accurate are the calculations?
**A:** Accurate to 2 decimal places. No floating-point errors beyond standard precision limits.

### Q: Can I print a report?
**A:** Yes, click "Print Report" in Advanced Tools. Includes QR code for verification.

### Q: Is my calculation data sent to any server?
**A:** No, everything stays in your browser. Only displays your data, never transmits.

### Q: How do I share a calculation with someone?
**A:** Click "Share Result Link" in Result tab. URL includes all parameters. Anyone can open it.

### Q: Can I edit categories?
**A:** Not in this version. Official Mode shows only NBR-approved categories.

### Q: What if there's a calculation error?
**A:** Report in GitHub Issues. All operations are atomic (either complete or fail safely).

---

## 📞 Support & Contribution

### Reporting Issues
- GitHub Issues: https://github.com/ronyopq/VatTax/issues
- Include screenshots if possible
- Describe steps to reproduce
- Mention browser & device

### Contributing
1. Fork repository
2. Create feature branch
3. Make changes
4. Test locally
5. Submit Pull Request
6. Wait for review & merge

### Feature Requests
- File as GitHub Issue
- Describe use case
- Suggest implementation
- Community votes (👍) prioritize

---

## 📈 Performance Metrics

### Load Performance
- **Initial Load:** < 3 seconds (4G)
- **HTML Size:** 85-90 kB (uncompressed)
- **Gzip Size:** 18-20 kB (compressed)
- **Largest Asset:** Single HTML file

### Runtime Performance
- **Calculation Time:** < 100 ms
- **Render Time:** < 50 ms
- **History Load:** < 500 ms
- **Export Time:** < 2 seconds

### Optimization Techniques
- Single file (no HTTP requests for assets)
- Inline CSS & JS (no render-blocking resources)
- Efficient DOM manipulation
- No global variables (IIFE scope)
- Minimal event listener overhead

---

## 📜 License & Attribution

**Project:** Bangladesh VAT & TAX Calculator  
**Version:** 1.0  
**Status:** Open Source (GitHub Public)  
**License:** MIT (standard open-source license)  
**Attribution:** Development Team, 2026

### Dependencies/Credits
- **Google Fonts:** Noto Serif Bengali
- **QR Service:** QR Server API (anonymous, no tracking)
- **Build Tool:** Vite.js Community
- **Hosting:** GitHub Pages

---

## 🗓️ Maintenance Schedule

### Quarterly (Every 3 months)
- ✅ Update VAT/TAX categories (per NBR announcements)
- ✅ Browser compatibility review
- ✅ Performance analysis
- ✅ User feedback compilation

### Monthly (Every month)
- ✅ Uptime monitoring
- ✅ User support resolution
- ✅ Dependency updates check
- ✅ Analytics review (if implemented)

### As Needed
- ✅ Critical bug fixes (within 24 hours)
- ✅ Security patches
- ✅ User-reported issues
- ✅ Feature enhancements

---

## 🎯 Version History

| Version | Date | Updates |
|---|---|---|
| 1.0 | Mar 2026 | Initial release with minimal UI |
| 0.9 | Feb 2026 | Complete feature implementation |
| 0.5 | Jan 2026 | Core calculator & UI foundation |
| 0.1 | Dec 2025 | Project scaffolding |

---

## 📖 Additional Resources

### Internal Documentation
- [SRS.md](SRS.md) - Complete requirements specification
- [README.md](README.md) - Project overview & setup
- [index.html](index.html) - Fully commented source code

### External References
- [Bangladesh NBR](https://nbr.gov.bd/) - Tax authority guidelines
- [Vite Documentation](https://vitejs.dev/) - Build tool docs
- [GitHub Pages](https://pages.github.com/) - Deployment platform

---

**Last Updated:** March 23, 2026  
**Next Review:** June 23, 2026  
**Maintained By:** Development Team

---

For questions, issues, or collaborations, please visit:  
🔗 https://github.com/ronyopq/VatTax
