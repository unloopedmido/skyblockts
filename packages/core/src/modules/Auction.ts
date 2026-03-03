import type { CoreClient } from "../CoreClient";
import type { AuctionItem, EndedAuction } from "../types/AuctionTypes";

type RequestAuctionsResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    auctions: AuctionItem[];
}>;

type ActiveAuctionsResponse = Readonly<{
    success: boolean;
    page: number;
    totalPages: number;
    totalAuctions: number;
    lastUpdated: number;
    auctions: AuctionItem[];
}>;

type RecentlyEndedAuctionsResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    auctions: readonly EndedAuction[];
}>;

type AuctionFilter =
    | { uuid: string; player?: never; profile?: never }
    | { player: string; uuid?: never; profile?: never }
    | { profile: string; uuid?: never; player?: never };

export class Auction {
    constructor(private client: CoreClient) {}

    /**
     * Request auction(s) by auction UUID, player UUID, or profile UUID. Only one query parameter per request.
     * Requires API key.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1auction/get
     */
    async requestAuctions(filter: AuctionFilter): Promise<RequestAuctionsResponse> {
        const params = new URLSearchParams(Object.entries(filter) as [string, string][]);
        return this.client.doGet<RequestAuctionsResponse>(`skyblock/auction?${params.toString()}`);
    }

    /**
     * Active auctions, sorted by last updated, paginated. Does not require API key.
     * @param page Page number (default 0). 404 if page does not exist.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1auctions/get
     */
    async activeAuctions(page: number = 0): Promise<ActiveAuctionsResponse> {
        const params = new URLSearchParams({ page: page.toString() });
        return this.client.doGet<ActiveAuctionsResponse>(`skyblock/auctions?${params.toString()}`);
    }

    /**
     * SkyBlock auctions which ended in the last 60 seconds. Does not require API key.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1auctions_ended/get
     */
    async recentlyEndedAuctions(): Promise<RecentlyEndedAuctionsResponse> {
        return this.client.doGet<RecentlyEndedAuctionsResponse>("skyblock/auctions_ended");
    }
}