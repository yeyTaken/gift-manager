import { GiftManager } from '../gift/GiftManager';

describe('GiftManager', () => {
    let gm: GiftManager;

    beforeEach(() => {
        gm = new GiftManager();
    });

    it('should generate a gift with pre-defined values', async () => {
        const giftId = await gm.generate();
        const gift = await gm.view(giftId);

        console.log('Generated gift:', giftId, gift);

        expect(gift.valid).toBe(true);
        expect(gift.type).toBeDefined();
        expect(gift.amount).toBeDefined();
        expect(['keys', 'coins']).toContain(gift.type);
        if (gift.type === 'keys') {
            expect([1, 2, 3, 4, 5, 6, 7, 8]).toContain(gift.amount);
        } else {
            expect(gift.amount).toBeGreaterThanOrEqual(1000);
            expect(gift.amount).toBeLessThanOrEqual(54999);
        }
    });

    it('should generate a gift with user-defined values', async () => {
        const giftId = await gm.generate({
            type: 'diamonds',
            amount: 100
        });
        const gift = await gm.view(giftId);

        console.log('Generated user-defined gift:', giftId, gift);

        expect(gift.valid).toBe(true);
        expect(gift.type).toBe('diamonds');
        expect(gift.amount).toBe(100);
    });

    it('should redeem a gift', async () => {
        const giftId = await gm.generate();
        const redeemResult = await gm.redeem(giftId);

        console.log('Redeem result:', redeemResult);

        expect(redeemResult.success).toBe(true);
    });

    it('should not redeem a gift that has already been redeemed', async () => {
        const giftId = await gm.generate();
        await gm.redeem(giftId);
        const redeemResult = await gm.redeem(giftId);

        console.log('Redeem result for already redeemed gift:', redeemResult);

        expect(redeemResult.success).toBe(false);
    });

    it('should view a valid gift', async () => {
        const giftId = await gm.generate();
        const viewResult = await gm.view(giftId);

        console.log('View result for valid gift:', viewResult);

        expect(viewResult.valid).toBe(true);
    });

    it('should not view an invalid gift', async () => {
        const viewResult = await gm.view('invalid_gift_id');

        console.log('View result for invalid gift:', viewResult);

        expect(viewResult.valid).toBe(false);
    });

    it('should view a redeemed gift', async () => {
        const giftId = await gm.generate();
        await gm.redeem(giftId);
        const viewResult = await gm.view(giftId);

        console.log('View result for redeemed gift:', viewResult);

        expect(viewResult.valid).toBe(true);
        expect(viewResult.type).toBeDefined();
        expect(viewResult.amount).toBeDefined();
    });

    it('should generate multiple gifts', async () => {
        const giftIds = [];
        const prefix = 'GIFT-';
        const suffix = '-END';

        for (let i = 0; i < 5; i++) {
            const giftId = await gm.generate({
                prefix,
                suffix
            });
            giftIds.push(giftId);
        }

        console.log('Generated gift IDs:', giftIds);

        for (const giftId of giftIds) {
            const savedGift = await gm.view(giftId);
            console.log('View result for saved gift:', savedGift);
            expect(savedGift.valid).toBe(true);
        }
    });
});
