# Shopflo Assignment 1 - SauceDemo UI Automation

## Project Overview

This project automates key end-to-end user journeys of the SauceDemo e-commerce application using Playwright and the Page Object Model (POM). The suite covers positive, negative, and end-to-end scenarios including Login, Inventory, Cart, Checkout, and Logout.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions (CI)

---

## Framework Choice

### Why Playwright?

Playwright was chosen because it provides:

- Fast and reliable cross-browser automation
- Built-in auto waiting, reducing flaky tests
- Native parallel execution support
- Rich assertions with Playwright Test
- Easy integration with GitHub Actions
- Built-in HTML reporting and trace viewer for debugging

### Design Pattern

The framework follows the **Page Object Model (POM)** to improve:

- Code reusability
- Readability
- Maintainability
- Separation of test logic from page interactions

Project Structure:

```
Pages/
    LoginPage.ts
    ProductPage.ts
    CartPage.ts
    CheckoutPage.ts

tests/
    login.spec.ts
    product.spec.ts
    cart.spec.ts
    checkout.spec.ts
    logout.spec.ts

playwright.config.ts
```

---

## Test Coverage

The automation suite includes:

### Login
- Valid login
- Invalid username
- Invalid password
- Locked-out user
- Empty credentials validation

### Inventory
- Verify all products are displayed
- Verify product details
- Verify sorting (Low to High)
- Add single product
- Add multiple products
- Remove product

### Cart
- Verify selected products
- Verify cart badge count

### Checkout
- Successful checkout
- Mandatory field validation

### Logout
- Successful logout
- Verify protected pages cannot be accessed after logout

---

## Running the Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run in headed mode:

```bash
npx playwright test --headed
```

View HTML Report:

```bash
npx playwright show-report
```

---

## CI/CD

The project includes a GitHub Actions workflow that automatically executes the Playwright test suite on every push to the repository.

---

# Extension Plan

### Parallel Execution

The framework can be extended to execute tests in parallel across multiple browsers (Chromium, Firefox, and WebKit) by enabling multiple projects in `playwright.config.ts`. This reduces overall execution time and improves browser coverage.

### Reporting

The current framework uses Playwright's built-in HTML Reporter. It can be enhanced by integrating:

- Allure Reports
- Extent Reports
- JUnit XML reports for CI pipelines
- Automatic screenshot and trace capture for failed tests

### Future Enhancements

- Data-driven testing using JSON or CSV
- Environment configuration (.env)
- Cross-browser execution
- API and UI integration tests