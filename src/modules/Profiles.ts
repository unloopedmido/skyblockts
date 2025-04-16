import { SkyblockTS } from "../SkyblockTS";
import { Profile } from "../types/profile";

type CacheEntry<T> = {
    data: T;
    expiry: number;
};

export class Profiles {
    private cache: Map<string, CacheEntry<Profile | Profile[]>> = new Map();

    constructor(private client: SkyblockTS) { }

    private handleError(error: unknown): string {
        if (error instanceof Error) {
            if (error.message.includes("[SkyblockTS]")) {
                throw error;
            }

            return (`[SkyblockTS] An unknown error occurred: ${error.message}`);
        } else {
            return (`[SkyblockTS] An unknown error occurred: ${String(error)}`);
        }
    }

    private setCache<T extends Profile | Profile[]>(key: string, data: T): void {
        const expiry = Date.now() + this.client.config.cacheTTL;
        this.cache.set(key, { data, expiry });
    }

    private getCache<T>(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (!entry) return undefined;
        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return undefined;
        }
        return entry.data as T;
    }

    /**
     * Fetches a profile using its UUID.
     * @param {string} profileUUID The UUID of the profile.
     * @returns {Promise<Profile>} A promise that resolves to the profile.
     */
    async get(profileUUID: string): Promise<Profile> {
        const cacheKey = `profile-${profileUUID}`;
        const cached = this.getCache<Profile>(cacheKey);
        if (cached) return cached;

        try {
            const profile = await this.client.fetcher.fetch<{ profile: Profile }>(
                `skyblock/profile?profile=${encodeURIComponent(profileUUID)}`, true
            ).then((d) => d.profile);

            this.setCache(cacheKey, profile);
            return profile;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Fetches the profiles of a player using their UUID.
     * @param {string} playerUUID The UUID of the player.
     * @returns {Promise<Profile[]>} A promise that resolves to an array of profiles.
     */
    async getProfiles(playerUUID: string): Promise<Profile[] | []> {
        const cacheKey = `profiles-${playerUUID}`;
        const cached = this.getCache<Profile[]>(cacheKey);
        if (cached) return cached;

        try {
            const profiles = await this.client.fetcher.fetch<{ profiles: Profile[] }>(
                `skyblock/profiles?uuid=${encodeURIComponent(playerUUID)}`, true
            ).then((d) => d.profiles);
            if (!profiles || profiles.length === 0) return [];
            this.setCache(cacheKey, profiles);
            return profiles;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Fetches the profiles of a player using their in-game name.
     * @param {string} playerName The in-game name of the player.
     * @returns {Promise<Profile[]>} A promise that resolves to an array of profiles.
     */
    async getProfilesByName(playerName: string): Promise<Profile[] | []> {
        const cacheKey = `profilesByName-${playerName.toLowerCase()}`;
        const cached = this.getCache<Profile[]>(cacheKey);
        if (cached) return cached;

        try {
            const mojangResponse = await fetch(
                `https://api.mojang.com/users/profiles/minecraft/${playerName}`
            );
            if (!mojangResponse.ok) {
                return [];
            }
            const mojangData = await mojangResponse.json();
            const playerUUID = mojangData.id;
            const profiles = await this.getProfiles(playerUUID);
            if (!profiles || profiles.length === 0) return [];
            this.setCache(cacheKey, profiles);
            return profiles;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Clears the in-memory cache.
     */
    resetCache(): void {
        this.cache.clear();
    }
}