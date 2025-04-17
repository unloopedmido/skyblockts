# skyblock‑ts

A monorepo of TypeScript packages for working with the Hypixel SkyBlock API.

- **@skyblock‑ts/core** – a zero‑opinion, fully typed Hypixel SkyBlock API client.  
- **@skyblock‑ts/tools** – (coming soon) high‑level utilities built on `@skyblock‑ts/core` for caching, searching, filtering, and more.

[![MIT License](https://img.shields.io/github/license/unloopedmido/skyblockts.svg)](LICENSE)  
[![Node.js ≥16](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue.svg)](https://www.typescriptlang.org/)

## Packages

### @skyblock‑ts/core

- Typed, promise‑based wrapper around the [Hypixel API’s SkyBlock endpoints](https://api.hypixel.net/).  
- Full ESM support with auto‑generated `.d.ts` definitions.  
- Zero runtime dependencies (except your own `fetch` or Node built‑ins).  
- Strict, immutable response types (`readonly` fields & arrays).

[![npm version](https://img.shields.io/npm/v/@skyblock-ts/core.svg)](https://www.npmjs.com/package/@skyblock-ts/core)

Install and use:

```bash
npm install @skyblock-ts/core
# or
pnpm add @skyblock-ts/core
```

```ts
import { CoreClient, defaultClient } from "@skyblock-ts/core";

// Option A: use the shared default client (reads API key from `process.env.HYPIXEL_API_KEY`)
const news = await defaultClient.misc.news()

// Option B: customize your own client instance
const client = new CoreClient({ APIKey: "YOUR_API_KEY_HERE" });
const auctions = await client.auction.activeAuctions(0);
```

Browse the full API surface and response types in [`packages/core/src`](https://github.com/unloopedmido/skyblockts/tree/main/packages/core/src).

---

### @skyblock‑ts/tools (soon)

A set of batteries‑included utilities on top of `@skyblock‑ts/core`, featuring:

- In‑memory caching with configurable TTL  
- Auction filters & search (by item, price range, BIN only, etc.)  
- Profile lookup helpers and batch fetching  
- Convenience functions for commons SkyBlock calculations  

_Released soon!_

## Installation (monorepo)

If you clone this repo and want to work on all packages locally:

```bash
git clone https://github.com/unloopedmido/skyblockts.git
cd skyblockts
pnpm install
pnpm build        # builds all workspaces
pnpm test         # runs all tests
pnpm dev          # watch mode for all packages
```

## Contributing

We welcome issues, suggestions, and pull requests:

1. Fork the repo & create a topic branch  
2. Commit your changes with clear, atomic messages  
3. Run `pnpm lint && pnpm test` and ensure all checks pass  
4. Open a PR against `main` with a description of your changes  

Please review our [LICENSE](LICENSE) and [CONTRIBUTING.md](./CONTRIBUTING.md) (if added) before submitting.

## License

This project and all packages are MIT‑licensed. See [LICENSE](LICENSE) for full details.

## Acknowledgments

- Hypixel for the public API  
- The TypeScript community for excellent tooling  
- All contributors and open‑source libraries that make this possible!