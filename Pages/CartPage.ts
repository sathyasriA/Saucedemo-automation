import { Page, Locator } from '@playwright/test';

export class CartPage {

    readonly cartItems: Locator;
    readonly productNames: Locator;

    constructor(private page: Page) {

        this.cartItems = page.locator('.cart_item');
        this.productNames = page.locator('.inventory_item_name');

    }

}