# SkyblockTS

A robust TypeScript wrapper for the Hypixel SkyBlock API, providing type-safe access to Hypixel SkyBlock data.

[![NPM Version](https://img.shields.io/npm/v/skyblockts.svg)](https://www.npmjs.com/package/skyblockts)
[![License](https://img.shields.io/github/license/unloopedmido/skyblockts.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)

## Features

- **Type-Safe**: Full TypeScript support with proper typing for all API responses
- **Efficient Caching**: Smart caching strategy to minimize API calls
- **Easy to Use**: Simple and intuitive API for accessing Hypixel SkyBlock data
- **Well Documented**: Comprehensive documentation with examples

> **Note:** Currently, SkyblockTS only supports auctions. Support for bazaar, profiles, and more features are planned for the near future.

## Installation

```bash
npm install skyblockts
# or
yarn add skyblockts
# or
pnpm add skyblockts
```

## Quick Start

```typescript
import { SkyblockTS } from 'skyblockts';

// Initialize the client with options
const client = new SkyblockTS({
  // Optional: Set a custom cache TTL in milliseconds (default: 60000)
  cacheTTL: 120000,
  // Optional: Set a custom batch size (default: 3)
  batchSize: 10
});

// Get all auctions
const allAuctions = await client.auctions.all();

// Search for an item by name
const hyperionAuctions = await client.auctions.search('hyperion');

// Filter auctions with various criteria
const filteredAuctions = await client.auctions.filter({
  tier: 'LEGENDARY',
  minPrice: 1000000,
  maxPrice: 10000000,
  binOnly: true,
});
```

## API Documentation

### SkyblockTS Class

```typescript
new SkyblockTS(options?: { cacheTTL?: number, batchSize?: number })
```

- **cacheTTL**: Time in milliseconds to cache API results (default: 60000)
- **batchSize**: Number of items to fetch in a single request (default: 3)

### Auctions

Methods for interacting with the Hypixel Auction House.

#### Get All Auctions

```typescript
client.auctions.all(): Promise<AuctionItem[]>
```

Returns all active auctions. Results are cached based on the cacheTTL.

#### Search Auctions by Name

```typescript
client.auctions.search(query: string): Promise<AuctionItem[] | null>
```

Searches for auctions by item name.

#### Filter Auctions

```typescript
client.auctions.filter(options: {
  tier?: Tier;
  minPrice?: number;
  maxPrice?: number;
  binOnly?: boolean;
  itemName?: string;
  auctioneer?: string;
}): Promise<AuctionItem[] | null>
```

Filters auctions based on various criteria.

#### Get Auction by UUID

```typescript
client.auctions.get(auctionUUID: string): Promise<AuctionItem | null>
```

Fetches a specific auction by its UUID.

#### Get Auctions by Auctioneer

```typescript
client.auctions.getAuctioneer(auctioneerUUID: string): Promise<AuctionItem[] | null>
```

Fetches all auctions from a specific player by UUID.

#### Cache Management

```typescript
client.auctions.resetCache(): void
client.auctions.refreshCache(): Promise<void>
```

Manually reset or refresh the auction cache.

## Upcoming Features

SkyblockTS is actively being developed with the following features planned:

- **Bazaar API**: Access to real-time bazaar data
- **Player Profiles**: Fetch and analyze player profiles
- **Skills & Stats**: Access player skills and statistics
- **Collections & Minions**: Information about collections and minions
- **Dungeons**: Data related to dungeon runs and statistics
- **More Utilities**: Helper functions for SkyBlock-specific calculations

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](license) file for details.

## Acknowledgments

- [Hypixel API](https://api.hypixel.net/) for providing the data
