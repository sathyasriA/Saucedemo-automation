import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import { CartPage } from '../Pages/CartPage';

test('TC_06 - Verify all products are displayed', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify exactly 6 products
    await expect(productPage.products).toHaveCount(6);

    // Verify every product has a name
    await expect(productPage.productNames).toHaveCount(6);

    // Verify every product has a price
    await expect(productPage.productPrices).toHaveCount(6);

    // Verify every product has an image
    await expect(productPage.productImages).toHaveCount(6);

    // Verify every product has an Add to Cart button
    await expect(productPage.addToCartButtons).toHaveCount(6);

});

test('TC_07 - Verify sorting by Price Low to High', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await productPage.sortLowToHigh();

    const prices = await productPage.productPrices.allTextContents();

    const numericPrices = prices.map(price =>
        Number(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);

});

test('TC_08 - Add a single product to cart and verify badge count & button text', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await productPage.addProduct('sauce-labs-onesie');

    // Verify cart badge count
    await expect(productPage.cartBadge).toHaveText('1');

    // Verify Add to Cart button changes to Remove
    await expect(
        productPage.getRemoveButton('sauce-labs-onesie')
    ).toHaveText('Remove');

});

test('TC_09 - Add first 3 products and verify cart badge & cart items', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add first 3 products
    await productPage.addFirstNProducts(3);

    // Verify badge count on inventory page
    await expect(productPage.cartBadge).toHaveText('3');

});

test('TC_10 - Remove a product from inventory and verify badge count decreases', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add first 3 products
    await productPage.addFirstNProducts(3);

    // Verify badge count is 3
    await expect(productPage.cartBadge).toHaveText('3');

    // Remove the first product
    await productPage.removeFirstProduct();

    // Verify badge count decreases to 2
    await expect(productPage.cartBadge).toHaveText('2');

    // Navigate to cart
    await productPage.goToCart();

    // Verify only 2 products are present
    await expect(cartPage.cartItems).toHaveCount(2);

});