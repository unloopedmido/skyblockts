import { CoreClient } from "../CoreClient";
import type { CollectionItem, ItemItem, SkillItem } from "../types/DataTypes";

type BaseResponse = Readonly<{
    success: boolean;
    lastUpdated: number;
    version: string;
}>;

interface CollectionsResponse extends BaseResponse {
    readonly collections: Record<string, CollectionItem>;
}

interface ItemsResponse extends BaseResponse {
    readonly items: Record<string, ItemItem>;
}

interface SkillsResponse extends BaseResponse {
    readonly skills: Record<string, SkillItem>;
}

export class Data {
    constructor(private client: CoreClient) { }

    /**
     * @returns {CollectionsResponse} Information regarding Collections in the SkyBlock game.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1resources~1skyblock~1collections/get
     */
    async collections(): Promise<CollectionsResponse> {
        return this.client.doGet<CollectionsResponse>("resources/skyblock/collections");
    }

    /**
     * @returns {ItemsResponse} Information regarding items in the SkyBlock game.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1resources~1skyblock~1items/get
     */
    async items(): Promise<ItemsResponse> {
        return this.client.doGet<ItemsResponse>("resources/skyblock/items");
    }

    /**
     * @returns {SkillsResponse} Information regarding skills in the SkyBlock game.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1resources~1skyblock~1skills/get
     */
    async skills(): Promise<SkillsResponse> {
        return this.client.doGet<SkillsResponse>("resources/skyblock/skills");
    }
}