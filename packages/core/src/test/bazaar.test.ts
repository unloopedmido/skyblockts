import { describe, expect, it } from "vitest";
import { bazaar } from "..";

describe('Bazaar Module', () => {
    it('should fetch bazaar data', async () => {
        const bazaarData = await bazaar.bazaar();

        expect(bazaarData).toBeDefined();
        expect(bazaarData.success).toBe(true);
        expect(bazaarData.products).toBeDefined();
    }, 10000);
})