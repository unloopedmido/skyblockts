# @skyblock‑ts/core

A zero‑opinion, fully typed TypeScript client for the Hypixel SkyBlock API.  
Provides promise‑based methods for all SkyBlock endpoints with immutable (`readonly`) response types.

[![npm version](https://img.shields.io/npm/v/@skyblock-ts/core.svg)](https://www.npmjs.com/package/@skyblock-ts/core) [![MIT License](https://img.shields.io/npm/l/@skyblock-ts/core.svg)](LICENSE)

## Installation

```bash
npm install @skyblock-ts/core
# or
pnpm add @skyblock-ts/core
# or
yarn add @skyblock-ts/core
```

## Quick Start

### Option 1: Use the exported classes

The package ships the classes:

```ts
import { misc, auction } from "@skyblock-ts/core";

async function main() {
 // Fetch the latest SkyBlock news
 const news = await misc.news();
 console.log(news.items[0]);

 // Fetch page 0 of active auctions
 const { auctions, page, totalPages } =
  await auction.activeAuctions(0);
 console.log(`Page ${page + 1}/${totalPages}:`, auctions.length, "auctions");
}

main().catch(console.error);
```

### Option 2: Create your own client

Pass your key (and optionally override defaults) directly:

```ts
import { CoreClient } from "@skyblock-ts/core";

const client = new CoreClient({ APIKey: "YOUR_API_KEY_HERE" });

async function example() {
 // Fetch a player’s profiles by their UUID
 const profiles = await client.profile.profilesByPlayer("player-uuid");
 console.log(
  "Profiles:",
  profiles.profiles.map((p) => p.profile_id),
 );

 // Fetch recently ended auctions
 const ended = await client.auction.recentlyEndedAuctions();
 console.log("Ended auctions in last minute:", ended.auctions.length);

 // Fetch current Bingo event info
 const bingo = await client.misc.currentBingoEvent();
 console.log(`Bingo "${bingo.name}" ends at ${new Date(bingo.end)}`);
}

example().catch(console.error);
```

## Core Modules

- **auction**

  - `recentlyEndedAuctions()`
  - `activeAuctions(page?: number)`
  - `requestAuctions({ uuid?; player?; profile? })`

- **bazaar**

  - `bazaar.get()`

- **data**

  - `data.items()`
  - `data.skills()`
  - `data.collections()`

- **profile**

  - `profile.profileById(profileId)`
  - `profile.profilesByPlayer(playerUuid)`
  - `profile.bingoDataByPlayer(profileId)`
  - `profile.gardenDataByProfileID(profileId)`
  - `profile.museumDataByProfileID(profileId)`

- **misc**
  - `misc.news()`
  - `misc.electionAndMayor()`
  - `misc.currentBingoEvent()`

_All methods return immutable TypeScript objects with full `.d.ts` definitions._

## API Reference

Browse the full method signatures and response shapes in the [`packages/core/src`](https://github.com/unloopedmido/skyblockts/tree/main/packages/core/src) directory or view the generated type definitions in `dist/index.d.ts`.