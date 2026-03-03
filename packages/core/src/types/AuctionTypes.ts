import { ItemTier } from "./DataTypes";

export interface Bidder {
	auction_id: string;
	bidder: string;
	profile_id: string;
	amount: number;
	timestamp: number;
}

/** Item bytes as returned by the API (base64 gzipped NBT). */
export interface ItemBytes {
	type: number;
	data: string;
}

export interface AuctionItem {
	uuid: string;
	auctioneer: string;
	profile_id: string;
	coop: string[];
	start: number;
	end: number;
	item_name: string;
	item_lore: string;
	extra: string;
	category: string;
	tier: ItemTier;
	starting_bid: number;
	item_bytes: ItemBytes;
	claimed: boolean;
	claimed_bidders: string[];
	highest_bid_amount: number;
	bin: boolean;
	bids: Bidder[];
	/** Optional; present on some responses. */
	item_tag?: string | null;
	/** Optional; present on some responses. */
	last_updated?: number;
	/** Optional; present on some responses. */
	item_uuid?: string;
}

/** Auction that ended in the last 60 seconds (from auctions_ended endpoint). */
export interface EndedAuction {
	auction_id: string;
	seller: string;
	seller_profile: string;
	buyer: string;
	buyer_profile: string;
	timestamp: number;
	price: number;
	bin: boolean;
	item_bytes: string;
}
