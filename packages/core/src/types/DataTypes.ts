export type ItemTier =
    | "COMMON"
    | "UNCOMMON"
    | "RARE"
    | "EPIC"
    | "LEGENDARY"
    | "MYTHIC"
    | "DIVINE"
    | "SPECIAL"
    | "SUPERIOR"
    | "ULTIMATE";

export interface ItemItem {
    material: string;
    durability: number;
    skin: {
        value: string;
        signature: string;
    };
    name: string;
    category: string;
    tier: ItemTier;
    npm_sell_price: number;
    id: string;
}

export interface Collection {
    name: string;
    items: Record<string, CollectionItem>;
}

export interface CollectionItem {
    name: string;
    maxTiers: number;
    tiers: CollectionTier[];
}

export interface CollectionTier {
    tier: number;
    amountRequired: number;
    unlocks: string[]
}

export interface SkillItem {
    name: string;
    description: string;
    maxLevel: number;
    levels: SkillLevel[]
}

export interface SkillLevel {
    level: number;
    totalExpRequired: number;
    unlocks: string[];
}