import { CoreClient } from "../CoreClient";
import type { PlayerData, RecentGame, PlayerSession, Guild } from "../types/PlayerTypes";

type PlayerResponse = Readonly<{
    success: boolean;
    player: PlayerData;
}>;

type RecentGamesResponse = Readonly<{
    success: boolean;
    uuid: string;
    games: readonly RecentGame[];
}>;

type StatusResponse = Readonly<{
    success: boolean;
    uuid: string;
    session: PlayerSession;
}>;

type GuildResponse = Readonly<{
    success: boolean;
    guild: Guild;
}>;

export class Player {
    constructor(private client: CoreClient) {}

    async get(uuid: string): Promise<PlayerResponse> {
        const params = new URLSearchParams({ uuid });
        return this.client.doGet<PlayerResponse>(`player?${params.toString()}`);
    }

    async recentGames(uuid: string): Promise<RecentGamesResponse> {
        const params = new URLSearchParams({ uuid });
        return this.client.doGet<RecentGamesResponse>(`recentgames?${params.toString()}`);
    }

    async status(uuid: string): Promise<StatusResponse> {
        const params = new URLSearchParams({ uuid });
        return this.client.doGet<StatusResponse>(`status?${params.toString()}`);
    }

    async guild(filter: { id?: string; player?: string; name?: string }): Promise<GuildResponse> {
        const params = new URLSearchParams();
        if (filter.id) params.set("id", filter.id);
        if (filter.player) params.set("player", filter.player);
        if (filter.name) params.set("name", filter.name);
        return this.client.doGet<GuildResponse>(`guild?${params.toString()}`);
    }
}
