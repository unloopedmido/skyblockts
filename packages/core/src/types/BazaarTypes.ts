export interface BazaarItem {
    product_id: string;
    sell_summary: { amount: number; pricePerUnit: number; orders: number }[]
    buy_summary: { amount: number; pricePerUnit: number; orders: number }[];
    quick_status: {
        productId: string;
        sellPrice: number;
        sellVolume: number;
        sellMovingWeek: number;
        sellOrders: number;
        buyPrice: number;
        buyVolume: number;
        buyMovingWeek: number;
        buyOrders: number;
    }
}