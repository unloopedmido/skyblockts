import { Auctions } from "./modules/Auctions";
import { Profiles } from "./modules/Profiles";
import Fetcher from "./utils/fetcher";

export interface SkyblockTSConfig {
	apiKey?: string;
	cacheTTL: number;
	batchSize: number;
}

export interface ConstructorConfig {
	apiKey?: string;
	cacheTTL?: number;
	batchSize?: number;
}

export class SkyblockTS {
	public config: SkyblockTSConfig;
	public auctions: Auctions;
	public profiles: Profiles;
	public fetcher: Fetcher;

	/**
	 * @param config - Configuration object
	 * @param config.apiKey - Hypixel API key
	 * @param config.cacheTTL - Cache time to live in milliseconds (default: 3 minutes)
	 * @param config.batchSize - Number of auctions to fetch in a single batch (default: 5)
	 */
	constructor(
		config: ConstructorConfig,
	) {
		this.fetcher = new Fetcher(this);
		this.auctions = new Auctions(this);
		this.profiles = new Profiles(this);
		this.config = {
			apiKey: config.apiKey,
			cacheTTL: config.cacheTTL ?? 1000 * 60 * 3,
			batchSize: config.batchSize ?? 5,
		};
	}
}
