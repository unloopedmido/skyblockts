export default class HypixelApiError extends Error {
    constructor(public endpoint: string, public reason?: string) {
        super(`Hypixel API error at ${endpoint}: ${reason ?? "unknown"}`);
    }
}