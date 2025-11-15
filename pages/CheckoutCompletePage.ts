import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.getByRole('heading', { name: 'Thank you for your order' });
        this.completeText = page.getByText('Your order has been dispatched');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    }

    async expectSelectorsVisible() {
        await expect(this.completeHeader).toBeVisible();
        await expect(this.completeText).toBeVisible();
    }

    async backToProducts() {
        await this.backHomeButton.click();
    }
}
