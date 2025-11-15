import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
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
