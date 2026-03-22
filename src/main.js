import './style.css'
import categories from './data/categories.json'

const BILL_MAX = 10_000_000
const HISTORY_KEY = 'bd_vat_tax_history_v1'

const labels = {
  en: {
    appTitle: 'Bangladesh VAT & TAX Calculator',
    appSubtitle: 'Fast and accurate VAT/TAX calculations for public users, finance, procurement, and vendors.',
    homeTitle: 'Choose Calculation Type',
    homeGross: 'Gross Up VAT & TAX',
    homeVendor: 'Procurement / Vendor',
    homeCategory: 'Category Based',
    homeGrossInfo: 'Base amount + VAT + TAX',
    homeVendorInfo: 'Bill includes VAT/TAX, find actual pay',
    homeCategoryInfo: 'Auto-fill VAT/TAX from category',
    grossTitle: 'Gross Up VAT & TAX Calculator',
    vendorTitle: 'Procurement / Vendor Calculator',
    categoryTitle: 'Category-Based Calculator',
    formBill: 'Bill Amount',
    formVat: 'VAT Rate (%)',
    formTax: 'TAX Rate (%)',
    formCategory: 'Category',
    calculate: 'Calculate',
    clear: 'Clear',
    copyLink: 'Share Result Link',
    resultTitle: 'Calculation Result',
    resultMode: 'Mode',
    resultBase: 'Base Value',
    resultVat: 'VAT Amount',
    resultTax: 'TAX Amount',
    resultTotal: 'Gross / Total Amount',
    resultActual: 'Actual Pay',
    categoryTableTitle: 'Category List (Editable via JSON)',
    noResult: 'No result yet. Submit the form to see output.',
    historyTitle: 'Recent Calculation History',
    historyEmpty: 'No history found.',
    footerText: 'Built for Bangladesh VAT/TAX quick estimation.',
    validationNumeric: 'Only numeric input is allowed.',
    validationRequired: 'All fields are required.',
    validationNegative: 'Negative values are not allowed.',
    validationRate: 'VAT/TAX must be between 0 and 100.',
    validationBillMax: 'Bill amount cannot exceed 1 crore (10,000,000).',
    successLink: 'Result link copied to clipboard.',
    errorLink: 'Could not copy link in this browser.',
    selectCategory: 'Select category',
    languageToggle: 'বাংলা'
  },
  bn: {
    appTitle: 'বাংলাদেশ VAT ও TAX ক্যালকুলেটর',
    appSubtitle: 'সাধারণ ব্যবহারকারী, ফিনান্স, প্রোকিউরমেন্ট এবং ভেন্ডরের জন্য দ্রুত ও সঠিক হিসাব।',
    homeTitle: 'ক্যালকুলেটর টাইপ নির্বাচন করুন',
    homeGross: 'গ্রস আপ VAT ও TAX',
    homeVendor: 'প্রোকিউরমেন্ট / ভেন্ডর',
    homeCategory: 'ক্যাটাগরি ভিত্তিক',
    homeGrossInfo: 'বেইজ এমাউন্ট + VAT + TAX',
    homeVendorInfo: 'বিলে VAT/TAX আছে, Actual Pay বের করুন',
    homeCategoryInfo: 'ক্যাটাগরি থেকে VAT/TAX অটো ফিল',
    grossTitle: 'গ্রস আপ VAT ও TAX ক্যালকুলেটর',
    vendorTitle: 'প্রোকিউরমেন্ট / ভেন্ডর ক্যালকুলেটর',
    categoryTitle: 'ক্যাটাগরি ভিত্তিক ক্যালকুলেটর',
    formBill: 'বিল এমাউন্ট',
    formVat: 'VAT হার (%)',
    formTax: 'TAX হার (%)',
    formCategory: 'ক্যাটাগরি',
    calculate: 'হিসাব করুন',
    clear: 'রিসেট',
    copyLink: 'ফলাফলের লিংক কপি',
    resultTitle: 'হিসাবের ফলাফল',
    resultMode: 'মোড',
    resultBase: 'বেইজ ভ্যালু',
    resultVat: 'VAT এমাউন্ট',
    resultTax: 'TAX এমাউন্ট',
    resultTotal: 'মোট এমাউন্ট',
    resultActual: 'Actual Pay',
    categoryTableTitle: 'ক্যাটাগরি তালিকা (JSON দিয়ে পরিবর্তনযোগ্য)',
    noResult: 'এখনও কোনো ফলাফল নেই। ফর্ম সাবমিট করুন।',
    historyTitle: 'সাম্প্রতিক হিসাব',
    historyEmpty: 'কোনো হিসাব পাওয়া যায়নি।',
    footerText: 'বাংলাদেশ VAT/TAX দ্রুত হিসাবের জন্য তৈরি।',
    validationNumeric: 'শুধু সংখ্যা ইনপুট দিন।',
    validationRequired: 'সব ইনপুট পূরণ করতে হবে।',
    validationNegative: 'Negative ইনপুট গ্রহণযোগ্য নয়।',
    validationRate: 'VAT/TAX হার 0 থেকে 100 এর মধ্যে হতে হবে।',
    validationBillMax: 'বিল এমাউন্ট ১ কোটির বেশি হতে পারবে না।',
    successLink: 'ফলাফলের লিংক কপি হয়েছে।',
    errorLink: 'এই ব্রাউজারে লিংক কপি করা যায়নি।',
    selectCategory: 'ক্যাটাগরি নির্বাচন করুন',
    languageToggle: 'English'
  }
}

const appState = {
  lang: 'bn',
  result: null,
  history: loadHistory()
}

function t(key) {
  return labels[appState.lang][key]
}

function money(value) {
  const locale = appState.lang === 'bn' ? 'bn-BD' : 'en-BD'
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function parseNumber(value) {
  if (value === null || value === undefined || value === '') {
    return Number.NaN
  }
  return Number(value)
}

function validateInput({ bill, vatRate, taxRate }) {
  if ([bill, vatRate, taxRate].some((item) => Number.isNaN(item))) {
    return t('validationNumeric')
  }
  if ([bill, vatRate, taxRate].some((item) => item < 0)) {
    return t('validationNegative')
  }
  if (vatRate > 100 || taxRate > 100) {
    return t('validationRate')
  }
  if (bill > BILL_MAX) {
    return t('validationBillMax')
  }
  return null
}

function grossUpCalculation(bill, vatRate, taxRate) {
  const base = bill
  const vat = base * (vatRate / 100)
  const tax = base * (taxRate / 100)
  const total = base + vat + tax
  return { base, vat, tax, total, actualPay: base }
}

function vendorCalculation(bill, vatRate, taxRate) {
  const divisor = 1 + (vatRate + taxRate) / 100
  const base = bill / divisor
  const vat = base * (vatRate / 100)
  const tax = base * (taxRate / 100)
  const total = base + vat + tax
  return { base, vat, tax, total, actualPay: base }
}

function storeHistory(entry) {
  appState.history = [entry, ...appState.history].slice(0, 12)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(appState.history))
}

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY)
  if (!raw) {
    return []
  }
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function clearResult(formId) {
  const form = document.getElementById(formId)
  if (form) {
    form.reset()
  }
  const errorEl = document.querySelector(`[data-error-for="${formId}"]`)
  if (errorEl) {
    errorEl.textContent = ''
  }
  appState.result = null
  renderResults()
}

function setError(formId, message) {
  const errorEl = document.querySelector(`[data-error-for="${formId}"]`)
  if (errorEl) {
    errorEl.textContent = message
  }
}

function buildShareUrl() {
  if (!appState.result) {
    return null
  }
  const url = new URL(window.location.href)
  url.searchParams.set('mode', appState.result.mode)
  url.searchParams.set('bill', String(appState.result.input.bill))
  url.searchParams.set('vat', String(appState.result.input.vatRate))
  url.searchParams.set('tax', String(appState.result.input.taxRate))
  if (appState.result.categoryId) {
    url.searchParams.set('category', appState.result.categoryId)
  }
  return url.toString()
}

async function copyShareLink() {
  const notice = document.getElementById('share-notice')
  const shareUrl = buildShareUrl()
  if (!shareUrl || !notice) {
    return
  }
  try {
    await navigator.clipboard.writeText(shareUrl)
    notice.textContent = t('successLink')
  } catch {
    notice.textContent = t('errorLink')
  }
}

function handleCalculationSubmit(event, mode) {
  event.preventDefault()
  const form = event.currentTarget
  const formData = new FormData(form)
  const bill = parseNumber(formData.get('billAmount'))
  let vatRate = parseNumber(formData.get('vatRate'))
  let taxRate = parseNumber(formData.get('taxRate'))
  const categoryId = String(formData.get('category') || '')

  if (mode === 'category') {
    const selected = categories.find((item) => item.id === categoryId)
    if (!selected) {
      setError(form.id, t('validationRequired'))
      return
    }
    vatRate = selected.vatRate
    taxRate = selected.taxRate
  }

  if ([bill, vatRate, taxRate].some((item) => Number.isNaN(item))) {
    setError(form.id, t('validationRequired'))
    return
  }

  const validationError = validateInput({ bill, vatRate, taxRate })
  if (validationError) {
    setError(form.id, validationError)
    return
  }

  const result = mode === 'vendor'
    ? vendorCalculation(bill, vatRate, taxRate)
    : grossUpCalculation(bill, vatRate, taxRate)

  setError(form.id, '')
  appState.result = {
    mode,
    categoryId,
    input: { bill, vatRate, taxRate },
    output: result,
    createdAt: new Date().toISOString()
  }
  storeHistory(appState.result)
  renderResults()
}

function fillRatesFromCategory(event) {
  const categoryId = event.target.value
  const selected = categories.find((item) => item.id === categoryId)
  const vatInput = document.querySelector('#category-vat')
  const taxInput = document.querySelector('#category-tax')
  if (!selected || !vatInput || !taxInput) {
    return
  }
  vatInput.value = selected.vatRate
  taxInput.value = selected.taxRate
}

function modeLabel(mode) {
  const map = {
    gross: t('homeGross'),
    vendor: t('homeVendor'),
    category: t('homeCategory')
  }
  return map[mode]
}

function historyMarkup() {
  if (!appState.history.length) {
    return `<p class="history-empty">${t('historyEmpty')}</p>`
  }

  return `
    <div class="history-list">
      ${appState.history
        .map((item) => {
          return `
            <article class="history-item">
              <h4>${modeLabel(item.mode)}</h4>
              <p>${t('formBill')}: ${money(item.input.bill)}</p>
              <p>${t('formVat')}: ${item.input.vatRate}% | ${t('formTax')}: ${item.input.taxRate}%</p>
              <p>${t('resultTotal')}: ${money(item.output.total)}</p>
            </article>
          `
        })
        .join('')}
    </div>
  `
}

function resultTableMarkup() {
  if (!appState.result) {
    return `<p class="result-empty">${t('noResult')}</p>`
  }
  const { mode, output } = appState.result
  return `
    <table>
      <tbody>
        <tr><th>${t('resultMode')}</th><td>${modeLabel(mode)}</td></tr>
        <tr><th>${t('resultBase')}</th><td>${money(output.base)}</td></tr>
        <tr><th>${t('resultVat')}</th><td>${money(output.vat)}</td></tr>
        <tr><th>${t('resultTax')}</th><td>${money(output.tax)}</td></tr>
        <tr><th>${t('resultTotal')}</th><td>${money(output.total)}</td></tr>
        <tr><th>${t('resultActual')}</th><td>${money(output.actualPay)}</td></tr>
      </tbody>
    </table>
  `
}

function categoriesTable() {
  return `
    <table class="category-table">
      <thead>
        <tr>
          <th>${t('formCategory')}</th>
          <th>${t('formVat')}</th>
          <th>${t('formTax')}</th>
        </tr>
      </thead>
      <tbody>
        ${categories
          .map((item) => {
            const name = appState.lang === 'bn' ? item.nameBn : item.nameEn
            return `<tr><td>${name}</td><td>${item.vatRate}%</td><td>${item.taxRate}%</td></tr>`
          })
          .join('')}
      </tbody>
    </table>
  `
}

function renderResults() {
  const resultContainer = document.getElementById('result-table')
  const historyContainer = document.getElementById('history-area')
  const categoryList = document.getElementById('category-list')
  if (!resultContainer || !historyContainer || !categoryList) {
    return
  }
  resultContainer.innerHTML = resultTableMarkup()
  historyContainer.innerHTML = historyMarkup()
  categoryList.innerHTML = categoriesTable()
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function readQueryToPrefill() {
  const params = new URLSearchParams(window.location.search)
  if (![...params.keys()].length) {
    return
  }
  const mode = params.get('mode')
  const bill = params.get('bill')
  const vat = params.get('vat')
  const tax = params.get('tax')
  const category = params.get('category')

  if (mode === 'gross') {
    const form = document.getElementById('gross-form')
    if (form && bill && vat && tax) {
      form.billAmount.value = bill
      form.vatRate.value = vat
      form.taxRate.value = tax
    }
  }

  if (mode === 'vendor') {
    const form = document.getElementById('vendor-form')
    if (form && bill && vat && tax) {
      form.billAmount.value = bill
      form.vatRate.value = vat
      form.taxRate.value = tax
    }
  }

  if (mode === 'category') {
    const form = document.getElementById('category-form')
    if (form && bill && category) {
      form.billAmount.value = bill
      form.category.value = category
      fillRatesFromCategory({ target: form.category })
    }
  }
}

function renderApp() {
  const app = document.querySelector('#app')
  if (!app) {
    return
  }

  app.innerHTML = `
    <main class="container">
      <header class="hero">
        <div>
          <h1>${t('appTitle')}</h1>
          <p>${t('appSubtitle')}</p>
        </div>
        <button id="lang-toggle" class="lang-btn">${t('languageToggle')}</button>
      </header>

      <section class="home-cards">
        <h2>${t('homeTitle')}</h2>
        <div class="card-grid">
          <button class="home-card" data-target="gross-section">
            <strong>${t('homeGross')}</strong>
            <span>${t('homeGrossInfo')}</span>
          </button>
          <button class="home-card" data-target="vendor-section">
            <strong>${t('homeVendor')}</strong>
            <span>${t('homeVendorInfo')}</span>
          </button>
          <button class="home-card" data-target="category-section">
            <strong>${t('homeCategory')}</strong>
            <span>${t('homeCategoryInfo')}</span>
          </button>
        </div>
      </section>

      <section id="calculators" class="calc-grid">
        <article id="gross-section" class="calc-card">
          <h3>${t('grossTitle')}</h3>
          <form id="gross-form" class="calc-form">
            <label>${t('formBill')} <input type="number" step="0.01" min="0" max="10000000" name="billAmount" required /></label>
            <label>${t('formVat')} <input type="number" step="0.01" min="0" max="100" name="vatRate" required /></label>
            <label>${t('formTax')} <input type="number" step="0.01" min="0" max="100" name="taxRate" required /></label>
            <div class="form-actions">
              <button type="submit">${t('calculate')}</button>
              <button type="button" class="ghost" data-clear="gross-form">${t('clear')}</button>
            </div>
            <p class="error" data-error-for="gross-form"></p>
          </form>
        </article>

        <article id="vendor-section" class="calc-card">
          <h3>${t('vendorTitle')}</h3>
          <form id="vendor-form" class="calc-form">
            <label>${t('formBill')} <input type="number" step="0.01" min="0" max="10000000" name="billAmount" required /></label>
            <label>${t('formVat')} <input type="number" step="0.01" min="0" max="100" name="vatRate" required /></label>
            <label>${t('formTax')} <input type="number" step="0.01" min="0" max="100" name="taxRate" required /></label>
            <div class="form-actions">
              <button type="submit">${t('calculate')}</button>
              <button type="button" class="ghost" data-clear="vendor-form">${t('clear')}</button>
            </div>
            <p class="error" data-error-for="vendor-form"></p>
          </form>
        </article>

        <article id="category-section" class="calc-card">
          <h3>${t('categoryTitle')}</h3>
          <form id="category-form" class="calc-form">
            <label>${t('formBill')} <input type="number" step="0.01" min="0" max="10000000" name="billAmount" required /></label>
            <label>${t('formCategory')}
              <select name="category" id="category-select" required>
                <option value="">${t('selectCategory')}</option>
                ${categories
                  .map((item) => {
                    const name = appState.lang === 'bn' ? item.nameBn : item.nameEn
                    return `<option value="${item.id}">${name}</option>`
                  })
                  .join('')}
              </select>
            </label>
            <label>${t('formVat')} <input id="category-vat" type="number" step="0.01" min="0" max="100" name="vatRate" readonly required /></label>
            <label>${t('formTax')} <input id="category-tax" type="number" step="0.01" min="0" max="100" name="taxRate" readonly required /></label>
            <div class="form-actions">
              <button type="submit">${t('calculate')}</button>
              <button type="button" class="ghost" data-clear="category-form">${t('clear')}</button>
            </div>
            <p class="error" data-error-for="category-form"></p>
          </form>
        </article>
      </section>

      <section class="results-wrap">
        <div class="result-panel">
          <div class="result-title-row">
            <h3>${t('resultTitle')}</h3>
            <button id="copy-link" class="ghost">${t('copyLink')}</button>
          </div>
          <div id="result-table"></div>
          <p id="share-notice" class="share-notice"></p>
        </div>
        <div class="history-panel">
          <h3>${t('historyTitle')}</h3>
          <div id="history-area"></div>
        </div>
      </section>

      <section class="category-panel">
        <h3>${t('categoryTableTitle')}</h3>
        <div id="category-list"></div>
      </section>

      <footer>${t('footerText')}</footer>
    </main>
  `

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    appState.lang = appState.lang === 'bn' ? 'en' : 'bn'
    renderApp()
    readQueryToPrefill()
    renderResults()
  })

  document.querySelectorAll('.home-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      const target = event.currentTarget.getAttribute('data-target')
      if (target) {
        scrollToSection(target)
      }
    })
  })

  document.getElementById('gross-form')?.addEventListener('submit', (event) => {
    handleCalculationSubmit(event, 'gross')
  })

  document.getElementById('vendor-form')?.addEventListener('submit', (event) => {
    handleCalculationSubmit(event, 'vendor')
  })

  document.getElementById('category-form')?.addEventListener('submit', (event) => {
    handleCalculationSubmit(event, 'category')
  })

  document.querySelectorAll('[data-clear]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const formId = event.currentTarget.getAttribute('data-clear')
      if (formId) {
        clearResult(formId)
      }
    })
  })

  document.getElementById('copy-link')?.addEventListener('click', copyShareLink)
  document.getElementById('category-select')?.addEventListener('change', fillRatesFromCategory)

  readQueryToPrefill()
  renderResults()
}

renderApp()
