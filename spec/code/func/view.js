const { GiftManager } = require('../../index');
const gm = new GiftManager();

module.exports = {
    async viewDefault(giftId) {
        return await gm.view(giftId);
    },
    async viewType(typeGift) {
        return await gm.view(typeGift);
    },
    async viewCustom(customGift) {
        return await gm.view(customGift);
    }
};
