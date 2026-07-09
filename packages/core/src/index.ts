import { CoreClient } from "./CoreClient";

export const defaultClient = new CoreClient({});
export const auction = defaultClient.auction;
export const bazaar = defaultClient.bazaar;
export const data = defaultClient.data;
export const misc = defaultClient.misc;
export const profile = defaultClient.profile;
export const player = defaultClient.player;
export const resources = defaultClient.resources;
export const housing = defaultClient.housing;
export const other = defaultClient.other;

export * from "./CoreClient";
export { Fetcher } from "./utils/fetcher";
export type { RateLimitHeaders } from "./utils/fetcher";
export * from "./modules/Auction";
export * from "./modules/Bazaar";
export * from "./modules/Data";
export * from "./modules/Misc";
export * from "./modules/Profile";
export * from "./modules/Player";
export * from "./modules/Resources";
export * from "./modules/Housing";
export * from "./modules/Other";

export * from "./types/AuctionTypes";
export * from "./types/BazaarTypes";
export * from "./types/DataTypes";
export * from "./types/MiscTypes";
export * from "./types/ProfileTypes";
export * from "./types/PlayerTypes";
export * from "./types/ResourceTypes";
export * from "./types/HousingTypes";
export * from "./types/OtherTypes";
