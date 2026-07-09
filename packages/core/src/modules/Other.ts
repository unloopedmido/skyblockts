import { CoreClient } from "../CoreClient";
import type { Booster, BoosterState, GameCounts, Leaderboard } from "../types/OtherTypes";

type BoostersResponse = Readonly<{
    success: boolean;
    boosters: readonly Booster[];
    boosterState: BoosterState;
}>;

type CountsResponse = Readonly<{
    success: boolean;
    playerCount: number;
    games: Record<string, GameCounts>;
}>;

type LeaderboardsResponse = Readonly<{
    success: boolean;
    leaderboards: Record<string, Leaderboard[]>;
}>;

type PunishmentStatsResponse = Readonly<{
    success: boolean;
    watchdog_lastMinute: number;
    staff_rollingDaily: number;
    watchdog_total: number;
    watchdog_rollingDaily: number;
    staff_total: number;
}>;

export class Other {
    constructor(private client: CoreClient) {}

    async boosters(): Promise<BoostersResponse> {
        return this.client.doGet<BoostersResponse>("boosters");
    }

    async counts(): Promise<CountsResponse> {
        return this.client.doGet<CountsResponse>("counts");
    }

    async leaderboards(): Promise<LeaderboardsResponse> {
        return this.client.doGet<LeaderboardsResponse>("leaderboards");
    }

    async punishmentStats(): Promise<PunishmentStatsResponse> {
        return this.client.doGet<PunishmentStatsResponse>("punishmentstats");
    }
}
