import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly shoppingCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('.inventory_list');
        this.shoppingCart = page.locator('.shopping_cart_link');
    }

    async addItemToCart(itemName: string) {
        const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.shoppingCart.click();
    }

    async expectItemInInventory(itemName: string) {
        await expect(this.inventoryContainer).toContainText(itemName);
    }
}
