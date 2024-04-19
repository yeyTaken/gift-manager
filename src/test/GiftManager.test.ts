import { GiftManager, Gift } from '../gift/GiftManager';

describe('GiftManager', () => {
    let giftManager: GiftManager;

    beforeEach(() => {
        giftManager = new GiftManager();
    });

    afterEach(async () => {
        await giftManager.saveGifts();
    });

    it('should generate a gift', async () => {
        const giftId = await giftManager.generateGift();
        const gift = await giftManager.viewGift(giftId);

        expect(gift.valid).toBe(true);
    });

    it('should redeem a gift', async () => {
        const giftId = await giftManager.generateGift();
        const redeemResult = await giftManager.redeemGift(giftId);

        expect(redeemResult.success).toBe(true);
    });

    it('should not redeem a gift that has already been redeemed', async () => {
        const giftId = await giftManager.generateGift();
        await giftManager.redeemGift(giftId);
        const redeemResult = await giftManager.redeemGift(giftId);

        expect(redeemResult.success).toBe(false);
    });

    it('should view a valid gift', async () => {
        const giftId = await giftManager.generateGift();
        const viewResult = await giftManager.viewGift(giftId);

        expect(viewResult.valid).toBe(true);
    });

    it('should not view an invalid gift', async () => {
        const viewResult = await giftManager.viewGift('invalid_gift_id');

        expect(viewResult.valid).toBe(false);
    });

    it('should save gifts', async () => {
        const giftId = await giftManager.generateGift();
        await giftManager.saveGifts();

        const savedGift = giftManager.viewGift(giftId);

        expect(savedGift).toBeTruthy();
    });
});
