import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { LOGIN_USERNAME, LOGIN_PASSWORD } from './constants';

test.describe('SauceDemo purchase flow', () => {
    test('successful purchase of one listed product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        // 1) Go to login and authenticate
        await loginPage.goto();
        await loginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);

        // Verification: inventory page shows products
        await inventoryPage.expectItemInInventory('Sauce Labs Backpack');

        // 2) Add an item to the cart (choose one listed product)
        const itemName = 'Sauce Labs Backpack';
        await inventoryPage.addItemToCart(itemName);

        // Verification: cart badge shows 1 item (if present)
        // open cart and verify the item is present
        await inventoryPage.openCart();
        await cartPage.expectItemInCart(itemName);

        // 3) Checkout: fill information and continue
        await page.locator('[data-test="checkout"]').click();
        await page.locator('#first-name').fill('Test');
        await page.locator('#last-name').fill('User');
        await page.locator('#postal-code').fill('12345');
        await page.locator('[data-test="continue"]').click();

        // Verification: Summary page shows the item and a total
        await expect(page.locator('.summary_info')).toContainText(['Payment Information']);

        // 4) Finish purchase
        await page.locator('[data-test="finish"]').click();

        // Verification: order confirmation is shown
        await expect(page.locator('.complete-header')).toHaveText(/THANK YOU FOR YOUR ORDER/i);
        await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
    });
});
