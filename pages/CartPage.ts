import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async expectItemInCart(itemName: string) {
        await expect(this.cartItems).toContainText(itemName);
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}
