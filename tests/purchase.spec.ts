import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutInfoPage';
import { LOGIN_USERNAME, LOGIN_PASSWORD } from './constants';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('SauceDemo purchase flow', () => {
    test('successful purchase of one listed product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await test.step('Login to SauceDemo', async () => {
            await loginPage.goto();
            if (!LOGIN_USERNAME || !LOGIN_PASSWORD) {
                throw new Error('LOGIN_USERNAME and LOGIN_PASSWORD environment variables are required. Please set them in .env or your shell environment.');
            } else {
                await loginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
            }
        })

        const itemName = 'Sauce Labs Backpack';

        await test.step('Purchase one listed product', async () => {
            await inventoryPage.expectItemInInventory(itemName);

            await inventoryPage.addItemToCart(itemName);

            // Verification: cart badge shows 1 item (if present)
            await inventoryPage.openCart();
        });

        await test.step('Complete checkout process and verify confirmation', async () => {
            // open cart and verify the item is present
            await cartPage.expectItemInCart(itemName);
            await cartPage.checkout();

            // 3) Checkout: fill information and continue
            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.expectVisible();
            await checkoutPage.fillAndContinue('Test', 'User', '12345');

            // Verification: Summary page shows the item and a total
            const checkoutOverviewPage = new CheckoutOverviewPage(page);
            await checkoutOverviewPage.expectItemPresent(itemName);
            await checkoutOverviewPage.expectSummaryInfo();

            // 4) Finish purchase
            await checkoutOverviewPage.finish();

            // Verification: order confirmation is shown
            const checkoutCompletePage = new CheckoutCompletePage(page);
            await checkoutCompletePage.expectSelectorsVisible();
        });
    });
});
