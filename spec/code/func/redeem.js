const { GiftManager } = require('../../index');
const gm = new GiftManager();

module.exports = {
    async redeemDefault(giftId) {
        const view = await gm.view(giftId);
        if (view.valid) {
            return await gm.redeem(giftId);
        } else {
            return { success: false };
        }
    },
    async redeemType(typeGift) {
        const view = await gm.view(typeGift);
        if (view.valid) {
            return await gm.redeem(typeGift);
        } else {
            return { success: false };
        }
    },
    async redeemCustom(customGift) {
        const view = await gm.view(customGift);
        if (view.valid) {
            return await gm.redeem(customGift);
        } else {
            return { success: false };
        }
    }
};
