# SauceDemo Playwright Test Suite

![Playwright Tests](https://github.com/ParvthyRajendran/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

## What is this project?

An end-to-end test automation suite for [SauceDemo](https://www.saucedemo.com) — a mock e-commerce application. Built to demonstrate production-ready automation engineering skills using modern tooling.

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Test automation framework |
| TypeScript | Programming language |
| GitHub Actions | CI/CD pipeline |
| Page Object Model | Framework design pattern |

## Test Coverage

| Requirement | Test Cases | Tests |
|---|---|---|
| REQ-01: User Authentication | TC-01 to TC-04 | 12 |
| REQ-02: Product Catalogue | TC-05 to TC-10 | 18 |
| REQ-03: Shopping Cart | TC-11 to TC-14 | 12 |
| REQ-04: Checkout | TC-15 to TC-19 | 15 |
| **Total** | **19 test cases** | **57 tests** |

All tests run across **Chromium, Firefox and WebKit** automatically.

## Project Structure

saucedemo-playwright/
├── pages/                  # Page Object Models
│   ├── LoginPage.ts        # Login page interactions
│   ├── InventoryPage.ts    # Product catalogue interactions
│   ├── CartPage.ts         # Shopping cart interactions
│   └── CheckoutPage.ts     # Checkout flow interactions
├── tests/                  # Test files
│   ├── login.test.ts       # TC-01 to TC-04
│   ├── inventory.test.ts   # TC-05 to TC-10
│   ├── cart.test.ts        # TC-11 to TC-14
│   └── checkout.test.ts    # TC-15 to TC-19
├── TEST_CASES.md           # Test case documentation
├── playwright.config.ts    # Playwright configuration
└── .github/workflows/      # CI/CD pipeline
└── playwright.yml


## How to Run Locally

**Prerequisites:** Node.js v18 or higher

**Install dependencies:**
```bash
npm install
npx playwright install
```

**Run all tests:**
```bash
npx playwright test
```

**Run a specific test file:**
```bash
npx playwright test tests/login.test.ts
```

**View HTML report:**
```bash
npx playwright show-report
```

## CI/CD Pipeline

Every push to `main` triggers GitHub Actions automatically:

1. Installs dependencies
2. Downloads Playwright browsers
3. Runs all 57 tests across 3 browsers
4. Uploads HTML report as artifact
5. Uploads test videos on failure only

## Key Engineering Decisions

**Why Playwright over Selenium:**
Playwright's built-in auto-waiting eliminates timing issues that cause flaky tests. No manual `Thread.sleep` or `WebDriverWait` needed.

**Why Page Object Model:**
All selectors live in one place. If SauceDemo changes a locator, one file update fixes all tests — not 57 individual changes.

**Why TypeScript:**
Type safety catches bugs at compile time. Union types on sort options (`'az' | 'za' | 'lohi' | 'hilo'`) prevent invalid values from ever reaching the test.

**Why video on failure only:**
Recording video for every test wastes storage. `retain-on-failure` keeps evidence when needed without the overhead.

## Author

**Parvathy Rajendran**  
QA Engineer | ISTQB CTFL Certified  
[GitHub](https://github.com/ParvthyRajendran) | [LinkedIn](https://www.linkedin.com/in/parvathyrajendran/)