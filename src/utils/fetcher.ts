import { SkyblockTS } from "../SkyblockTS";

export default class Fetcher {
	private baseUrl = "https://api.hypixel.net/v2/skyblock/";

	constructor(private client: SkyblockTS) {}

	async fetch<T>(path: string, requiresKey: boolean = true): Promise<T> {
		const apiKey = this.client.config.apiKey;
		const headers: Record<string, string> = {};

		if (requiresKey && !apiKey) {
			throw new Error(
				"[SkyblockTS] An API key is required to access this endpoint",
			);
		}
		if (apiKey) headers["API-Key"] = apiKey;

		const res = await fetch(`${this.baseUrl}${path}`, { headers });
		if (!res.ok) throw new Error(`[SkyblockTS] ${res.status} ${res.statusText} ${this.baseUrl}${path}`);

		return res.json() as Promise<T>;
	}
}