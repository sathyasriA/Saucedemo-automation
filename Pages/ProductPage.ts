
import { Page, Locator } from '@playwright/test';

export class ProductPage {

    readonly products: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productImages: Locator;
    readonly addToCartButtons: Locator;
    readonly sortDropdown: Locator;
    readonly cartBadge: Locator;
    readonly removeButtons: Locator;
    readonly cartIcon : Locator;
   readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly aboutLink: Locator;
    readonly resetAppStateLink: Locator;
    readonly closeMenuButton: Locator;


    constructor(private page: Page) {
        this.products = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productImages = page.locator('.inventory_item_img img');
        this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
        this.sortDropdown = page.locator('.product_sort_container');
        this.cartBadge = this.page.locator('.shopping_cart_badge');
        this.removeButtons = page.locator('button[data-test^="remove"]');
        this.cartIcon =  page.locator('[data-test="shopping-cart-link"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.aboutLink = page.locator('#about_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');

    }

    async sortLowToHigh() {
        await this.sortDropdown.selectOption('lohi');
    }

    getAddToCartButton(productName: string): Locator {
        return this.page.locator(`[data-test="add-to-cart-${productName}"]`);
    }

    getRemoveButton(productName: string): Locator {
        return this.page.locator(`[data-test="remove-${productName}"]`);
    }

    async addProduct(productName: string) {
        await this.getAddToCartButton(productName).click();
    }

    async addFirstNProducts(count: number) {
        for (let i = 0; i < count; i++) {
            await this.addToCartButtons.nth(i).click();
        }
    }

    async removeFirstProduct() {
        await this.removeButtons.first().click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async openMenu() {
    await this.menuButton.click();
    }

    async logout() {
        await this.openMenu();
        await this.logoutLink.click();
    }

    async clickAbout() {
        await this.openMenu();
        await this.aboutLink.click();
    }

    async resetAppState() {
        await this.openMenu();
        await this.resetAppStateLink.click();
    }

    async closeMenu() {
        await this.closeMenuButton.click();
    }
}