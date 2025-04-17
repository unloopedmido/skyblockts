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
    
        await expect(invalidClient.misc.news()).rejects.toThrow("Hypixel API key is invalid or does not exist.");
    });
})