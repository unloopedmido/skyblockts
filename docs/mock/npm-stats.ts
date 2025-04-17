import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: "/api/npm-stats",
        method: "get",
        rawResponse: async (req, res) => {
            const npmData = await fetch("https://registry.npmjs.org/skyblockts/latest").then(res => res.json());

            const downloads = await fetch("https://api.npmjs.org/downloads/point/last-week/skyblockts")
                .then(res => res.json())
                .then(d => d.downloads);

            const result = {
                version: npmData.version,
                downloads,
            };

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        }
    },
] as MockMethod[];
