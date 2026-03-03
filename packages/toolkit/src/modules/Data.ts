import { ToolkitClient } from "../ToolkitClient";
import type {
    CollectionItem,
    ItemItem,
    SkillItem,
} from "@skyblock-ts/core";

export class Data {
    constructor(private client: ToolkitClient) {}

    /**
     * Fetch all items (cached). Does not require an API key.
     */
    async listItems(): Promise<ItemItem[]> {
        return this.client.getCached("data:items", async () => {
            const res = await this.client.core.data.items();
            const items = res.items ?? [];
            return Array.isArray(items) ? items.slice() : Object.values(items);
        });
    }

    /**
     * Get a SkyBlock item by its id (e.g. "FARM_ARMOR_CHESTPLATE").
     */
    async getItemById(id: string): Promise<ItemItem | null> {
        const items = await this.listItems();
        return items.find((i) => i.id === id) ?? null;
    }

    /**
     * Get all SkyBlock items with the given material (e.g. "DIAMOND_SWORD").
     */
    async getItemsByMaterial(material: string): Promise<ItemItem[]> {
        const items = await this.listItems();
        return items.filter((i) => i.material === material);
    }

    /**
     * Fetch all collections (cached). Does not require an API key.
     */
    async listCollections(): Promise<Record<string, CollectionItem>> {
        return this.client.getCached("data:collections", async () => {
            const res = await this.client.core.data.collections();
            return { ...(res.collections ?? {}) };
        });
    }

    /**
     * Get a collection by id (e.g. "FARMING").
     */
    async getCollection(id: string): Promise<CollectionItem | null> {
        const collections = await this.listCollections();
        return collections[id] ?? null;
    }

    /**
     * Fetch all skills (cached). Does not require an API key.
     */
    async listSkills(): Promise<Record<string, SkillItem>> {
        return this.client.getCached("data:skills", async () => {
            const res = await this.client.core.data.skills();
            return { ...(res.skills ?? {}) };
        });
    }

    /**
     * Get a skill by id (e.g. "FARMING").
     */
    async getSkill(id: string): Promise<SkillItem | null> {
        const skills = await this.listSkills();
        return skills[id] ?? null;
    }
}
