import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import { CartPage } from '../Pages/CartPage';

test.describe('Menu Tests', () => {

    test('TC_14- Logout successfully and verify protected pages cannot be accessed', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await productPage.logout();

        // Verify user is redirected to login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();

        // Try accessing Inventory page directly
        await page.goto('https://www.saucedemo.com/inventory.html');

        // Verify user is redirected back to login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await expect(loginPage.errorMessage).toHaveText(
            /Epic sadface: You can only access '\/[^']+' when you are logged in\./
        );

    });


    test('TC_15 - Verify About menu redirects to Sauce Labs website', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await productPage.clickAbout();

        // Verify redirected to Sauce Labs website
        await expect(page).toHaveURL(/saucelabs\.com/);

    });


    test('TC_16 - Verify Reset App State clears the shopping cart', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // Add first two products
        await productPage.addFirstNProducts(2);

        // Verify cart badge
        await expect(productPage.cartBadge).toHaveText('2');

        // Reset app state
        await productPage.resetAppState();

        // Verify cart badge disappears
        await expect(productPage.cartBadge).toHaveCount(0);

        // Navigate to cart
        await productPage.goToCart();

        // Verify cart is empty
        await expect(cartPage.cartItems).toHaveCount(0);

    });

});