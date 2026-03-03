import { CoreClient } from "../CoreClient";

/**
 * Rate limit headers returned by the API (when using an API key).
 * @see https://api.hypixel.net/ - Limits depend on application type; use these to avoid 429s.
 */
export interface RateLimitHeaders {
    limit: number;
    remaining: number;
    reset: number;
}

export class Fetcher {
    private baseURL = "https://api.hypixel.net/v2/";

    constructor(private client: CoreClient) {}

    /**
     * Parse rate limit headers from a response.
     * Headers: RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset (seconds until next minute).
     */
    static getRateLimitHeaders(response: Response): RateLimitHeaders | null {
        const limit = response.headers.get("RateLimit-Limit");
        const remaining = response.headers.get("RateLimit-Remaining");
        const reset = response.headers.get("RateLimit-Reset");
        if (limit == null || remaining == null || reset == null) return null;
        const l = Number(limit);
        const r = Number(remaining);
        const s = Number(reset);
        if (Number.isNaN(l) || Number.isNaN(r) || Number.isNaN(s)) return null;
        return { limit: l, remaining: r, reset: s };
    }

    async fetch<T>(path: string): Promise<T> {
        const APIKey = this.client.config.APIKey;
        const headers: Record<string, string> = {};
        if (APIKey) headers["API-Key"] = APIKey;

        const response = await fetch(`${this.baseURL}${path}`, { headers });

        if (response.status === 429) {
            throw new Error("Hypixel API rate limit exceeded. Please try again later.");
        }
        if (response.status === 403) {
            throw new Error("Hypixel API key is invalid or does not exist.");
        }
        if (response.status === 503) {
            throw new Error("Hypixel API is currently down. Please try again later.");
        }
        if (response.status === 400) {
            throw new Error("Hypixel API returned a bad request. Please check if your data is missing some fields.");
        }
        if (response.status === 422) {
            throw new Error("Hypixel API returned an unprocessable entity. Please check if your data is missing some fields.");
        }
        if (response.status === 404) {
            throw new Error("Hypixel API returned not found. The resource or page may not exist.");
        }
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText} ${this.baseURL}${path}`);
        }

        return response.json() as Promise<T>;
    }
}