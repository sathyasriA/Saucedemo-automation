import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(private page: Page) {

        this.checkoutButton = page.locator('#checkout');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.successMessage = page.locator('.complete-header');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async enterCustomerDetails(first: string, last: string, zip: string) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
    
    async completeCheckout(first: string, last: string, zip: string) {
        await this.enterCustomerDetails(first, last, zip);
        await this.continueButton.click();
        await this.finishButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

}