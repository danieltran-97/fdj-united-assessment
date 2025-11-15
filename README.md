# fdj-united-assessment

## E2E Test: Purchase Flow (SauceDemo)

Objective: perform a successful purchase of any one listed product on https://www.saucedemo.com and assert verification points at each stage.

How to run the purchase test locally

1. Ensure dependencies are installed:

```bash
npm install
```

2. Ensure credentials are available. You can set them in `.env` at project root or export in your shell:

```
USERNAME=standard_user
PASSWORD=secret_sauce
```

3. Install Playwright Browsers
```bash
npx playwright install
```

4. Run the playwright test for purchase flow:

```bash
npx playwright test tests/purchase.spec.ts
```

Test scenarios and verification points

- Login:
	- Action: navigate to login page and submit valid credentials.
	- Verification: inventory page loads and contains at least one known product (`Sauce Labs Backpack`).

- Add to Cart:
	- Action: add a listed product to the cart.
	- Verification: the cart page contains the selected product; optionally cart badge increments to show 1.

- Checkout Info:
	- Action: proceed to checkout and fill first name, last name, postal code.
	- Verification: the checkout overview (summary) lists the selected product and shows the order totals.

- Finish Order:
	- Action: complete the purchase.
	- Verification: confirmation page shows a complete header with "THANK YOU FOR YOUR ORDER" and confirmation text indicating dispatch.

## Best Practices & Implementation Details

### Selector Strategy (Web-First Assertions)
This project prioritizes **web-first assertions** over locator-based selectors wherever possible:

- **Preferred**: `page.getByRole()`, `page.getByText()`, `page.getByPlaceholder()`, `page.getByLabel()`
- **Last Resort**: `page.locator()` only used when elements lack accessible text or meaningful roles

Example:
```typescript
// ✅ Web-first (preferred)
this.loginButton = page.getByRole('button', { name: 'Login' });
this.usernameInput = page.getByPlaceholder('Username');

// ❌ Locator (last resort only)
this.errorIcon = page.locator('.error-icon'); // No accessible name available
```

This approach ensures tests are:
- More resilient to CSS/HTML changes
- Aligned with accessibility standards
- Easier to maintain long-term

### Page Object Model (POM) Pattern
All page interactions are abstracted through dedicated POM classes:
- `pages/LoginPage.ts` — login and authentication
- `pages/InventoryPage.ts` — product listing and cart actions
- `pages/CartPage.ts` — cart review
- `pages/CheckoutInfoPage.ts` — customer information form
- `pages/CheckoutOverviewPage.ts` — order summary
- `pages/CheckoutCompletePage.ts` — order confirmation

Benefits:
- **Maintainability**: Changes to page layout require updates in one place
- **Reusability**: POMs can be imported and used across multiple test files
- **Readability**: Test code remains clean and intent-driven
- **Scalability**: New test files can easily import and reuse POMs without duplication, enabling the test suite to grow without increasing maintenance overhead

### CI/CD & Secrets Management

#### GitHub Secrets
Sensitive credentials (username, password) are stored securely as GitHub repository secrets:

1. Navigate to **Settings > Secrets and variables > Actions**
2. Add secrets: `LOGIN_USERNAME` and `LOGIN_PASSWORD`
3. GitHub Actions workflow automatically injects them as environment variables

```yaml
- name: Run Playwright tests
  env:
    LOGIN_USERNAME: ${{ secrets.LOGIN_USERNAME }}
    LOGIN_PASSWORD: ${{ secrets.LOGIN_PASSWORD }}
  run: npx playwright test
```

#### Playwright Docker Image
Tests run in CI using the official **Playwright Docker image** for consistency:

```yaml
container:
  image: mcr.microsoft.com/playwright:v1.56.1-noble
```

Benefits:
- All required browser binaries pre-installed
- Consistent test environment across runs
- Reduced setup time and system dependencies

#### Artifact Collection
On test failures, the following artifacts are automatically captured and uploaded:

```yaml
- name: Upload test artifacts
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: |
      playwright-report/
      test-results/
      videos/
      traces/
```

Artifacts include:
- **Screenshots** — captured on failure for visual debugging
- **Videos** — full test execution recording for detailed analysis
- **Trace Files** — Playwright Inspector traces for timeline inspection
- **HTML Report** — detailed test execution summary

This enables faster root-cause analysis without needing to re-run failed tests locally.

### AI-Assisted Development
Development productivity was enhanced using:

- **GitHub Copilot** — intelligent code generation for POM classes, test scenarios, and boilerplate
- **Playwright MCP (Model Context Protocol)** — seamless integration for test recording and POM generation

These tools accelerated:
- Initial POM skeleton creation
- Selector identification and validation
- Test scenario scaffolding
- Documentation generation

### Test Organization with `test.step()`
Test steps are organized using `test.step()` for clear, hierarchical debugging:

```typescript
test('successful purchase of one listed product', async ({ page }) => {
    await test.step('Login to SauceDemo', async () => {
        await loginPage.goto();
        await loginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });

    await test.step('Add item to cart', async () => {
        await inventoryPage.expectItemInInventory(itemName);
        await inventoryPage.addItemToCart(itemName);
    });

    await test.step('Complete checkout', async () => {
        await cartPage.expectItemInCart(itemName);
        await cartPage.checkout();
        // ... additional checkout steps
    });
});
```

Benefits:
- **Granular Failure Reporting**: Identifies exact step where test failed
- **HTML Report Clarity**: Each step appears as a collapsible section in the test report
- **Trace Viewer Navigation**: Easily jump to the failing step in the timeline
- **Debugging**: Quickly pinpoint which stage of the purchase flow encountered issues

### Notes
- The test uses `tests/constants.ts` to load environment variables from `.env` (via `dotenv`) when present.
- If you run Playwright from VS Code, ensure VS Code inherits the shell PATH (or set env vars in your environment) so `npx` and Playwright can be executed by the extension.
- For local development, create a `.env` file with credentials; for CI/CD, use GitHub Secrets.
