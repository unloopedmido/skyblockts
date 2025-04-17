import { CoreClient } from "../CoreClient";
import { BazaarItem } from "../types/BazaarTypes";

type BazaarResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    products: BazaarItem[];
}>;

export class Bazaar {
    constructor(private client: CoreClient) { }

    /**
     * Product Description
        The returned product info has 3 main fields:

        buy_summary
        sell_summary
        quick_status
        buy_summary and sell_summary are the current top 30 orders for each transaction type (in-game example: Stock of Stonks).

        quick_status is a computed summary of the live state of the product (used for advanced mode view in the bazaar):

        sellVolume and buyVolume are the sum of item amounts in all orders.
        sellPrice and buyPrice are the weighted average of the top 2% of orders by volume.
        movingWeek is the historic transacted volume from last 7d + live state.
        sellOrders and buyOrders are the count of active orders.
     * @returns {BazaarResponse} Returns the list of products along with their sell summary, buy summary and quick status.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1bazaar/get
     */
    async bazaar(): Promise<BazaarResponse> {
        return this.client.doGet<BazaarResponse>("skyblock/bazaar");
    }
}