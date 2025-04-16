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

> **Note:** Currently, SkyblockTS only supports auctions, profiles and collections. Support for more features will be added in the future.

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
import { SkyblockTS } from "skyblockts";

// Initialize the client with options
const client = new SkyblockTS({
	// Optional: Set a custom cache TTL in milliseconds (default: 60000)
	cacheTTL: 120000,
	// Optional: Set a custom batch size (default: 3)
	batchSize: 10,
});

// Get all auctions
const allAuctions = await client.auctions.all();

// Filter auctions with various criteria
const filteredAuctions = await client.auctions.filter({
	itemName: "Hyperion",
	tier: "LEGENDARY",
	minPrice: 1000000,
	maxPrice: 10000000,
	binOnly: true,
});

// Get a user's profiles by their UUID
const userProfiles = await client.profiles.get("playerUUID");

// Get all the collections within a category
const collections = await client.collections.get("farming");
```

## Upcoming Features

SkyblockTS is actively being developed with the following features planned:

- **Bazaar API**: Access to real-time bazaar data
- **Skills & Stats**: Access player skills and statistics
- **Dungeons**: Data related to dungeon runs and statistics
- **More Utilities**: Helper functions for SkyBlock-specific calculations
- **Documentation**: Improved documentation with more examples and use cases

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
