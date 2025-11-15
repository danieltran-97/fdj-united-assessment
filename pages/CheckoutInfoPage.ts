import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    /** Fill the checkout information fields */
    async fillFirstName(name: string) {
        await this.firstNameInput.fill(name);
    }

    async fillLastName(name: string) {
        await this.lastNameInput.fill(name);
    }

    async fillPostalCode(code: string) {
        await this.postalCodeInput.fill(code);
    }

    /** Fill all fields and click continue */
    async fillAndContinue(first: string, last: string, postal: string) {
        await this.fillFirstName(first);
        await this.fillLastName(last);
        await this.fillPostalCode(postal);
        await this.continueButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    /** Wait until the checkout info page is visible */
    async expectVisible() {
        await expect(this.firstNameInput).toBeVisible();
    }
}
