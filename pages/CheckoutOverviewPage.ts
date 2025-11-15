import { Page, Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly summaryContainer: Locator;
    readonly summaryInfo: Locator;
    readonly itemRows: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.summaryContainer = page.locator('.checkout_summary_container');
        this.summaryInfo = page.locator('.summary_info');
        this.itemRows = page.locator('.cart_item');
        this.subtotalLabel = page.getByText(/^Item total:/);
        this.taxLabel = page.getByText(/^Tax:/);
        this.totalLabel = page.getByText(/^Total:/);
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async expectVisible() {
        await expect(this.summaryContainer).toBeVisible();
    }

    async itemCount(): Promise<number> {
        return await this.itemRows.count();
    }

    async expectItemPresent(itemName: string) {
        await expect(this.itemRows.filter({ hasText: itemName })).toHaveCount(1);
    }

    /** Get item price text for a given item name (e.g. "$29.99") */
    async getItemPrice(itemName: string): Promise<string> {
        const item = this.itemRows.filter({ hasText: itemName }).locator('.inventory_item_price');
        return (await item.first().textContent())?.trim() ?? '';
    }

    /** Parse a price text like "$29.99" into a number */
    parsePrice(text: string): number {
        const cleaned = text.replace(/[^0-9.\-]/g, '');
        return cleaned ? Number(cleaned) : 0;
    }

    async getSubtotal(): Promise<number> {
        const txt = (await this.subtotalLabel.textContent()) ?? '';
        // subtotal label usually like "Item total: $29.99"
        return this.parsePrice(txt);
    }

    async getTax(): Promise<number> {
        const txt = (await this.taxLabel.textContent()) ?? '';
        return this.parsePrice(txt);
    }

    async getTotal(): Promise<number> {
        const txt = (await this.totalLabel.textContent()) ?? '';
        return this.parsePrice(txt);
    }

    async finish() {
        await this.finishButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }


    async expectSummaryInfo() {
        await expect(this.summaryInfo).toContainText(['Payment Information']);
        await expect(this.summaryInfo).toContainText(['Shipping Information']);
        await expect(this.summaryInfo).toContainText(['Price Total']);
    }
}
