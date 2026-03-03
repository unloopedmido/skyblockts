import { CoreClient, ClientConfig } from "@skyblock-ts/core";
import { Auctions } from "./modules/Auctions";
import { Bazaar } from "./modules/Bazaar";
import { Data } from "./modules/Data";
import { Misc } from "./modules/Misc";
import { Profiles } from "./modules/Profiles";

export interface ToolkitClientConfig extends ClientConfig {
    cacheTTL?: number;
    batchSize?: number;
}

export class ToolkitClient {
    public core: CoreClient;
    public config: ToolkitClientConfig;

    private cache = new Map<string, { expires: number, value: unknown }>();
    private cacheTTL: number;

    // Modules
    public auctions: Auctions;
    public bazaar: Bazaar;
    public data: Data;
    public misc: Misc;
    public profiles: Profiles;

    constructor(config: ToolkitClientConfig = {}) {
        this.auctions = new Auctions(this);
        this.bazaar = new Bazaar(this);
        this.data = new Data(this);
        this.misc = new Misc(this);
        this.profiles = new Profiles(this);

        this.config = config;
        this.core = new CoreClient(config);
        this.cacheTTL = config.cacheTTL ?? 3 * 1000 * 60; // Default cache TTL is 3 minutes
    }

    async getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
        const now = Date.now();
        const hit = this.cache.get(key);

        if (hit && hit.expires > now) {
            return hit.value as T;
        }

        const val = await fetcher();
        this.cache.set(key, { expires: now + this.cacheTTL, value: val });
        
        return val;
    }
}