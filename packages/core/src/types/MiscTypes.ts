export interface BaseMayor {
    key: string;
    name: string;
    perks: { name: string; description: string; }[];
}

export interface Election {
    year: number;
    candidates: (BaseMayor & { votes: number; perks: { name: string; description: string; }[] })[];
}

export interface Mayor extends BaseMayor {
    election: Election;
    minister: BaseMayor;
}

export interface BingoGoal {
    id: string;
    name: string;
    lore: string;
    fullLore: readonly string[];
    tiers: number[];
    progress: number;
    requiredAmount?: number;
}

export interface NewsItem {
    item: { material: string; };
    link: string;
    text: string;
    title: string;
}

export interface GardenCommissionData {
    visits: Record<string, number>;
    completed: Record<string, number>;
    total_completed: number;
    unique_npcs_served: number;
}

export interface GardenCommissionRequirement {
    original_item: string;
    original_amount: number;
    item: string;
    amount: number;
}

export interface GardenCommissionExtraReward {
    candy: string;
}

export interface GardenActiveCommission {
    requirement: GardenCommissionRequirement[];
    status: string;
    position: number;
    extra_rewards?: GardenCommissionExtraReward[];
}

export interface GardenComposterUpgrades {
    speed: number;
    multi_drop: number;
    fuel_cap: number;
    organic_matter_cap: number;
    cost_reduction: number;
}

export interface GardenComposterData {
    organic_matter: number;
    fuel_units: number;
    compost_units: number;
    compost_items: number;
    conversion_ticks: number;
    last_save: number;
    upgrades: GardenComposterUpgrades;
}

export interface GardenItem {
    uuid: string;
    unlocked_plots_ids: string[];
    commission_data: GardenCommissionData;
    active_commissions: Record<string, GardenActiveCommission>;
    garden_experience: number;
    composter_data: GardenComposterData;
    resources_collected: Record<string, number>;
    unlocked_barn_skins: string[];
    selected_barn_skin: string;
    crop_upgrade_levels: Record<string, number>;
}