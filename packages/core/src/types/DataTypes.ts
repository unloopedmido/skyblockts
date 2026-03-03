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
    name: string;
    category: string;
    tier: ItemTier;
    npc_sell_price: number;
    id: string;
    /** Optional; present on some items. */
    durability?: number;
    /** Optional; present on some items. */
    skin?: { value: string; signature: string };
    /** Optional; colour code e.g. "255,215,0". */
    color?: string;
    /** Optional; e.g. { DEFENSE: 75, HEALTH: 20 }. */
    stats?: Record<string, number>;
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