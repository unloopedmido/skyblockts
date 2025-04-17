import { CoreClient } from "../CoreClient";

export class Fetcher {
    private baseURL = "https://api.hypixel.net/v2/";

    constructor(private client: CoreClient) { }

    async fetch<T>(path: string): Promise<T> {
        const APIKey = this.client.config.APIKey;
        const headers: Record<string, string> = {};

        if (APIKey) headers["API-Key"] = APIKey;

        const response = await fetch(`${this.baseURL}${path}`, { headers });

        // Check if we are rate limited
        if (response.status === 429) {
            throw new Error("Hypixel API rate limit exceeded. Please try again later.");
        }

        // Check if our API key is invalid/doesnt exist
        if (response.status === 403) {
            throw new Error("Hypixel API key is invalid or does not exist.");
        }

        if(response.status === 503) {
            throw new Error("Hypixel API is currently down. Please try again later.");
        }

        if(response.status === 400) {
            throw new Error("Hypixel API returned a bad request. Please check if your data is missing some fields.");
        }

        if(response.status === 422) {
            throw new Error("Hypixel API returned an unprocessable entity. Please check if your data is missing some fields.");
        }

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText} ${this.baseURL}${path}`);
        }

        return response.json() as Promise<T>;
    }
}