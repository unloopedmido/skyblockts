import type { CoreClient } from "../CoreClient";
import type { AuctionItem } from "../types/AuctionTypes";

type BaseResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    auctions: AuctionItem[];
}>;

type ActiveAuctionsResponse = BaseResponse & Readonly<{
    page: number;
    totalPages: number;
    totalAuctions: number;
}>;

type AuctionFilter =
    | { uuid: string; player?: never; profile?: never }
    | { player: string; uuid?: never; profile?: never }
    | { profile: string; uuid?: never; player?: never };

export class Auction {
    constructor(private client: CoreClient) { }

    /**
     * @param uuid The auction UUID that you wish to request
     * @param player The player UUID that you wish to request
     * @param profile The profile UUID that you wish to request
     * @returns {RequestAuctionsResponse} Returns the auctions selected by the provided query. Only one query parameter can be used in a single request, and cannot be filtered by multiple.
    * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1auction/get 
    */
    async requestAuctions(filter: AuctionFilter)
        : Promise<BaseResponse> {
        const params = new URLSearchParams(Object.entries(filter));

        return this.client.doGet<BaseResponse>(
            `skyblock/auction?${params.toString()}`
        );
    }
    /**
     * @param page (default: 0) The page of auctions to return
     * @returns {ActiveAuctionsResponse} Returns the currently active auctions sorted by last updated first and paginated.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1auctions/get
    */
    async activeAuctions(page: number = 0): Promise<ActiveAuctionsResponse> {
        const params = new URLSearchParams({ page: page.toString() });

        return this.client.doGet<ActiveAuctionsResponse>(
            `skyblock/auctions?${params.toString()}`
        );
    }

    /**
     * @returns {RecentlyEndedAuctionsResponse} SkyBlock auctions which ended in the last 60 seconds.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1auctions_ended/get
     */
    async recentlyEndedAuctions(): Promise<BaseResponse> {
        return this.client.doGet<BaseResponse>(
            `skyblock/auctions_ended`
        );
    }
}