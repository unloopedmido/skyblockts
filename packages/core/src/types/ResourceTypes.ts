export interface GameInfo {
    id: number;
    name: string;
    databaseName: string;
    modeNames: Record<string, string>;
}

export interface Achievement {
    name: string;
    description: string;
    points: number;
    gamePercentUnlocked: number;
    globalPercentUnlocked: number;
    [key: string]: any;
}

export interface Challenge {
    id: string;
    name: string;
    rewards: { type: string; amount: number }[];
    [key: string]: any;
}

export interface Quest {
    id: string;
    name: string;
    description: string;
    rewards: { type: string; amount: number }[];
    [key: string]: any;
}

export interface GuildAchievements {
    one_time: Record<string, any>;
    tiered: Record<string, any>;
}

export interface VanityPet {
    type: string;
    name: string;
    cost: number;
    [key: string]: any;
}

export interface VanityCompanion {
    type: string;
    name: string;
    cost: number;
    [key: string]: any;
}

export interface VanityRarity {
    name: string;
    color: string;
    [key: string]: any;
}

export interface ResourcePackVersion {
    packFormat: number;
    hash: string;
    url: string;
}

export interface ResourcePack {
    id: string;
    lastUpdated: number;
    deployId: string;
    versions: ResourcePackVersion[];
}
