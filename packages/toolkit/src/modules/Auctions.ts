import type { AuctionItem, ItemTier } from '@skyblock-ts/core';
import { ToolkitClient } from "../ToolkitClient";

interface AuctionFilter {
    auctionUUID?: string;
    auctioneerID?: string;
    profileID?: string;
    itemName?: string;
    itemUUID?: string;
    category?: string;
    tier?: ItemTier;
    minPrice?: number;
    maxPrice?: number;
    binOnly?: boolean;
}

export class Auctions {
    constructor(private client: ToolkitClient) { }

    /**
     * Get all the auctions from the auction house. (This is a cached method and doesn't require an API key.)
     * @returns {Promise<AuctionItem[]>} An array of auction items.
     */
    async all(): Promise<AuctionItem[]> {
        return this.client.getCached("auctions:all", async () => {
            const { auctions: first, totalPages } = await this.client.core.auction.activeAuctions(0);
            const all: AuctionItem[] = [...first];
            const size = this.client.config.batchSize ?? 10;

            for (let p = 1; p < totalPages; p += size) {
                const pages = Array.from({ length: Math.min(size, totalPages - p) }, (_, i) => p + i);

                const batches = await Promise.all(
                    pages.map(pg => this.client.core.auction.activeAuctions(pg))
                );

                for (const r of batches) all.push(...r.auctions);
            }

            return all;
        })
    }

    /**
     * Get all the auctions that match the given filter. (This is a cached method and doesn't require an API key.)
     * @param {AuctionFilter} f The filter to apply to the auctions.
     * @returns {Promise<AuctionItem[]>} An array of auction items.
     */
    async get(f: AuctionFilter): Promise<AuctionItem[]> {
        const all = await this.all();
        return all.filter(a =>
            (!f.auctionUUID || a.uuid === f.auctionUUID) &&
            (!f.auctioneerID || a.auctioneer === f.auctioneerID) &&
            (!f.profileID || a.profile_id === f.profileID) &&
            (!f.itemUUID || a.item_uuid === f.itemUUID) &&
            (!f.itemName || a.item_name === f.itemName) &&
            (!f.category || a.category === f.category) &&
            (!f.tier || a.tier === f.tier) &&
            (!f.minPrice || a.starting_bid >= f.minPrice) &&
            (!f.maxPrice || a.starting_bid <= f.maxPrice) &&
            (!f.binOnly || a.bin === true)
        );
    }


    /**
     * Get the auction with the lowest BIN price that matches the given filter. (This is a cached method and doesn't require an API key.)
     * @param {AuctionFilter} filter The filter to apply to the auctions.
     * @returns {Promise<AuctionItem | null>} The auction item with the lowest BIN price or null if no auctions match the filter.
     */
    async lowestBIN(filter: AuctionFilter): Promise<AuctionItem | null> {
        const auctions = await this.get(filter);

        if (auctions.length === 0) return null;

        return auctions.reduce((prev, curr) => {
            return prev.starting_bid < curr.starting_bid ? prev : curr;
        });
    }

    /**
     * Get the lowest BIN prices of the auctions that match the given filter. (This is a cached method and doesn't require an API key.)
     * @param {AuctionFilter[]} filters The filters to apply to the auctions.
     * @returns {Promise<Record<string, number>>} An object mapping item names to their BIN prices.
     */
    async lowestBINs(filters: AuctionFilter[]): Promise<Record<string, number>> {
        const entries = await Promise.all(
            filters.map(async (f) => {
                const auc = await this.lowestBIN(f);
                const key = f.itemName ?? f.itemUUID!;
                return [key, auc?.starting_bid ?? 0] as const;
            })
        );
        
        return Object.fromEntries(entries);
    }


    /**
     * Get the average price of the auctions that match the given filter. (This is a cached method and doesn't require an API key.)
     * @param filter The filter to apply to the auctions.
     * @returns {Promise<number>} The average price of the auctions that match the filter.
     */
    async averagePrice(filter: AuctionFilter): Promise<number> {
        const auctions = await this.get(filter);

        if (auctions.length === 0) return 0;

        const total = auctions.reduce((acc, auction) => acc + auction.starting_bid, 0);
        return total / auctions.length;
    }
}