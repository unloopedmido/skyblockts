import { SkyblockTS } from "../SkyblockTS";
import { AuctionItem } from "../types/auction";

export type Tier =
	| "COMMON"
	| "UNCOMMON"
	| "RARE"
	| "EPIC"
	| "LEGENDARY"
	| "MYTHIC"
	| "DIVINE"
	| "SPECIAL"
	| "SUPERIOR"
	| "ULTIMATE";

export class Auctions {
	private cache: { auctions: AuctionItem[] | null; timestamp: number } = {
		auctions: null,
		timestamp: 0,
	};

	constructor(private client: SkyblockTS) { }

	private filterAuctions(
		auctions: AuctionItem[],
		options: {
			tier?: Tier;
			minPrice?: number;
			maxPrice?: number;
			binOnly?: boolean;
			itemName?: string;
			auctioneer?: string;
		},
	): AuctionItem[] {
		return auctions.filter((auction) => {
			let isValid = true;
			if (options.tier && auction.tier !== options.tier) isValid = false;
			if (options.minPrice && auction.starting_bid < options.minPrice)
				isValid = false;
			if (options.maxPrice && auction.starting_bid > options.maxPrice)
				isValid = false;
			if (options.binOnly && !auction.bin) isValid = false;
			if (
				options.itemName &&
				!auction.item_name
					.toLowerCase()
					.includes(options.itemName.toLowerCase())
			)
				isValid = false;
			if (options.auctioneer && auction.auctioneer !== options.auctioneer)
				isValid = false;
			return isValid;
		});
	}

	private async getAuctionsWithCache(): Promise<AuctionItem[]> {
		if (
			this.cache.auctions &&
			Date.now() - this.cache.timestamp < this.client.config.cacheTTL
		) {
			return this.cache.auctions!;
		}

		return await this.all();
	}

	/**
	 * Fetches auctions that match the given filter options. This method caches the results for the duration of the cacheTTL (configurable on client initalization).
	 * If the cache is still valid, it returns the cached data instead of making a new API call.
	 * @param {Object} options - The filter options for fetching auctions.
	 * @param {Tier} [options.tier] - The tier of the item.
	 * @param {number} [options.minPrice] - The minimum starting bid price.
	 * @param {number} [options.maxPrice] - The maximum starting bid price.
	 * @param {boolean} [options.binOnly] - Whether to only include BIN auctions.
	 * @param {string} [options.itemName] - The name of the item to filter by.
	 * @param {string} [options.auctioneer] - The UUID of the auctioneer to filter by.
	 * @returns {Promise<AuctionItem[] | null>} A promise that resolves to an array of auction items or null if not found.
	 */
	async filter(options: {
		tier?: Tier;
		minPrice?: number;
		maxPrice?: number;
		binOnly?: boolean;
		itemName?: string;
		auctioneer?: string;
	}): Promise<AuctionItem[] | null> {
		const auctions = await this.getAuctionsWithCache();
		return this.filterAuctions(auctions, options) || [];
	}

	/**
	 * Fetches auctions that match the given query. This method caches the results for the duration of the cacheTTL (configurable on client initalization).
	 * If the cache is still valid, it returns the cached data instead of making a new API call.
	 * @param {string} query - The search query to filter auctions by item name.
	 * @returns {Promise<AuctionItem[] | null>} A promise that resolves to an array of auction items or null if not found.
	 */
	async search(query: string): Promise<AuctionItem[] | null> {
		const auctions = await this.getAuctionsWithCache();
		return (
			auctions.filter((auction) =>
				auction.item_name.toLowerCase().includes(query.toLowerCase()),
			) || []
		);
	}

	/**
	 * Fetches auctions for a specific auctioneer by their UUID. This method caches the results for the duration of the cacheTTL (configurable on client initalization).
	 * If the cache is still valid, it returns the cached data instead of making a new API call.
	 * @param {string} auctioneerUUID - The UUID of the auctioneer to fetch auctions for.
	 * @returns {Promise<AuctionItem[] | null>} A promise that resolves to an array of auction items or null if not found.
	 */
	async getAuctioneer(auctioneerUUID: string): Promise<AuctionItem[] | null> {
		const auctions = await this.getAuctionsWithCache();
		return (
			auctions.filter((auction) => auction.auctioneer === auctioneerUUID) || []
		);
	}

	/**
	 * Fetches a specific auction by its UUID. This method caches the results for the duration of the cacheTTL (configurable on client initalization).
	 * If the cache is still valid, it returns the cached data instead of making a new API call.
	 * @param {string} auctionUUID - The UUID of the auction to fetch.
	 * @returns {Promise<AuctionItem | null>} A promise that resolves to the auction item or null if not found.
	 */
	async get(auctionUUID: string): Promise<AuctionItem | null> {
		const auctions = await this.getAuctionsWithCache();
		return auctions.find((auction) => auction.uuid === auctionUUID) || null;
	}

	/**
	 * Fetches all auctions from the API. This method caches the results for the duration of the cacheTTL (configurable on client initalization).
	 * If the cache is still valid, it returns the cached data instead of making a new API call.
	 * @returns {Promise<AuctionItem[]>} A promise that resolves to an array of auction items.
	 */
	async all(): Promise<AuctionItem[]> {
		try {
			const initialData = await this.client.fetcher.fetch<{ totalPages: number, auctions: AuctionItem[] }>("skyblock/auctions", false);
			const { totalPages } = initialData;
			const batchSize = this.client.config.batchSize;
			let allAuctions: AuctionItem[] = [...initialData.auctions];

			for (let i = 0; i < totalPages - 1; i += batchSize) {
				const batch = Array.from({
					length: Math.min(batchSize, totalPages - 1 - i),
				}).map((_, idx) => {
					const page = i + idx + 1;
					return this.client.fetcher.fetch<{auctions: AuctionItem[]}>(`skyblock/auctions?page=${page}`, false)
						.then((data) => data.auctions)
						.catch((err) => {
							console.error(`[SkyblockTS] Error fetching page ${page}:`, err);
							return [];
						});
				});

				const batchResults = await Promise.all(batch);
				allAuctions = allAuctions.concat(...batchResults);
			}

			this.cache.auctions = allAuctions;
			this.cache.timestamp = Date.now();

			return allAuctions;
		} catch (error) {
			console.error(`[SkyblockTS] Error fetching auctions:`, error);

			if (this.cache.auctions) {
				console.warn(`[SkyblockTS] Returning cached auctions data`);
				return this.cache.auctions;
			}

			throw error;
		}
	}

	/**
	 * Resets the cache for auctions.
	 */
	resetCache() {
		this.cache.auctions = null;
		this.cache.timestamp = 0;
	}

	/**
	 * Refreshes the cache by fetching all auctions again.
	 */
	async refreshCache() {
		this.resetCache();
		await this.all();
	}
}
