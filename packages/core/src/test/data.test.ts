import { describe, expect, it } from "vitest";
import { data } from "..";

describe("Data Module", () => {
    it("fetches and returns collections data", async () => {
        const collectionData = await data.collections();

        expect(collectionData).toHaveProperty("success", true);
        expect(collectionData).toHaveProperty("collections");

        const firstCollection = Object.values(collectionData.collections)[0];
        expect(firstCollection).toHaveProperty("name");
        expect(firstCollection).toHaveProperty("items");
    });

    it("fetches and returns items data", async () => {
        const itemsData = await data.items();

        expect(itemsData).toHaveProperty("success", true);
        expect(itemsData).toHaveProperty("items");

        const firstItem = Object.values(itemsData.items)[0];
        expect(firstItem).toHaveProperty("name");
        expect(firstItem).toHaveProperty("material");
    });

    it("fetches and returns skills data", async () => {
        const skillsData = await data.skills();

        expect(skillsData).toHaveProperty("success", true);
        expect(skillsData).toHaveProperty("skills");

        const firstSkill = Object.values(skillsData.skills)[0];
        expect(firstSkill).toHaveProperty("name");
        expect(firstSkill).toHaveProperty("levels");
    });
}, { timeout: 10000 })