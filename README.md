# skyblock‑ts

A monorepo of TypeScript packages for working with the Hypixel SkyBlock API.

- **@skyblock‑ts/core** – a zero‑opinion, fully typed SkyBlock API client.  
- **@skyblock‑ts/toolkit** – high‑level, batteries‑included utilities built on top of `@skyblock‑ts/core` (caching, filtering, stats, and more).

[![MIT License](https://img.shields.io/github/license/unloopedmido/skyblockts.svg)](LICENSE)  
[![Node.js ≥16](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue.svg)](https://www.typescriptlang.org/)

## Packages

### @skyblock‑ts/core

- Typed, promise‑based wrapper around the [Hypixel API’s SkyBlock endpoints](https://api.hypixel.net/).  
- Full ESM support with auto‑generated `.d.ts` definitions.  
- Zero runtime dependencies (aside from your own `fetch` or Node built‑ins).  
- Strict, immutable response types (`readonly` fields & arrays).

[![npm version](https://img.shields.io/npm/v/@skyblock-ts/core.svg)](https://www.npmjs.com/package/@skyblock-ts/core)

Install and use:

```bash
npm install @skyblock‑ts/core
# or
pnpm add @skyblock‑ts/core
```

```ts
import { CoreClient, defaultClient } from "@skyblock‑ts/core";

// Option A: use the shared default client
const news = await defaultClient.misc.news();

// Option B: customize your own client
const client = new CoreClient({ APIKey: "YOUR_API_KEY" });
const page0 = await client.auction.activeAuctions(0);
console.log(`Auctions on page 1:`, page0.auctions.length);
```

Browse the full API surface and response types in [`packages/core/src`](https://github.com/unloopedmido/skyblockts/tree/main/packages/core/src).

---

### @skyblock‑ts/toolkit

High‑level, cached and convenient utilities on top of `@skyblock‑ts/core`:

- In‑memory caching with configurable TTL  
- Auction helpers (fetch all pages, filter, lowest BIN, averages)  
- Profile lookups (name→UUID, list & active profile, skills/dungeons)  
- Bazaar helpers (list products, lookup individual items)  
- …and more modules coming soon!

[![npm version](https://img.shields.io/npm/v/@skyblock-ts/toolkit.svg)](https://www.npmjs.com/package/@skyblock-ts/toolkit)

Install and use:

```bash
npm install @skyblock‑ts/core @skyblock‑ts/toolkit
# or
pnpm add @skyblock‑ts/core @skyblock‑ts/toolkit
```

```ts
import { ToolkitClient } from "@skyblock‑ts/toolkit";

// Optionally pass your API key, override cacheTTL & batchSize:
const tk = new ToolkitClient({
  APIKey: "YOUR_API_KEY",
  cacheTTL: 300_000,    // cache for 5 minutes
  batchSize: 20,        // fetch 20 auction pages in parallel
});

async function example() {
  // Auctions
  const allAuctions = await tk.auctions.all();
  console.log("Total auctions:", allAuctions.length);

  const filtered = await tk.auctions.get({
    itemName: "DIAMOND_SWORD",
    maxPrice: 1_000_000,
    binOnly: true,
  });
  console.log("Cheap BIN swords:", filtered.length);

  const best = await tk.auctions.lowestBin({ itemName: "ENCHANTED_GOLD" });
  console.log("Lowest ENCHANTED_GOLD BIN:", best?.starting_bid);

  // Profiles
  const uuid = await tk.profiles.uuidForName("Notch");
  console.log("Notch’s UUID:", uuid);

  const profs = await tk.profiles.listProfilesByName("Notch");
  console.log("SkyBlock profiles:", profs.map(p => p.profile_id));

  const active = await tk.profiles.getActiveProfile(uuid!);
  console.log("Active profile data:", active);

  // Bazaar
  const products = await tk.bazaar.listProducts();
  console.log("Bazaar SKUs:", Object.keys(products).length);

  const gold = await tk.bazaar.getProduct("ENCHANTED_GOLD");
  console.log("Enchanted Gold buy price:",
    gold?.buy_summary[0].pricePerUnit);
}

example().catch(console.error);
```

#### Modules & Methods

**Auctions**  

- `all(): Promise<AuctionItem[]>`  
- `get(filter: AuctionFilter): Promise<AuctionItem[]>`  
- `lowestBin(filter: AuctionFilter): Promise<AuctionItem \| null>`  
- `lowestBins(filters: AuctionFilter[]): Promise<Record<string, number>>`  
- `averagePrice(filter: AuctionFilter): Promise<number>`

**Profiles**  

- `uuidForName(name: string): Promise<string \| null>`  
- `listProfilesByUuid(uuid: string): Promise<ProfileItem[]>`  
- `listProfilesByName(name: string): Promise<ProfileItem[]>`  
- `getProfileById(profileId: string): Promise<ProfileItem \| null>`  
- `getActiveProfile(uuid: string): Promise<ProfileMember \| null>`

**Bazaar**  

- `listProducts(): Promise<Record<string, BazaarItem>>`  
- `getProduct(key: string): Promise<BazaarItem \| null>`

> **Cache**: Results are cached in memory for `cacheTTL` ms (default: 3 minutes).  
> **Batching**: Auction pages are fetched in parallel in chunks of `batchSize` (default: 10).

Browse the source in [`packages/toolkit/src`](https://github.com/unloopedmido/skyblockts/tree/main/packages/toolkit/src) or see the generated types in `packages/toolkit/dist/index.d.ts`.

---

## Installation (monorepo)

If you clone this repo and want to work locally against all packages:

```bash
git clone https://github.com/unloopedmido/skyblockts.git
cd skyblockts
pnpm install
pnpm build        # builds all workspaces
pnpm test         # runs tests
pnpm dev          # watch mode for all packages
```

## Contributing

We welcome issues, suggestions, and pull requests:

1. Fork & create a branch  
2. Commit with clear, atomic messages  
3. Run `pnpm lint && pnpm test`  
4. Open a PR against `main`

See [LICENSE](LICENSE) for licensing details.  
