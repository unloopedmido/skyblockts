import { ToolkitClient } from "../ToolkitClient";
import { ProfileItem } from '@skyblock-ts/core'

export class Profiles {
    constructor(private client: ToolkitClient) { }

    /**
     * Fetches the UUID of a Minecraft player by their name.
     * @param name - The name of the Minecraft player.
     * @returns The UUID of the player or null if not found.
     */
    async uuidForName(name: string): Promise<string | null> {
        try {
            return this.client.getCached(`uuid:${name}`, async () => {
                const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/pohna${name}`);

                return (await response.json()).id ?? null;
            });
        } catch (error) {
            console.error("Error fetching UUID for name:", error);
            return null;
        }
    }

    /**
     * Fetches the profiles of a player by their UUID. (This is a cached method but requires an API key if the profile is not cached.)
     * @param playerUUID - The UUID of the player.
     * @returns The profiles of the player or an empty array if not found.
     */
    async listProfilesByUuid(playerUUID: string): Promise<ProfileItem[] | []> {
        return this.client.getCached(`profiles:${playerUUID}`, async () => {
            const { profiles } = await this.client.core.profile.profilesByPlayer(playerUUID);

            if (!profiles || profiles.length === 0) {
                return [];
            }

            return [...profiles];
        });
    }

    /**
     * Fetches the profiles of a player by their name. (This is a cached method but requires an API key if the profile is not cached.)
     * @param name - The name of the player.
     * @returns The profiles of the player or an empty array if not found.
     */
    async listProfilesByName(name: string): Promise<ProfileItem[] | []> {
        const uuid = await this.uuidForName(name);

        if (!uuid) {
            return [];
        }

        return this.listProfilesByUuid(uuid);
    }

    /**
     * Fetches a specific profile by its UUID. (This is a cached method but requires an API key if the profile is not cached.)
     * @param profileUUID - The UUID of the profile.
     * @returns The profile item or null if not found.
     */
    async getProfileById(profileUUID: string): Promise<ProfileItem | null> {
        return this.client.getCached(`profile:${profileUUID}`, async () => {
            const { profile } = await this.client.core.profile.profileByUUID(profileUUID);

            if (!profile) {
                return null;
            }

            return profile;
        });
    }

    /**
     * Fetches the active profile of a player by their UUID. (This is a cached method but requires an API key if the profile is not cached.)
     * @param playerUUID - The UUID of the player.
     * @returns The active profile item or null if not found.
     */
    async getActiveProfile(playerUUID: string): Promise<ProfileItem | null> {
        const profiles = await this.listProfilesByUuid(playerUUID);

        if (!profiles) {
            return null;
        }

        const activeProfile = profiles.find(profile => profile.selected);

        if (!activeProfile) {
            return null;
        }

        return activeProfile;
    }
}