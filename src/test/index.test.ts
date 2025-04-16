import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SkyblockTS } from '..';
import 'dotenv/config';

describe('SkyblockTS API', () => {
    let client: SkyblockTS;

    beforeEach(() => {
        client = new SkyblockTS({
            apiKey: process.env.HYPIXEL_API_KEY as string,
            batchSize: 100
        });
    });

    describe('Auction House', () => {
        it('fetches Hyperions from the auction house', async () => {
            const hyperions = await client.auctions.filter({ itemName: "hyperion" });
            expect(hyperions).toBeDefined();
            expect(hyperions).toBeInstanceOf(Array);
            expect(hyperions?.length).toBeGreaterThan(0);

            // More specific assertions
            const firstHyperion = hyperions?.[0];
            expect(firstHyperion).toHaveProperty('uuid');
            expect(firstHyperion).toHaveProperty('item_name');
            expect(firstHyperion?.item_name.toLowerCase()).toContain('hyperion');
        }, 1000 * 60 * 2); // 2 minutes timeout

        it('filters auctions by price range', async () => {
            const expensiveItems = await client.auctions.filter({
                minPrice: 10000000, // 100 million coins
                maxPrice: 50000000  // 500 million coins
            });

            expect(expensiveItems).toBeInstanceOf(Array);
            if ((expensiveItems?.length ?? 0) > 0) {
                expensiveItems?.forEach(item => {
                    expect(item.starting_bid).toBeGreaterThanOrEqual(10000000);
                    expect(item.starting_bid).toBeLessThanOrEqual(50000000);
                });
            }
        }, 1000 * 60); // 1 minute timeout
    });

    describe('Profiles', () => {
        it('fetches profiles', async () => {
            const profiles = await client.profiles.getProfilesByName("Pohna");
            expect(profiles).toBeDefined();
            expect(profiles).toBeInstanceOf(Array);

            // More specific assertions
            if (profiles.length > 0) {
                const firstProfile = profiles[0];
                expect(firstProfile).toHaveProperty('profile_id');
                expect(firstProfile).toHaveProperty('members');
            }
        });

        it('handles non-existent player profiles gracefully', async () => {
            const nonExistentPlayer = await client.profiles.getProfilesByName("ThisPlayerShouldNotExist12345asd");
            expect(nonExistentPlayer).toEqual([]);
        });
    });

    describe('Collections', () => {
        it('fetches farming collections', async () => {
            const collections = await client.collections.get("farming");
            expect(collections).toBeDefined();
            expect(collections).toBeInstanceOf(Object);

            // More specific assertions about farming collections
            expect(collections).toHaveProperty('items');
            expect(collections?.items).toBeInstanceOf(Object);
        });

        it('fetches mining collections', async () => {
            const collections = await client.collections.get("mining");
            expect(collections).toBeDefined();
            expect(collections).toBeInstanceOf(Object);
            expect(collections).toHaveProperty('items');
        });

        it('returns null for invalid collection type', async () => {
            const invalidCollection = await client.collections.get("invalid_type");
            expect(invalidCollection).toBeNull();
        });
    });

    describe('Error handling', () => {
        it('handles API errors gracefully', async () => {
            // Create client with invalid API key
            const invalidClient = new SkyblockTS({
                apiKey: "invalid_key",
                batchSize: 100
            });

            await expect(invalidClient.profiles.getProfilesByName("Pohna"))
                .rejects.toThrow();
        });

        it('respects rate limits', async () => {
            // Mock the fetch method
            const originalFetch = global.fetch;
            global.fetch = vi.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: false,
                    status: 429,
                    json: () => Promise.resolve({ success: false, cause: 'Key throttle' })
                })
            );

            try {
                await expect(client.auctions.filter({ itemName: "anything" }))
                    .rejects.toThrow(/rate limit/i);
            } finally {
                global.fetch = originalFetch;
            }
        });
    });
});