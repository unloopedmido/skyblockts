import { ToolkitClient } from "../ToolkitClient";
import type { BazaarItem } from "@skyblock-ts/core";

export class Bazaar {
    constructor(private client: ToolkitClient) { }

    /**
     * List every product in the Bazaar.
     * @returns A map of productKey→BazaarItem (empty if the API fails).
     */
    async listProducts(): Promise<Record<string, BazaarItem>> {
        return this.client.getCached("bazaar:products", async () => {
            const { products, success } = await this.client.core.bazaar.bazaar();
            return success && products ? products : {};
        });
    }

    /**
     * Get a single Bazaar product by its key.
     * @param key The product key (e.g. "ENCHANTED_GOLD").
     * @returns The BazaarItem or null if not found.
     */
    async getProduct(key: string): Promise<BazaarItem | null> {
        const products = await this.listProducts();
        return products[key] ?? null;
    }
}
