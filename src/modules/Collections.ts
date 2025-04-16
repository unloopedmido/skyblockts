import { SkyblockTS } from "../SkyblockTS";
import { Collection } from "../types/collection";

export class Collections {
    private cached: Record<string, Collection> = {};

    constructor(private client: SkyblockTS) {}

    private async getCollectionsWithCache(): Promise<Record<string, Collection>> {
        if (Object.keys(this.cached).length === 0) {
            this.cached = await this.all();
        }

        return this.cached;
    }

    /**
     * Fetches all collections from the API and caches them.
     * This method caches the results indefinitely as collections are not expected to change frequently.
     * @returns {Promise<Record<string, Collection>>} A promise that resolves to a record of collections.
     */
    async all(): Promise<Record<string, Collection>> {
        const collections = await this.client.fetcher.fetch<{ collections: Record<string, Collection> }>('resources/skyblock/collections', false);
        this.cached = collections.collections;

        return this.cached;
    }

    /**
     * Fetches a specific collection from the cache or API.
     * If the collection is not in the cache, it will be fetched from the API and cached.
     * @param {string} collection - The name of the collection to fetch.
     * @returns {Promise<Collection>} A promise that resolves to the requested collection.
     */
    async get(collection: string): Promise<Collection | null> {
        const collections = await this.getCollectionsWithCache();

        return collections[collection.toUpperCase()] || null;
    }

    /**
     * Clears the in-memory cache.
     */
    resetCache() {
        this.cached = {};
    }
}