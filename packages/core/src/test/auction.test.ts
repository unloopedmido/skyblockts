import { describe, it, expect } from 'vitest';
import { CoreClient } from '..';
import 'dotenv/config';

const client = new CoreClient({ APIKey: process.env.HYPIXEL_API_KEY })
const auction = client.auction;

describe('Auction Module', () => {
    it('fetches for the third page of active auctions', async () => {
        const thirdPage = await auction.activeAuctions(3);
        expect(thirdPage).toBeDefined();
        expect(thirdPage.success).toBe(true);
        expect(thirdPage.auctions).toBeDefined();
        expect(thirdPage.auctions.length).toBeGreaterThan(0);

        const firstAuction = thirdPage.auctions[0];
        expect(firstAuction).toHaveProperty('uuid');
        expect(firstAuction).toHaveProperty('item_name');
    }, 10000);

    it('fetches page 1 and fetches a random auction from it', async () => {
        const firstPage = await auction.activeAuctions(1);
        expect(firstPage).toBeDefined();

        const firstAuction = firstPage.auctions[0];
        const firstAuctionData = await auction.requestAuctions({ uuid: firstAuction.uuid });
        expect(firstAuctionData).toBeDefined();
        expect(firstAuctionData.success).toBe(true);
    });

    it('fetches recently ended auctions', async () => {
        const recentlyEnded = await auction.recentlyEndedAuctions();
        expect(recentlyEnded).toBeDefined();
        expect(recentlyEnded.success).toBe(true);
        expect(recentlyEnded.auctions).toBeDefined();
        expect(recentlyEnded.auctions.length).toBeGreaterThan(0);

        const firstAuction = recentlyEnded.auctions[0];
        expect(firstAuction).toHaveProperty('auction_id');
        expect(firstAuction).toHaveProperty('seller');
    }, 10000);
});