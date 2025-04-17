import { CoreClient } from "../CoreClient";
import type { BingoGoal, Election, Mayor, NewsItem } from "../types/MiscTypes";

type ElectionAndMayorResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    mayor: Mayor;
    current: Election;
}>;

type CurrentBingoEventResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    name: string;
    start: number;
    end: number;
    modifier: string;
    goals: BingoGoal[];
}>;

type NewsResponse = Readonly<{
    success: boolean;
    items: NewsItem[];
}>;

type ActiveUpcomingFireSalesResponse = Readonly<{
    success: boolean
    sales: readonly Readonly<{
        item_id: string
        start: number
        end: number
        amount: number
        price: number
    }>[]
}>

export class Misc {
    constructor(private client: CoreClient) { }

    /**
     * @returns {NewsResponse} Information regarding the latest news on Hypixel.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1news/get
     */
    async news(): Promise<NewsResponse> {
        return this.client.doGet<NewsResponse>("skyblock/news");
    }

    /**
     * @returns {ElectionAndMayorResponse} Information regarding the current mayor and ongoing election in SkyBlock.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1resources~1skyblock~1election/get
     */
    async electionAndMayor(): Promise<ElectionAndMayorResponse> {
        return this.client.doGet<ElectionAndMayorResponse>("resources/skyblock/election");
    }

    /**
     * @returns {CurrentBingoEventResponse} Information regarding the current bingo event and its goals.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1resources~1skyblock~1bingo/get
     */
    async currentBingoEvent(): Promise<CurrentBingoEventResponse> {
        return this.client.doGet<CurrentBingoEventResponse>("resources/skyblock/bingo");
    }

    /**
     * @returns {ActiveUpcomingFireSalesResponse} Retrieve the currently active or upcoming Fire Sales for SkyBlock.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1firesales/get
     */
    async activeUpcomingFireSales(): Promise<ActiveUpcomingFireSalesResponse> {
        return this.client.fetcher.fetch<ActiveUpcomingFireSalesResponse>(`skyblock/firesales`)
    }
}