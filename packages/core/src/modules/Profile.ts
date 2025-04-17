import { CoreClient } from "../CoreClient";
import { GardenItem } from "../types/MiscTypes";
import { BingoEvent, MuseumMember, ProfileItem } from "../types/ProfileTypes";

type ProfileByUUIDResponse = Readonly<{
    success: boolean;
    profile: ProfileItem;
}>;

type ProfilesByPlayerResponse = Readonly<{
    success: boolean
    profiles: readonly ProfileItem[]
}>

type MuseumDataByProfileIDResponse = Readonly<{
    success: boolean
    profile: Readonly<Record<string, MuseumMember>>
}>

type GardenDataByProfileIDResponse = Readonly<{
    success: boolean
    garden: GardenItem
}>

type BingoDataByPlayerResponse = Readonly<{
    success: boolean
    events: readonly BingoEvent[]
}>



export class Profile {
    constructor(private client: CoreClient) { }

    /**
     * @param {string} profile The UUID of the profile to fetch.
     * @returns {ProfileByUUIDResponse} SkyBlock profile data, such as stats, objectives etc. The data returned can differ depending on the players in-game API settings.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1profile/get
     */
    async profileByUUID(profile: string): Promise<ProfileByUUIDResponse> {
        const params = new URLSearchParams({ profile });

        return this.client.fetcher.fetch<ProfileByUUIDResponse>(`skyblock/profile?${params.toString()}`)
    }

    /**
     * @param {string} uuid The UUID of the player to fetch profiles for.
     * @returns {ProfilesByPlayer} SkyBlock profiles for a player.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1profiles/get
     */
    async profilesByPlayer(uuid: string): Promise<ProfilesByPlayerResponse> {
        const params = new URLSearchParams({ uuid });

        return this.client.fetcher.fetch<ProfilesByPlayerResponse>(`skyblock/profiles?${params.toString()}`)
    }

    /**
     * @param {string} profile The UUID of the profile to fetch museum data for.
     * @returns {MuseumDataByProfileIDResponse} SkyBlock museum data for all members of the provided profile. The data returned can differ depending on the players in-game API settings.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1museum/get
     */
    async museumDataByProfileID(profile: string): Promise<MuseumDataByProfileIDResponse> {
        const params = new URLSearchParams({ profile });

        return this.client.fetcher.fetch<MuseumDataByProfileIDResponse>(`skyblock/museum?${params.toString()}`)
    }

    /**
     * @param {string} profile The UUID of the profile to fetch garden data for.
     * @returns {GardenDataByProfileIDResponse} SkyBlock garden data for the provided profile.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1garden/get
     */
    async gardenDataByProfileID(profile: string): Promise<GardenDataByProfileIDResponse> {
        const params = new URLSearchParams({ profile });

        return this.client.fetcher.fetch<GardenDataByProfileIDResponse>(`skyblock/garden?${params.toString()}`)
    }

    /**
     * @param {string} uuid The UUID of the player to fetch bingo data for.
     * @returns {BingoDataByPlayerResponse} Bingo data for participated events of the provided player.
     * @link https://api.hypixel.net/#tag/SkyBlock/paths/~1v2~1skyblock~1bingo/get
     */
    async bingoDataByPlayer(uuid: string): Promise<BingoDataByPlayerResponse> {
        const params = new URLSearchParams({ uuid });

        return this.client.fetcher.fetch<BingoDataByPlayerResponse>(`skyblock/bingo?${params.toString()}`)
    }
}