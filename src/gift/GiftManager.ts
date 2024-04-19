import { QuickDB } from 'quick.db';

export type Gift = {
    id: string;
    isRedeemed: boolean;
    type?: string;
    amount?: number | string;
};

type GenerateOptions = {
    type?: string;
    amount?: number | string;
};

export class GiftManager {
    private db: QuickDB;

    constructor() {
        this.db = new QuickDB({ filePath: 'gifts.json' });
    }

    public async generate(options?: GenerateOptions): Promise<string> {
        const { type, amount } = await this.generateReward(options);
    
        const newGift: Gift = {
            id: this.generateUniqueId(),
            isRedeemed: false,
        };
    
        if (type && amount !== undefined) {
            newGift.type = type;
            newGift.amount = amount;
        }
    
        const code = newGift.id;
        await this.db.set(`gifts.${code}`, newGift);
        return code;
    }    

    private generateReward(options?: GenerateOptions): { type?: string; amount?: number | string } {
        if (options && options.type && options.amount !== undefined) {
            return { type: options.type, amount: options.amount };
        }

        const isKey = Math.random() < 0.5;
        let amount = isKey ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 49001) + 1000;

        if (isKey && amount === 7 && Math.random() < 0.5) {
            amount--;
        }

        if (!isKey && amount === 50000 && Math.random() < 0.5) {
            amount -= 5000;
        }

        return { type: isKey ? 'keys' : 'coins', amount };
    }

    public async redeem(giftId: string): Promise<{ success: boolean }> {
        const gift = await this.db.get(`gifts.${giftId}`);

        if (gift && !gift.isRedeemed) {
            gift.isRedeemed = true;
            await this.db.set(`gifts.${giftId}`, gift);
            return { success: true };
        }

        return { success: false };
    }

    public async view(giftId: string): Promise<{ valid: boolean; type?: string; amount?: number }> {
        const gift = await this.db.get(`gifts.${giftId}`);

        if (gift && gift.type && gift.amount !== undefined) {
            return { valid: true, type: gift.type, amount: gift.amount as number };
        }

        return { valid: false };
    }

    private generateUniqueId(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uniqueId = '';

        for (let i = 0; i < 13; i++) {
            uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return uniqueId;
    }
}
