import { QuickDB } from 'quick.db';

export type Gift = {
    id: string;
    isRedeemed: boolean;
    prizeType: 'keys' | 'coins';
    prizeAmount: number;
};

export class GiftManager {
    private db: QuickDB;

    constructor() {
        this.db = new QuickDB({ filePath: 'gifts.json' });
    }

    public async generateGift(): Promise<string> {
        const { prizeType, prizeAmount } = this.generatePrize();
        const newGift: Gift = {
            id: this.generateUniqueId(),
            isRedeemed: false,
            prizeType,
            prizeAmount,
        };

        await this.db.set(`gifts.${newGift.id}`, newGift);
        return newGift.id;
    }

    private generatePrize(): { prizeType: 'keys' | 'coins'; prizeAmount: number } {
        const isKey = Math.random() < 0.5;
        let prizeAmount = isKey ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 49001) + 1000;

        if (isKey && prizeAmount === 7 && Math.random() < 0.5) {
            prizeAmount--;
        }

        if (!isKey && prizeAmount === 50000 && Math.random() < 0.5) {
            prizeAmount -= 5000;
        }

        return { prizeType: isKey ? 'keys' : 'coins', prizeAmount };
    }

    public async redeemGift(giftId: string): Promise<{ success: boolean; prizeType?: 'keys' | 'coins'; prizeAmount?: number }> {
        const gift = await this.db.get(`gifts.${giftId}`);

        if (gift && !gift.isRedeemed) {
            gift.isRedeemed = true;
            await this.db.set(`gifts.${giftId}`, gift);
            return { success: true, prizeType: gift.prizeType, prizeAmount: gift.prizeAmount };
        }

        return { success: false };
    }

    public async viewGift(giftId: string): Promise<{ valid: boolean; prizeType?: 'keys' | 'coins'; prizeAmount?: number }> {
        const gift = await this.db.get(`gifts.${giftId}`);

        if (gift) {
            return { valid: true, prizeType: gift.prizeType, prizeAmount: gift.prizeAmount };
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

    public async saveGifts() {
        await this.db.set('gifts', this.db.get('gifts'));
    }
}
