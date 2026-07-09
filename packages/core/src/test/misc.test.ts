import { describe, expect, it } from "vitest";
import { CoreClient } from '..';
import 'dotenv/config';

const client = new CoreClient({
    APIKey: process.env.HYPIXEL_API_KEY,
})

describe("Miscellaneous Module", () => {
    it("fetches and returns skyblock news", async () => {
        const response = await client.misc.news();

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.items).toBeDefined();
    });

    it("fetches and returns election and mayor information", async () => {
        const response = await client.misc.electionAndMayor();

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.mayor).toBeDefined();
    });

    it("fetches and returns current bingo event information", async () => {
        const response = await client.misc.currentBingoEvent();

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.goals).toBeDefined();
    });

    it("throws an error when the API key is invalid", async () => {
        const invalidClient = new CoreClient({
            APIKey: "INVALID_API_KEY",
        });

        // news() needs no auth, so use a key-requiring endpoint to actually exercise the 403 path.
        await expect(
            invalidClient.profile.profilesByPlayer("fe4765681cc24821bc6074d0e0458e1f"),
        ).rejects.toThrow("Hypixel API key is invalid or does not exist.");
    });
})