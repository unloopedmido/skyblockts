import { CoreClient } from "../CoreClient";
import type { House } from "../types/HousingTypes";

export class Housing {
    constructor(private client: CoreClient) {}

    async active(): Promise<readonly House[]> {
        return this.client.doGetRaw<readonly House[]>("housing/active");
    }

    async house(house: string): Promise<House> {
        const params = new URLSearchParams({ house });
        return this.client.doGetRaw<House>(`housing/house?${params.toString()}`);
    }

    async houses(player: string): Promise<readonly House[]> {
        const params = new URLSearchParams({ player });
        return this.client.doGetRaw<readonly House[]>(`housing/houses?${params.toString()}`);
    }
}
