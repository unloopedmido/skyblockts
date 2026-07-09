export interface Booster {
    _id: string;
    purchaserUuid: string;
    amount: number;
    originalLength: number;
    length: number;
    gameType: number;
    dateActivated: number;
    stacked: string[];
}

export interface BoosterState {
    decrementing: boolean;
}

export interface GameCounts {
    players: number;
    modes: Record<string, number>;
}

export interface LeaderboardEntry {
    uuid: string;
    name: string;
    value: number;
    [key: string]: any;
}

export interface Leaderboard {
    path: string;
    prefix: string;
    title: string;
    location: string;
    count: number;
    leaders: LeaderboardEntry[];
    [key: string]: any;
}

export interface PunishmentStats {
    watchdog_lastMinute: number;
    staff_rollingDaily: number;
    watchdog_total: number;
    watchdog_rollingDaily: number;
    staff_total: number;
}
