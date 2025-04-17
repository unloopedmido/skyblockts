import { describe, expect, it } from "vitest";
import { CoreClient } from '..';
import 'dotenv/config';

const client = new CoreClient({
    APIKey: process.env.HYPIXEL_API_KEY,
});

describe("Profile Module", () => {
    it("fetches Pohna's Strawberry profile by UUID", async () => {
        const response = await client.profile.profileByUUID("7062a5dc-1f66-486b-8c44-eb39e4b77611");

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.profile.community_upgrades).toBeDefined();
    }, 10000);

    it("fetches Pohna's profiles by UUID", async () => {
        const response = await client.profile.profilesByPlayer("fe4765681cc24821bc6074d0e0458e1f");

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.profiles.length).toBeGreaterThan(0);
    }, 10000);
})