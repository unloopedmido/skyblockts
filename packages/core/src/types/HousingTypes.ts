export interface House {
    uuid: string;
    owner: string;
    name: string;
    createdAt: number;
    players: number;
    cookies: { current: number };
}
