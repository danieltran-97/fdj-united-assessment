import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { LOGIN_USERNAME, LOGIN_PASSWORD } from './constants';

test.describe('SauceDemo POM example', () => {
    test('login, add item to cart, verify', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);

        await login.goto();
        await login.login(LOGIN_USERNAME, LOGIN_PASSWORD);

        // Verify we're on inventory page
        await inventory.expectItemInInventory('Sauce Labs Backpack');

        // Add item to cart
        await inventory.addItemToCart('Sauce Labs Backpack');
        await inventory.openCart();

        // Verify item in cart
        await cart.expectItemInCart('Sauce Labs Backpack');
    });
});
