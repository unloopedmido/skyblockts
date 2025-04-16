import { SkyblockTS } from "./SkyblockTS";

export const defaultClient = new SkyblockTS();
export const auctions = defaultClient.auctions;
export const profiles = defaultClient.profiles;
export const collections = defaultClient.collections;

export * from "./SkyblockTS";
export * from "./modules/Auctions";
export * from './modules/Profiles'
export * from "./modules/Collections";

export * from "./types/auction";
export * from "./types/profile";
export * from './types/collection';