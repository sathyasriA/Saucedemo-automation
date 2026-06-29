import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';

test('TC_12 - Complete checkout successfully with valid customer information', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add a product
    await productPage.addProduct('sauce-labs-backpack');

    // Go to cart
    await productPage.goToCart();

    // Checkout
    await checkoutPage.checkoutButton.click();

    // Enter customer details
    await checkoutPage.enterCustomerDetails(
        'Sathya',
        'Sri',
        '600001'
    );

    await checkoutPage.continueCheckout();

    // Finish checkout
    await checkoutPage.finishCheckout();

    // Verify order success
    await expect(checkoutPage.successMessage)
        .toHaveText('Thank you for your order!');
});

test('TC_13 - Attempt checkout without entering mandatory fields', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add a product
    await productPage.addProduct('sauce-labs-backpack');

    // Navigate to cart
    await productPage.goToCart();

    // Open checkout page
    await checkoutPage.clickCheckout();
    await checkoutPage.clickContinue();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(
    'Error: First Name is required'
);

});