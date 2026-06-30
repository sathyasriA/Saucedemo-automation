import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';

test('TC_01 - Login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await expect(page.locator('.title'))
        .toHaveText('Products');

});

test('TC_02 - Login with invalid username and verify error message', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'standard_user122',
        'secret_sauce'
    );
    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

});

test('TC_03 - Login with invalid password and verify error message', async ({ page }) => {

    const loginPage = new LoginPage(page);


    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'secret_saucess'
    );
    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

});

test('TC_04 - Verify locked account error', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
    );

});

test('TC_05 - Verify validation messgae by using empty credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username is required'
    );

});

