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