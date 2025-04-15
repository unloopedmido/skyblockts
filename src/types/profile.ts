export interface Profile {
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