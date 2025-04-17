export const codeExample = `import { auctions, profiles, collections } from "skyblockts";

// Get all the auctions from the auction house
const allAuctions = await auctions.all();

// Filter auctions with various criteria
const filteredAuctions = await auctions.filter({
    itemName: "Hyperion",
    tier: "LEGENDARY",
    binOnly: true,
});

// Get a user's profiles by their UUID
const userProfiles = await profiles.get("playerUUID");

// Get all the collections within a category
const farmingCollections = await collections.get("farming");`;