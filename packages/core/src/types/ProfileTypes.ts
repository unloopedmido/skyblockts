export interface ProfileItem {
    profile_id: string;
    community_upgrades: CommunityUpgrades;
    members: Record<string, Member>;
    banking: Banking;
    cute_name: string;
    selected: boolean;
}

export interface CommunityUpgrades {
    upgrade_states: { upgrade: string, tier: number, started_ms: number, started_by: string, claimed_by: string }[]
    currently_upgrading: string | null;
}

export interface Member {
    [key: string]: any;
}

export interface Banking {
    balance: number;
    transactions: { amount: number, timestamp: number, action: string, initiator_name: string }[];
}

export interface MuseumMember {
    value: number;
    appraisal: boolean;
    items: Record<string, MuseumItem>;
    special: Record<string, MuseumItem>;
}

export interface MuseumItem {
    donated_time: number;
    featured_slot: string;
    borrowing: boolean;
    items: { type: number; data: string; }
}

export interface BingoEvent {
    key: number;
    points: number;
    completed_goals: string[];
}