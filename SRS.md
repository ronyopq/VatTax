# Software Requirements Specification (SRS)
## Bangladesh VAT & TAX Calculator

**Version:** 1.0  
**Date:** March 2026  
**Status:** Final  
**Author:** Development Team  
**Repository:** https://github.com/ronyopq/VatTax

---

## 1. Executive Summary

The **Bangladesh VAT & TAX Calculator** is a web-based application designed to provide fast, accurate, and user-friendly VAT (Value Added Tax) and TAX calculations for public users, finance professionals, procurement teams, and vendors in Bangladesh.

The application supports three calculation modes:
- **Gross Up Mode:** Calculate VAT & TAX by adding them to the base amount
- **Vendor/Procurement Mode:** Extract base amount when bill includes VAT/TAX
- **Category-Based Mode:** Auto-fill VAT/TAX rates from predefined categories

The system features bilingual support (Bengali & English), comprehensive history tracking, export capabilities, and advanced tools for scenario comparison.

---

## 2. Project Vision & Objectives

### 2.1 Vision
To simplify VAT and TAX calculations for Bangladesh-based businesses and individuals, reducing calculation errors and improving financial compliance.

### 2.2 Objectives
- Provide accurate, instant VAT/TAX calculations across three modes
- Support both English and Bengali interfaces
- Enable users to save, export, and share calculation results
- Offer advanced financial analysis and comparison tools
- Ensure compliance with Bangladesh NBR (National Board of Revenue) standards
- Deliver a responsive, accessible user experience across all devices

---

## 3. Scope

### 3.1 In Scope
✅ Real-time VAT/TAX calculations (3 modes)  
✅ Bilingual UI (Bengali & English)  
✅ History management with pagination  
✅ CSV export functionality  
✅ Print reports with QR verification  
✅ Scenario comparison tool  
✅ Category-based rate management  
✅ Official mode (approved categories only)  
✅ Result sharing via URL parameters  
✅ Advanced tools (collapsible section)  
✅ Local storage persistence  
✅ Responsive design (mobile, tablet, desktop)  

### 3.2 Out of Scope
❌ Backend server/API (standalone client-side app)  
❌ User authentication & accounts  
❌ Database storage (beyond browser localStorage)  
❌ PDF export (print to PDF supported)  
❌ Real-time synchronization across devices  
❌ Payment gateway integration  

---

## 4. User Classes & Characteristics

### 4.1 Primary Users

#### 4.1.1 Finance Professionals
- **Profile:** CFOs, Accountants, Finance Managers
- **Requirements:** Accurate calculations, audit trails, batch processing
- **Frequency:** Daily usage for VAT/TAX computations
- **Devices:** Desktop & Laptop

#### 4.1.2 Procurement Officers
- **Profile:** Procurement Specialists, Vendor Managers
- **Requirements:** Vendor bill analysis, cost calculation, approval workflows
- **Frequency:** Multiple times daily
- **Devices:** Desktop, Mobile, Tablet

#### 4.1.3 Vendors & Service Providers
- **Profile:** Self-employed, SMEs, Contractors
- **Requirements:** Simple, quick calculations for billing
- **Frequency:** On-demand usage
- **Devices:** Mobile-first, Desktop

#### 4.1.4 Public/General Users
- **Profile:** General population, students, curious users
- **Requirements:** Simple, intuitive interface
- **Frequency:** Occasional or one-time usage
- **Devices:** Any device with browser

### 4.2 Secondary Users
- NBR officials (verification & compliance)
- Tax consultants (advisory & training)
- Business analysts (reporting & insights)

---

## 5. Functional Requirements

### 5.1 Core Calculator Module

#### FR 5.1.1 Gross Up Calculation
**Description:** Calculate total amount including VAT & TAX from base amount

**Requirements:**
- Input: Bill Amount (base), VAT Rate (%), TAX Rate (%)
- Formula: `Total = Base + (Base × VAT%) + (Base × TAX%)`
- Output: Base, VAT Amount, TAX Amount, Total Amount
- Support English (1000-1000000) and Bengali (১০০০-১০০০০০০) numerals
- Input validation: Amount ≤ 1 Crore (10,000,000)

**Acceptance Criteria:**
- ✓ Calculation accurate to 2 decimal places
- ✓ Formula displayed in audit trail
- ✓ Instant result update on input change
- ✓ Error message for invalid inputs

---

#### FR 5.1.2 Vendor/Procurement Calculation
**Description:** Extract base amount from bill that includes VAT & TAX

**Requirements:**
- Input: Bill Amount (total including VAT/TAX), VAT Rate (%), TAX Rate (%)
- Formula: `Base = Bill / (1 + VAT% + TAX%)`
- Derived values: VAT Amount, TAX Amount
- Output: Base, VAT Amount, TAX Amount, Total Amount
- Support both English and Bengali numerals

**Acceptance Criteria:**
- ✓ Extraction precise to 2 decimal places
- ✓ Reverse calculation verified (Base + VAT + TAX = Bill)
- ✓ Clear labeling: "Actual Pay" = Base Amount
- ✓ Error handling for invalid rates

---

#### FR 5.1.3 Category-Based Calculation
**Description:** Auto-fill VAT/TAX rates from predefined business categories

**Requirements:**
- 20+ predefined categories with NIB/SRO-approved rates
- Categories include: Goods, Services, Rent, Transport, Professional Services, etc.
- Support official mode (approved categories only)
- Display category name in Bengali & English
- Allow rate override/manual adjustment

**Predefined Categories:**
```
1. Local Goods Purchase (15% VAT, 3% TAX)
2. Supplier/Trading Bill (15% VAT, 3% TAX)
3. Civil/Work Contractor (15% VAT, 7.5% TAX)
4. Repair & Maintenance (15% VAT, 7.5% TAX)
5. Consultancy/Professional (15% VAT, 10% TAX)
6. Legal & Audit Service (15% VAT, 10% TAX)
7. Office/Building Rent (15% VAT, 5% TAX)
8. Transport & Logistics (5% VAT, 3% TAX)
9. Security Service (15% VAT, 7.5% TAX)
10. Cleaning/Janitorial (15% VAT, 7.5% TAX)
... [17 more categories]
```

**Acceptance Criteria:**
- ✓ Categories load instantly
- ✓ Rates auto-fill on category selection
- ✓ Rates match latest NBR/SRO standards
- ✓ Official mode filters unapproved categories

---

### 5.2 User Interface & Interaction

#### FR 5.2.1 Unified Calculator Form
**Description:** Single form supporting all three calculation modes

**Requirements:**
- Mode selector dropdown (Gross Up / Vendor / Category-Based)
- Bill Amount input (always visible, mandatory)
- VAT Rate input (appears for Gross/Vendor modes)
- TAX Rate input (appears for Gross/Vendor modes)
- Category dropdown (appears for Category mode only)
- Calculate & Clear buttons

**Acceptance Criteria:**
- ✓ Mode switching shows/hides fields smoothly
- ✓ Form validates before calculation
- ✓ Error messages clear and actionable
- ✓ Mobile-optimized input experience

---

#### FR 5.2.2 Dual-Card Result Display
**Description:** Show results in two side-by-side cards

**Requirements:**
- **Left Card:** "Invoice Amount Including VAT & TAX"
  - Shows total amount prominently
  - Lists all breakdown rows
  - Color: Blue-green gradient
  
- **Right Card:** "Invoice Amount Excluding VAT & TAX"
  - Shows base/actual pay amount
  - Same breakdown rows
  - Color: Blue gradient

- **Common Rows on Both Cards:**
  1. Particulars header row
  2. Total Amount Including VAT & TAX
  3. VAT Amount (Column 9,10 ref)
  4. Amount for TAX
  5. TAX Amount (Mushak 6.3 Column 6 ref)
  6. Net Amount formula (highlighted)

**Acceptance Criteria:**
- ✓ Cards responsive (side-by-side on desktop, stacked on mobile)
- ✓ All rows display correctly with proper formatting
- ✓ Numbers formatted with Indian-style grouping (16,521.74)
- ✓ Currency symbol (Tk) displayed appropriately

---

#### FR 5.2.3 Tabbed Result/History View
**Description:** Switch between calculation result and history

**Requirements:**
- Two tabs: "Result" (default), "History"
- Result tab shows current calculation and dual cards
- History tab shows list of recent calculations
- Tab switching preserves data

**Acceptance Criteria:**
- ✓ Tab switching instant and smooth
- ✓ Active tab visually highlighted
- ✓ History persists across page reloads
- ✓ Tab state remembered in session

---

#### FR 5.2.4 Bilingual Support
**Description:** Full Bengali & English interface

**Requirements:**
- Language toggle button in header (top-right)
- All labels, buttons, and messages in both languages
- Default language: Bengali
- Language preference persisted in localStorage
- Bengali numerals support in input (automatic conversion)
- Number formatting respects language:
  - Bengali: Uses Bengali numerals
  - English: Uses English numerals with en-IN locale

**Supported Languages:**
- Bengali (বাংলা) - Default
- English

**Acceptance Criteria:**
- ✓ All UI elements translated
- ✓ Language toggle switches instantly
- ✓ Bengali numerals auto-converted to standard for calculations
- ✓ Output formatted in selected language

---

### 5.3 History Management

#### FR 5.3.1 Calculation History
**Description:** Store and display user's calculation history

**Requirements:**
- Auto-save each calculation to browser localStorage
- Display up to 50 recent calculations
- Pagination (6 items per page)
- Show for each item: Mode, Bill Amount, Total Amount, Timestamp
- Persistent across browser sessions

**History Item Structure:**
```javascript
{
  mode: "gross" | "vendor" | "category",
  input: { bill, vatRate, taxRate, categoryId },
  output: { base, vat, tax, total, actualPay },
  createdAt: ISO timestamp
}
```

**Acceptance Criteria:**
- ✓ History saves automatically after calculation
- ✓ History loads on app launch
- ✓ Pagination works correctly
- ✓ Max 50 items stored (older ones discarded)
- ✓ Clear History button removes all

---

#### FR 5.3.2 History Pagination
**Description:** Navigate through history with pagination

**Requirements:**
- Previous/Next buttons
- Current page indicator (Page X / Y)
- Buttons disabled at boundaries
- 6 items per page

**Acceptance Criteria:**
- ✓ Navigation works correctly
- ✓ Button states update appropriately
- ✓ Page transitions smooth

---

### 5.4 Advanced Tools (Collapsible Section)

#### FR 5.4.1 Analytics Dashboard
**Description:** Quick statistics from calculation history

**Requirements:**
- Display three KPI cards:
  1. Total Bills (sum of all bill amounts)
  2. Total VAT (sum of all VAT amounts)
  3. Total TAX (sum of all TAX amounts)

**Acceptance Criteria:**
- ✓ KPIs calculate from history
- ✓ Format with currency and grouping
- ✓ Update when history changes

---

#### FR 5.4.2 CSV Export
**Description:** Download calculation history as CSV file

**Requirements:**
- Export columns: Date, Mode, Bill, VAT Rate, TAX Rate, Base, VAT, TAX, Total, Actual Pay
- Filename: `vat-tax-history.csv`
- Format: Standard CSV with proper escaping
- All history items included (not just current page)

**Acceptance Criteria:**
- ✓ CSV file downloads correctly
- ✓ Data accurate and properly formatted
- ✓ Spreadsheet opens without errors
- ✓ Success message shown

---

#### FR 5.4.3 Print Report
**Description:** Generate printable calculation report

**Requirements:**
- Print-optimized layout
- QR code verification (dynamic, from calculation hash)
- Result hash (SHA-like identifier)
- Timestamp and metadata
- Calculation details (formula, breakdown)
- History snapshot (last 10 calculations)

**Print Sections:**
1. Header: Report title, generation time, QR code
2. Result: Dual-card layout as on screen
3. Formula Audit Trail: All calculation formulas
4. History Snapshot: Table of recent calculations

**Acceptance Criteria:**
- ✓ Print preview shows correctly
- ✓ QR code generates and encodes data
- ✓ Hash created from calculation payload
- ✓ All sections print clearly
- ✓ Page breaks handled correctly

---

#### FR 5.4.4 Scenario Comparison
**Description:** Compare two calculation scenarios

**Requirements:**
- Two scenario inputs (A & B)
- Each scenario has:
  - Mode selector
  - VAT Rate input
  - TAX Rate input
- Shared bill amount (from main input)
- Compare button
- Display differences:
  - Total Difference
  - Actual Pay Difference
  - Lower Pay Scenario indicator

**Comparison Output:**
```
Total Difference: ±amount
Actual Pay Difference: ±amount
Lower Pay Scenario: A or B
```

**Acceptance Criteria:**
- ✓ Comparison calculates correctly
- ✓ Differences signed (positive/negative)
- ✓ Best scenario highlighted
- ✓ Error handling for invalid inputs

---

#### FR 5.4.5 Formula Audit Trail
**Description:** Display all calculation formulas

**Requirements:**
- Base Formula (shows calculation of base from bill)
- VAT Formula (shows VAT calculation)
- TAX Formula (shows TAX calculation)
- Total Formula (shows total assembly)
- Actual Pay Formula (shows actual pay)

**Example Output:**
```
Base = 10,000
VAT = 10,000 × (15/100) = 1,500
TAX = 10,000 × (3/100) = 300
Total = 10,000 + 1,500 + 300 = 11,800
Actual Pay = 10,000
```

**Acceptance Criteria:**
- ✓ All formulas clearly displayed
- ✓ Numbers formatted with grouping
- ✓ Formulas update after calculation
- ✓ Print-friendly layout

---

#### FR 5.4.6 Category List
**Description:** Display all available categories with rates

**Requirements:**
- Table with columns: Category Name, VAT Rate, TAX Rate
- All 20+ categories listed
- Both English and Bengali names
- Note: "Rates configurable, verify with latest NBR/SRO"

**Acceptance Criteria:**
- ✓ All categories display
- ✓ Rates accurate
- ✓ Names in both languages
- ✓ Mobile-friendly table

---

### 5.5 Additional Features

#### FR 5.5.1 Result Sharing
**Description:** Generate shareable URL with calculation

**Requirements:**
- Copy Link button generates URL with query parameters
- Parameters: `mode`, `bill`, `vat`, `tax`, `category`
- Shared link pre-fills form and shows result
- Copy to clipboard functionality

**Example URL:**
```
https://ronyopq.github.io/VatTax/?mode=gross&bill=50000&vat=15&tax=3
```

**Acceptance Criteria:**
- ✓ URL generates correctly
- ✓ Clipboard copy works
- ✓ Shared link loads result correctly
- ✓ Fallback message if copy not supported

---

#### FR 5.5.2 Input Validation
**Description:** Validate user inputs before calculation

**Requirements:**
- Bill Amount: Required, numeric, > 0, ≤ 10,000,000
- VAT Rate: Required, numeric, 0-100
- TAX Rate: Required, numeric, 0-100
- Category: Required for category mode
- Error messages: Specific and actionable

**Error Messages:**
- "All fields are required"
- "Only numeric input is allowed"
- "Negative values are not allowed"
- "VAT/TAX must be between 0 and 100"
- "Bill amount cannot exceed 1 crore (10,000,000)"

**Acceptance Criteria:**
- ✓ Invalid inputs rejected
- ✓ Clear error messages
- ✓ Form focuses on first error field
- ✓ Errors clear on valid input

---

#### FR 5.5.3 Official Mode
**Description:** Filter categories to approved/official ones only

**Requirements:**
- Toggle checkbox: "Official Mode (Approved Categories Only)"
- When enabled: Show only approved categories
- Approval status stored in category data
- Toggle persisted in localStorage

**Acceptance Criteria:**
- ✓ Toggle works correctly
- ✓ Approved categories identified
- ✓ Unapproved removed from list when enabled
- ✓ Setting persisted

---

#### FR 5.5.4 Number Formatting
**Description:** Format numbers with proper locale and grouping

**Requirements:**
- Format: Indian-style grouping (16,521.74)
- Decimal places: Show if fractional, hide if .00
- Locales: 
  - Bengali (bn): Bengali numerals
  - English (en-IN): English numerals with grouping
- Currency symbol: "Tk" (optional)

**Format Examples:**
```
12345 → 12,345 (no decimals)
12345.50 → 12,345.50
1000000 → 10,00,000 (Indian grouping)
```

**Acceptance Criteria:**
- ✓ Numbers formatted consistently
- ✓ Locale-specific formatting applied
- ✓ Decimal handling correct
- ✓ Copy-paste from UI works correctly

---

### 5.6 Data & Verification

#### FR 5.6.1 QR Code Verification
**Description:** Generate QR code for result verification

**Requirements:**
- Generate QR from calculation payload
- Payload includes: timestamp, mode, inputs, outputs
- QR size: 180×180 pixels
- External service: QR Server API
- Used in print reports

**Verification Payload:**
```json
{
  "time": "2026-03-23T10:30:00Z",
  "mode": "gross",
  "bill": 50000,
  "vatRate": 15,
  "taxRate": 3,
  "total": 52500,
  "actualPay": 50000
}
```

**Acceptance Criteria:**
- ✓ QR generates for each calculation
- ✓ QR encodes payload correctly
- ✓ Size appropriate for print
- ✓ Scannable and decodable

---

#### FR 5.6.2 Result Hash
**Description:** Create unique identifier for calculation

**Requirements:**
- Hash from verification payload
- Algorithm: Simple hash (5381 polynomial rolling hash)
- Output: Hexadecimal string
- Displayed in print reports

**Acceptance Criteria:**
- ✓ Hash unique per calculation
- ✓ Same calculation produces same hash
- ✓ Hash displays in reports

---

### 5.7 Error Handling & Recovery

#### FR 5.7.1 Input Error Handling
**Description:** Handle invalid user inputs gracefully

**Requirements:**
- Validation on form field level
- Error message displayed immediately below field
- Form submission blocked if validation fails
- Errors clear when user corrects input

**Acceptance Criteria:**
- ✓ Errors displayed inline
- ✓ Users understand what's wrong
- ✓ Form prevents invalid submissions

---

#### FR 5.7.2 Browser Compatibility Fallback
**Description:** Handle cases where features aren't supported

**Requirements:**
- localStorage unavailable: Message shown, app still works (no persistence)
- Clipboard unavailable: Show link as text instead of copy
- QR generation fails: Graceful degradation (no QR in report)

**Acceptance Criteria:**
- ✓ App works without localStorage
- ✓ Clipboard fallback works
- ✓ Print works without QR

---

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Requirement | Target | Acceptance Criteria |
|---|---|---|
| **Page Load Time** | < 3 sec | Fully interactive within 3 seconds on 4G |
| **Calculation Time** | < 100 ms | Instant result on input change |
| **History Load** | < 500 ms | History pages load immediately |
| **Export Time** | < 2 sec | CSV downloads within 2 seconds |

**Performance Metrics:**
- Largest HTML file: < 100 kB (gzip < 25 kB)
- No external dependencies (except fonts & QR API)
- Minimal DOM operations
- Efficient event handling

---

### 6.2 Scalability

- Support up to 1000 history items per user
- Handle multiple concurrent users (stateless)
- Cache-friendly (static asset reuse)
- No backend scaling needed (client-side only)

---

### 6.3 Reliability

- **Uptime Goal:** 99.9% (30 minutes downtime per month max)
- **Data Persistence:** localStorage as single source of truth
- **Recovery:** Automatic recovery from page refresh
- **Calculation Accuracy:** 100% (no rounding errors beyond 2 decimals)

---

### 6.4 Usability

#### 6.4.1 User Experience
- **Learnability:** < 2 minutes to first calculation
- **Efficiency:** 20 seconds from page load to result
- **Accessibility:** WCAG 2.1 AA compliance
- **Mobile Experience:** Optimized for touch, < 5 inch screens

#### 6.4.2 Accessibility
- Color contrast ≥ 4.5:1 for text
- Touch targets ≥ 48×48 pixels
- Alt text for QR codes
- Keyboard navigation supported
- Screen reader compatible

---

### 6.5 Security

- **Input Sanitization:** All inputs validated and escaped
- **XSS Prevention:** No eval() or innerHTML from user input
- **Data Storage:** localStorage (browser security)
- **HTTPS:** All traffic encrypted (GitHub Pages default)
- **No PII Storage:** Calculations are transient, no user accounts

---

### 6.6 Maintainability

- **Code Quality:** Single file, clean structure, well-commented
- **Documentation:** README, SRS, code comments
- **Version Control:** Git with meaningful commits
- **Deployments:** Automatic via GitHub Actions
- **Update Cycle:** Categories updated quarterly (as per NBR)

---

### 6.7 Compatibility

#### 6.7.1 Browser Support
| Browser | Min Version | Status |
|---|---|---|
| Chrome | 90+ | ✓ Fully Supported |
| Firefox | 88+ | ✓ Fully Supported |
| Safari | 14+ | ✓ Fully Supported |
| Edge | 90+ | ✓ Fully Supported |
| Mobile Browsers | Current | ✓ Fully Supported |
| IE 11 | Any | ✗ Not Supported |

#### 6.7.2 Device Support
- Desktop (1920×1080 and up)
- Tablet (768×1024)
- Mobile (320×568 and up)
- Touch & mouse input

---

### 6.8 Localization

- **Languages:** Bengali (bn), English (en)
- **Number Formats:** Locale-specific
- **Date/Time:** Browser locale + explicit conversion
- **RTL Support:** Not required (both languages RTL-friendly)

---

---

## 7. Technical Requirements

### 7.1 Technology Stack

| Component | Technology | Version |
|---|---|---|
| **Frontend Framework** | Vanilla JavaScript | ES6+ |
| **Build Tool** | Vite | 8.0+ |
| **HTML** | HTML5 | Latest |
| **Styling** | CSS3 | Latest |
| **Storage** | localStorage API | Browser native |
| **External APIs** | QR Server | v1 |
| **Fonts** | Google Fonts (Noto Serif Bengali) | Latest |
| **Deployment** | GitHub Pages | N/A |

### 7.2 Architecture

**Client-Side Single Page Application (SPA)**
```
index.html (single file)
  ├── CSS (inline)
  │   ├── Layout & Grid
  │   ├── Components
  │   ├── Responsive Media Queries
  │   └── Print Styles
  └── JavaScript (vanilla)
      ├── State Management
      ├── Calculator Functions
      ├── UI Rendering
      ├── Event Handling
      └── Storage Access
```

### 7.3 Dependencies

**Runtime:**
- None (vanilla JS, no npm packages in production)

**Build:**
- Vite (dev dependency)
- Node.js 16+
- npm 7+

**Optional:**
- GitHub Actions (for automated deployments)

### 7.4 Code Organization

```javascript
// Global scope structure:
(function() {
  // Constants
  var BILL_MAX = 10000000;
  var HISTORY_KEY = 'bd_vat_tax_history_v2';
  
  // Data
  var categories = [...];
  var labels = { en: {...}, bn: {...} };
  var state = {...};
  
  // Core Functions
  function loadHistory() {...}
  function saveHistory() {...}
  function money(value) {...}
  function parseNum(v) {...}
  function validate(payload) {...}
  function calcGross(bill, vatRate, taxRate) {...}
  function calcVendor(bill, vatRate, taxRate) {...}
  
  // UI Functions
  function render() {...}
  function bindForm(formId, mode) {...}
  function refreshPanels() {...}
  
  // Event Handlers
  function bindModeSwitch() {...}
  function bindCategoryAutoFill() {...}
  function bindViewTabs() {...}
})();
```

---

## 8. Data Requirements

### 8.1 Data Model

#### 8.1.1 Calculation Object
```javascript
{
  mode: "gross" | "vendor" | "category",
  categoryId?: string,
  input: {
    bill: number,
    vatRate: number,
    taxRate: number
  },
  output: {
    base: number,
    vat: number,
    tax: number,
    total: number,
    actualPay: number
  },
  createdAt: ISO8601 timestamp
}
```

#### 8.1.2 Category Object
```javascript
{
  id: string,
  nameEn: string,
  nameBn: string,
  vatRate: number,
  taxRate: number,
  approved: boolean
}
```

#### 8.1.3 State Object
```javascript
{
  lang: "en" | "bn",
  result: Calculation | null,
  history: Calculation[],
  activeView: "result" | "history",
  sharedBillText: string,
  officialMode: boolean,
  historyPage: number,
  historyPageSize: number
}
```

### 8.2 Storage Specification

**localStorage Key:** `bd_vat_tax_history_v2`

**Storage Format:** JSON array of Calculation objects

**Max Size:** 50 calculations (older ones discarded)

**Retention:** Until user clears history or browser storage cleared

**Recovery:** If parsing fails, empty history initialized

---

## 9. Constraints & Assumptions

### 9.1 Constraints

1. **No Backend Required:** Application must work entirely client-side
2. **No User Accounts:** No authentication or personalization beyond settings
3. **Browser Storage Only:** Data persists in localStorage only
4. **Single File:** Entire app delivered as single HTML file
5. **No External Packages:** Only vanilla JavaScript (no npm dependencies in production)
6. **Max Bill Amount:** 1 Crore (10,000,000) Taka
7. **Fixed Decimal Precision:** 2 decimal places maximum
8. **Rate Range:** 0-100% for VAT and TAX

### 9.2 Assumptions

1. Users have modern browsers (2022+)
2. Users have JavaScript enabled
3. Users have localStorage available (default browsers)
4. Internet connection available for QR API & fonts
5. Bengali numerals will be automatically converted
6. Categories updated manually (quarterly basis)
7. Users understand basic VAT/TAX concepts
8. Primary language is Bengali, English as secondary
9. Mobile users familiar with touch interfaces
10. No sensitive data shared (all calculations public-safe)

---

## 10. Use Cases

### UC 1: Calculate Gross Up VAT & TAX
**Actor:** Finance Professional  
**Precondition:** User on home page  
**Flow:**
1. Select "Gross Up VAT & TAX" mode
2. Enter Bill Amount: 50,000
3. Enter VAT Rate: 15
4. Enter TAX Rate: 3
5. Click Calculate
6. System displays dual-card result with breakdown
7. Result saved to history

**Postcondition:** Calculation visible, added to history

---

### UC 2: Extract Base from Vendor Bill
**Actor:** Procurement Officer  
**Precondition:** User on home page with vendor invoice  
**Flow:**
1. Select "Procurement / Vendor" mode
2. Enter Bill Amount (including VAT/TAX): 60,000
3. Enter VAT Rate: 15
4. Enter TAX Rate: 3
5. Click Calculate
6. System displays base amount & breakdown
7. User exports to CSV

**Postcondition:** CSV file downloaded with calculation

---

### UC 3: Category-Based Service Billing
**Actor:** Vendor  
**Precondition:** User calculating bill for service  
**Flow:**
1. Select "Category-Based" mode
2. Enter Bill Amount: 100,000
3. Select Category: "Consultancy/Professional Service"
4. System auto-fills VAT: 15%, TAX: 10%
5. Click Calculate
6. Result shows total with breakdown
7. Share result via generated link

**Postcondition:** Shareable URL generated and copied

---

### UC 4: Compare Two Scenarios
**Actor:** Finance Manager  
**Precondition:** User with saved calculation  
**Flow:**
1. Navigate to Advanced Tools > Scenario Compare
2. Scenario A: Mode=Gross, VAT=15%, TAX=3%
3. Scenario B: Mode=Gross, VAT=15%, TAX=5%
4. Click Run Compare
5. System displays differences
6. Shows lower-pay scenario highlighted

**Postcondition:** Comparison results visible

---

### UC 5: Export Calculation History
**Actor:** Finance Auditor  
**Precondition:** User with multiple calculations in history  
**Flow:**
1. Navigate to Advanced Tools > Quick Analytics
2. Click Export CSV
3. Browser downloads `vat-tax-history.csv`
4. User opens in Excel for analysis

**Postcondition:** CSV file ready for import

---

### UC 6: Print Verification Report
**Actor:** Compliance Officer  
**Precondition:** User with calculation result displayed  
**Flow:**
1. Click Print Report
2. System generates printable layout with QR code
3. Print dialog opens
4. User prints to PDF or physical printer

**Postcondition:** Printable report with QR verification

---

### UC 7: Switch Language
**Actor:** Bengali-speaking accountant  
**Precondition:** User on English interface  
**Flow:**
1. Click language toggle button (top-right)
2. System switches all labels to Bengali
3. Number formatting updates to Bengali numerals
4. Language preference saved

**Postcondition:** Entire UI in Bengali, preference persisted

---

### UC 8: Review Calculation Formula
**Actor:** Tax Consultant  
**Precondition:** User with recent calculation  
**Flow:**
1. Navigate to Advanced Tools > Formula Audit Trail
2. View all formulas with step-by-step breakdown
3. Verify calculation correctness
4. Print or screenshot formulas

**Postcondition:** Formulas displayed and verified

---

---

## 11. Testing Requirements

### 11.1 Unit Testing

**Calculation Functions:**
- ✓ calcGross() with various inputs
- ✓ calcVendor() with various inputs
- ✓ money() with different formats
- ✓ parseNum() with Bengali & English input
- ✓ validate() with invalid inputs

**Test Cases:**
- Normal cases (positive, zero, maximum values)
- Edge cases (decimal precision, rounding)
- Error cases (invalid input, range overflow)

---

### 11.2 Integration Testing

**Workflows:**
- ✓ Form submission → Calculation → Display
- ✓ Calculate → History save → History display
- ✓ History item → Export CSV
- ✓ Share URL → Pre-fill form → Calculate
- ✓ Language toggle → All labels update

---

### 11.3 User Acceptance Testing

**Scenarios:**
- ✓ Finance professional calculates VAT for 10 bills
- ✓ Vendor creates bill with category-based rates
- ✓ Procurement officer compares two vendor quotes
- ✓ Mobile user on 3G calculates on phone

---

### 11.4 Performance Testing

- ✓ Page load < 3 seconds (4G)
- ✓ Calculation < 100 ms
- ✓ History load < 500 ms
- ✓ 1000 history items load without slowdown

---

### 11.5 Compatibility Testing

**Browsers:**
- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+

**Devices:**
- ✓ Desktop (1920×1080)
- ✓ Tablet (768×1024)
- ✓ Mobile (320×568)

---

### 11.6 Accessibility Testing

- ✓ Color contrast ≥ 4.5:1
- ✓ Touch targets ≥ 48px
- ✓ Keyboard navigation works
- ✓ Screen reader compatible

---

### 11.7 Security Testing

- ✓ Input validation prevents XSS
- ✓ No eval() or dangerous patterns
- ✓ localStorage data safe
- ✓ HTTPS enforced

---

---

## 12. Deployment Requirements

### 12.1 Deployment Environment

**Platform:** GitHub Pages  
**URL:** https://ronyopq.github.io/VatTax/  
**Domain:** Public, no authentication  
**SSL/TLS:** HTTPS enforced

### 12.2 Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output: dist/index.html (85-90 kB uncompressed, 18-20 kB gzip)

# Deploy to GitHub Pages
# (Automated via GitHub Actions)
```

### 12.3 Continuous Deployment

**Trigger:** Push to main branch  
**Action:** GitHub Actions workflow  
**Steps:**
1. Run tests (if defined)
2. Build with Vite
3. Deploy dist/ to gh-pages branch
4. Update live site within 2 minutes

### 12.4 Release Checklist

- ✓ All tests pass
- ✓ Code reviewed
- ✓ Build succeeds
- ✓ No console errors
- ✓ Performance metrics met
- ✓ Browser compatibility verified
- ✓ Accessibility check passed
- ✓ Categories updated (if needed)
- ✓ Version bumped
- ✓ Commit message clear
- ✓ Git tag created
- ✓ Live site verified

---

## 13. Maintenance & Support

### 13.1 Maintenance Schedule

**Quarterly:**
- Review & update VAT/TAX categories (per NBR updates)
- Browser compatibility testing
- Performance analysis
- User feedback review

**Monthly:**
- Monitor uptime & errors
- Check for broken links
- Review analytics
- Community support

**As Needed:**
- Bug fixes (within 24 hours for critical)
- Security updates
- Feature enhancements

### 13.2 Support Channels

- GitHub Issues: Bug reports & feature requests
- Email: Support contact (if provided)
- Documentation: README & SRS
- LiveChat: Not provided (GitHub discussions only)

### 13.3 Known Limitations

1. **No Offline Support:** Requires internet for QR API & fonts
2. **No Batch Processing:** One calculation at a time
3. **Limited History:** 50 items max per user per browser
4. **No Backup:** History lost if localStorage cleared
5. **Single Browser:** History not synced across browsers
6. **No User Accounts:** No cross-device sync

---

## 14. Future Enhancements (Out of Scope)

1. ✨ Mobile app (native iOS/Android)
2. ✨ Backend API with database
3. ✨ User accounts & cloud sync
4. ✨ Multi-user collaboration
5. ✨ PDF export (native, not print-to-PDF)
6. ✨ Batch upload & processing
7. ✨ Custom category creation per user
8. ✨ Advanced analytics & dashboards
9. ✨ Integration with accounting software
10. ✨ Offline mode with service workers

---

## 15. Glossary

| Term | Definition |
|---|---|
| **VAT** | Value Added Tax - consumption tax on goods/services |
| **TAX** | Income/withholding tax on services or transactions |
| **Gross Up** | Adding VAT & TAX to a base amount to get total |
| **Procurement** | Vendor bill that already includes VAT/TAX |
| **Category** | Predefined business transaction types with standard rates |
| **Mushak** | Bangladesh Tax Authority form/document reference |
| **NBR** | National Board of Revenue (Bangladesh tax authority) |
| **SRO** | Statutory Regulatory Order |
| **QR Code** | Quick Response code for verification |
| **localStorage** | Browser API for persistent client-side storage |
| **CSV** | Comma-Separated Values file format |
| **WCAG** | Web Content Accessibility Guidelines |

---

## 16. Approval & Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| Product Manager | TBD | 2026-03-23 | __________ |
| Tech Lead | TBD | 2026-03-23 | __________ |
| QA Lead | TBD | 2026-03-23 | __________ |
| Client | TBD | 2026-03-23 | __________ |

---

## 17. Document History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-03-23 | Dev Team | Initial SRS document created |

---

**End of Software Requirements Specification**
