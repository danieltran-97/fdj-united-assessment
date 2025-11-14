import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('.inventory_list');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addItemToCart(itemName: string) {
        const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await item.locator('button').click();
    }

    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async expectItemInInventory(itemName: string) {
        await expect(this.inventoryContainer).toContainText(itemName);
    }
}
