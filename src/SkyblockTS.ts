import { Auctions } from "./modules/Auctions";

export class SkyblockTS {
	public apiKey?: string;
	public auctions: Auctions;
	public cacheTTL: number;
	public batchSize: number;

	/**
	 * @param config - Configuration object
	 * @param config.apiKey - Hypixel API key
	 * @param config.cacheTTL - Cache time to live in milliseconds (default: 3 minutes)
	 * @param config.batchSize - Number of auctions to fetch in a single batch (default: 5)
	 */
	constructor(
		config: { apiKey?: string; cacheTTL?: number; batchSize?: number } = {},
	) {
		this.apiKey = config.apiKey;
		this.auctions = new Auctions(this);
		this.cacheTTL = config.cacheTTL || 1000 * 60 * 3; // 3 minutes
		this.batchSize = config.batchSize || 5; // 5 calls per batch
	}
}
