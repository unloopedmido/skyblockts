export interface PlayerData {
    uuid: string;
    displayname: string;
    rank?: string;
    packageRank?: string;
    newPackageRank?: string;
    monthlyPackageRank?: string;
    firstLogin: number;
    lastLogin: number;
    lastLogout: number;
    stats: Record<string, any>;
    [key: string]: any;
}

export interface RecentGame {
    date: number;
    gameType: string;
    mode: string;
    map: string;
    ended: number;
}

export interface PlayerSession {
    online: boolean;
    gameType: string;
    mode: string;
    map: string;
}

export interface GuildMember {
    uuid: string;
    rank: string;
    joined: number;
    expHistory: Record<string, number>;
    priority?: number;
}

export interface Guild {
    _id: string;
    name: string;
    name_lower: string;
    coins: number;
    coinsEver: number;
    created: number;
    members: GuildMember[];
    joinable: boolean;
    legacyRanking: number;
    exp: number;
    publiclyListed: boolean;
    tag?: string;
    tagColor?: string;
    description?: string;
    [key: string]: any;
}
