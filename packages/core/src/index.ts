import { CoreClient } from "./CoreClient";

export const defaultClient = new CoreClient({});
export const auction = defaultClient.auction;
export const bazaar = defaultClient.bazaar;
export const data = defaultClient.data;
export const misc = defaultClient.misc;
export const profile = defaultClient.profile;

export * from "./CoreClient";
export * from "./modules/Auction";
export * from "./modules/Bazaar";
export * from "./modules/Data";
export * from "./modules/Misc";
export * from "./modules/Profile";

export * from "./types/AuctionTypes";
export * from "./types/BazaarTypes";
export * from "./types/DataTypes";
export * from "./types/MiscTypes";
export * from "./types/ProfileTypes";
