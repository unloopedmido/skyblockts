import { ToolkitClient } from "../ToolkitClient";
import type { BingoGoal, Election, Mayor, NewsItem } from "@skyblock-ts/core";

export interface FireSaleItem {
    item_id: string;
    start: number;
    end: number;
    amount: number;
    price: number;
}

export class Misc {
    constructor(private client: ToolkitClient) {}

    /**
     * SkyBlock news (cached). Requires API key.
     */
    async getNews(): Promise<NewsItem[]> {
        return this.client.getCached("misc:news", async () => {
            const res = await this.client.core.misc.news();
            return [...(res.items ?? [])];
        });
    }

    /**
     * Current mayor and election (cached). Does not require an API key.
     */
    async getElection(): Promise<{ mayor: Mayor; current: Election }> {
        return this.client.getCached("misc:election", async () => {
            const res = await this.client.core.misc.electionAndMayor();
            return { mayor: res.mayor, current: res.current };
        });
    }

    /**
     * Current bingo event and goals (cached). Does not require an API key.
     */
    async getCurrentBingoEvent(): Promise<{
        id: number;
        name: string;
        start: number;
        end: number;
        modifier: string;
        goals: readonly BingoGoal[];
    } | null> {
        return this.client.getCached("misc:bingo", async () => {
            const res = await this.client.core.misc.currentBingoEvent();
            const r = res as { id?: number; name: string; start: number; end: number; modifier: string; goals?: readonly BingoGoal[] };
            return {
                id: r.id ?? 0,
                name: r.name,
                start: r.start,
                end: r.end,
                modifier: r.modifier,
                goals: r.goals ?? [],
            };
        });
    }

    /**
     * Active and upcoming Fire Sales (cached). Does not require an API key.
     */
    async getFiresales(): Promise<FireSaleItem[]> {
        return this.client.getCached("misc:firesales", async () => {
            const res = await this.client.core.misc.activeUpcomingFireSales();
            return [...(res.sales ?? [])];
        });
    }
}
