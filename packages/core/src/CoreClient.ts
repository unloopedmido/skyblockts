import { Profile } from "./modules/Profile";
import { Auction } from "./modules/Auction";
import { Fetcher } from "./utils/fetcher";
import { Bazaar } from "./modules/Bazaar";
import { Data } from "./modules/Data";
import { Misc } from "./modules/Misc";
import HypixelApiError from "./errors/HypixelApiError";

export interface ClientConfig {
    APIKey?: string;
}

export class CoreClient {
    public config: ClientConfig;

    // Modules
    public fetcher: Fetcher;
    public auction: Auction;
    public bazaar: Bazaar;
    public data: Data;
    public misc: Misc;
    public profile: Profile;

    constructor(
        config: ClientConfig,
    ) {
        this.config = {
            APIKey: config.APIKey,
        };

        this.fetcher = new Fetcher(this)
        this.auction = new Auction(this);
        this.bazaar = new Bazaar(this);
        this.data = new Data(this);
        this.misc = new Misc(this);
        this.profile = new Profile(this);
    }

    public async doGet<T extends { success: boolean }>(path: string): Promise<T> {
        try {
            const response = await this.fetcher.fetch<T>(path);

            if (!response.success) {
                throw new HypixelApiError(path, "success=false");
            }

            return response;
        } catch (error) {
            throw new HypixelApiError(path, error as string);
        }
    }
}