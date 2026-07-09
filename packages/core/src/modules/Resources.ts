import { CoreClient } from "../CoreClient";
import type { GameInfo, Achievement, Challenge, Quest, VanityPet, VanityCompanion, VanityRarity, ResourcePack } from "../types/ResourceTypes";

type GamesResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    games: Record<string, GameInfo>;
}>;

type AchievementsResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    achievements: Record<string, Achievement>;
}>;

type ChallengesResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    challenges: Record<string, Challenge>;
}>;

type QuestsResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    quests: Record<string, Quest>;
}>;

type GuildAchievementsResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    one_time: Record<string, any>;
    tiered: Record<string, any>;
}>;

type VanityPetsResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    types: Record<string, VanityPet>;
    rarities: Record<string, VanityRarity>;
}>;

type VanityCompanionsResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    types: Record<string, VanityCompanion>;
    rarities: Record<string, VanityRarity>;
}>;

type ResourcePacksResponse = Readonly<{
    success: boolean;
    packs: readonly ResourcePack[];
}>;

export class Resources {
    constructor(private client: CoreClient) {}

    async games(): Promise<GamesResponse> {
        return this.client.doGet<GamesResponse>("resources/games");
    }

    async achievements(): Promise<AchievementsResponse> {
        return this.client.doGet<AchievementsResponse>("resources/achievements");
    }

    async challenges(): Promise<ChallengesResponse> {
        return this.client.doGet<ChallengesResponse>("resources/challenges");
    }

    async quests(): Promise<QuestsResponse> {
        return this.client.doGet<QuestsResponse>("resources/quests");
    }

    async guildAchievements(): Promise<GuildAchievementsResponse> {
        return this.client.doGet<GuildAchievementsResponse>("resources/guilds/achievements");
    }

    async vanityPets(): Promise<VanityPetsResponse> {
        return this.client.doGet<VanityPetsResponse>("resources/vanity/pets");
    }

    async vanityCompanions(): Promise<VanityCompanionsResponse> {
        return this.client.doGet<VanityCompanionsResponse>("resources/vanity/companions");
    }

    async resourcePacks(): Promise<ResourcePacksResponse> {
        return this.client.doGet<ResourcePacksResponse>("resources/packs");
    }
}
