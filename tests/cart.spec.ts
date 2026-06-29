import { test,expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';

test('TC_11 - Verify selected products are displayed correctly in the Cart page', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add two specific products
    await productPage.addProduct('sauce-labs-backpack');
    await productPage.addProduct('sauce-labs-bike-light');

    // Open Cart
    await productPage.goToCart();

    // Verify only two products are present
    await expect(cartPage.cartItems).toHaveCount(2);

    // Verify product names
    await expect(cartPage.productNames).toContainText([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light'
    ]);

});



