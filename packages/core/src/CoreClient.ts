import { Profile } from "./modules/Profile";
import { Auction } from "./modules/Auction";
import { Fetcher } from "./utils/fetcher";
import { Bazaar } from "./modules/Bazaar";
import { Data } from "./modules/Data";
import { Misc } from "./modules/Misc";
import { Player } from "./modules/Player";
import { Resources } from "./modules/Resources";
import { Housing } from "./modules/Housing";
import { Other } from "./modules/Other";
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
    public player: Player;
    public resources: Resources;
    public housing: Housing;
    public other: Other;

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
        this.player = new Player(this);
        this.resources = new Resources(this);
        this.housing = new Housing(this);
        this.other = new Other(this);
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

    public async doGetRaw<T>(path: string): Promise<T> {
        return this.fetcher.fetch<T>(path);
    }
}