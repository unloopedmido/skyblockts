export interface Collection {
    name: string;
    items: Record<string, CollectionItem>;
}

export interface CollectionItem {
    name: string;
    maxTiers: number;
    tiers: Tier[];
}

export interface Tier {
    tier: number;
    amountRequired: number;
    unlocks: string[]
}