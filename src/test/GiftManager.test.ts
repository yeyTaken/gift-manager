import { GiftManager, Gift } from '../gift/GiftManager';

describe('GiftManager', () => {
    let giftManager: GiftManager;

    beforeEach(() => {
        giftManager = new GiftManager();
    });

    afterEach(async () => {
        await giftManager.save();
    });

    it('should generate a gift', async () => {
        const giftId = await giftManager.generate();
        const gift = await giftManager.view(giftId);

        expect(gift.valid).toBe(true);
    });

    it('should redeem a gift', async () => {
        const giftId = await giftManager.generate();
        const redeemResult = await giftManager.redeem(giftId);

        expect(redeemResult.success).toBe(true);
    });

    it('should not redeem a gift that has already been redeemed', async () => {
        const giftId = await giftManager.generate();
        await giftManager.redeem(giftId);
        const redeemResult = await giftManager.redeem(giftId);

        expect(redeemResult.success).toBe(false);
    });

    it('should view a valid gift', async () => {
        const giftId = await giftManager.generate();
        const viewResult = await giftManager.view(giftId);

        expect(viewResult.valid).toBe(true);
    });

    it('should not view an invalid gift', async () => {
        const viewResult = await giftManager.view('invalid_gift_id');

        expect(viewResult.valid).toBe(false);
    });

    it('should save gifts', async () => {
        const giftId = await giftManager.generate();
        await giftManager.save();

        const savedGift = giftManager.view(giftId);

        expect(savedGift).toBeTruthy();
    });
});
