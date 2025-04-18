
# @skyblock‑ts/toolkit

High‑level, cached and convenient utility functions for Hypixel SkyBlock  
built on top of [@skyblock‑ts/core](https://www.npmjs.com/package/@skyblock-ts/core).

[![npm version](https://img.shields.io/npm/v/@skyblock-ts/toolkit.svg)](https://www.npmjs.com/package/@skyblock-ts/toolkit)  
[![MIT License](https://img.shields.io/npm/l/@skyblock-ts/toolkit.svg)](LICENSE)

## Installation

```bash
npm install @skyblock-ts/toolkit
# or
pnpm add @skyblock-ts/toolkit
# or
yarn add @skyblock-ts/toolkit
```

## Quick Start

```ts
import { ToolkitClient } from "@skyblock-ts/toolkit";

// You can pass your Hypixel API key (optional for cached reads):
const client = new ToolkitClient({ APIKey: "MY_KEY", batchSize: 20, cacheTTL: 300_000 });

async function main() {
  // — Auctions
  const all = await client.auctions.all();
  console.log("Total auctions:", all.length);

  const cheapSwords = await client.auctions.get({ itemName: "HYPERION", maxPrice: 1_000_000_000 });
  console.log("Cheap hyperions:", cheapSwords.length);

  const bestBin = await client.auctions.lowestBin({ itemName: "ENCHANTED_GOLD" });
  console.log("Lowest ENCHANTED_GOLD BIN:", bestBin?.starting_bid);

  // — Profiles
  const uuid = await client.profiles.uuidForName("Notch");
  console.log("Notch’s UUID:", uuid);

  const profs = await client.profiles.listProfilesByName("Notch");
  console.log("SkyBlock profiles:", profs.map(p => p.profile_id));

  const active = await client.profiles.getActiveProfile(uuid!);
  console.log("Active profile member data:", active);

  // — Bazaar
  const bazaar = await client.bazaar.listProducts();
  console.log("Bazaar items:", Object.keys(bazaar).length);

  const gold = await client.bazaar.getProduct("ENCHANTED_GOLD");
  console.log("Enchanted Gold buy price:", gold?.buy_summary[0].pricePerUnit);
}

main().catch(console.error);
```

## Modules & Methods

### Auctions

- `all(): Promise<AuctionItem[]>`  
- `get(filter: AuctionFilter): Promise<AuctionItem[]>`  
- `lowestBin(filter: AuctionFilter): Promise<AuctionItem \| null>`  
- `lowestBins(filters: AuctionFilter[]): Promise<Record<string, number>>`  
- `averagePrice(filter: AuctionFilter): Promise<number>`

### Profiles

- `uuidForName(name: string): Promise<string \| null>`  
- `listProfilesByUuid(uuid: string): Promise<ProfileItem[]>`  
- `listProfilesByName(name: string): Promise<ProfileItem[]>`  
- `getProfileById(profileId: string): Promise<ProfileItem \| null>`  
- `getActiveProfile(uuid: string): Promise<ProfileMember \| null>`

### Bazaar

- `listProducts(): Promise<Record<string, BazaarItem>>`  
- `getProduct(key: string): Promise<BazaarItem \| null>`

> **Cache:** By default results are cached in memory for `cacheTTL` ms (default: 3 minutes).  
> **Batching:** Auction pages are fetched in parallel batches of `batchSize` (default: 10).

## API Reference

Browse the full TypeScript types in [`dist/index.d.ts`](./dist/index.d.ts)  
or peek at the source under [`src/`](https://github.com/…/packages/toolkit/src).

---

Made with ❤️ by [@unloopedmido](https://github.com/unloopedmido/skyblockts).

MIT License — see [LICENSE](LICENSE).
