# fdj-united-assessment

Minimal Node + TypeScript project scaffold.

Getting started

1. Install dependencies (dev deps are listed in package.json):

```bash
npm install
```

2. Run in development (auto-restarts using ts-node-dev):

```bash
npm run dev
```

3. Build and run production bundle:

```bash
npm run build
npm start
```

Formatting and linting

```bash
npm run lint
npm run format
```

Notes

- No test runner is included (per project preference).
- Add dependencies as needed and run `npm install`.
# fdj-united-assessment

Minimal Node + TypeScript project scaffold.

Quick start

1. Install dev dependencies:

```bash
npm install
```

2. Development (restarts on changes):

```bash
npm run dev
```

3. Build:

```bash
npm run build
```

4. Run built output:

```bash
npm start -- your-name
```

5. Run tests:

```bash
npm test
```

Files added:
- `src/index.ts` — example entry and exported function
- `test/example.test.ts` — sample Vitest test
- `tsconfig.json`, `.eslintrc.cjs`, `.prettierrc`, `.gitignore`
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

3. Run the playwright test for purchase flow:

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

Notes
- The test uses `tests/constants.ts` to load environment variables from `.env` (via `dotenv`) when present.
- If you run Playwright from VS Code, ensure VS Code inherits the shell PATH (or set env vars in your environment) so `npx` and Playwright can be executed by the extension.
