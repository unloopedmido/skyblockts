const BASE_URL = "https://api.hypixel.net/v2/skyblock/";

export const fetcher = async (path: string) => {
    console.log(`[SkyblockTS] Fetching ${path}`)
    const res = await fetch(`${BASE_URL}${path}`)
    if (!res.ok) throw new Error(`[SkyblockTS] ${res.status} ${res.statusText}`)

    return res.json()
}

export const fetcherWithKey = async (path: string, apiKey: string) => {
    const headers: Record<string, string> = {}

    if(!apiKey) {
        throw new Error('[SkyblockTS] An API key is required to access this endpoint')
    }
    headers['API-Key'] = apiKey

    const res = await fetch(`${BASE_URL}${path}`, { headers })
    if (!res.ok) throw new Error(`[SkyblockTS] ${res.status} ${res.statusText}`)

    return res.json()
}