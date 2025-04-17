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
    tiers: number[];
    progress: number;
    lore: string;
    fullLore: string[];
    requiredAmount?: number;
}

export interface NewsItem {
    item: { material: string; };
    link: string;
    text: string;
    title: string;
}

export interface GardenItem {
    uuid: string;
    unlocked_plot_ids: string[];
    commission_data: {
        [key: string]: any;
    };
    active_commissions: {
        [key: string]: any;
    };
    garden_experience: number;
    composter_data: {
        [key: string]: any;
    }
    resources_collected: {
        [key: string]: number;
    };
    unlocked_barn_skins: string[];
    selected_barn_skin: string;
    crop_upgrade_levels: {
        [key: string]: number;
    }
}