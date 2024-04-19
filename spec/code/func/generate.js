const { GiftManager } = require('../../index');
const gm = new GiftManager();

module.exports = {
    async generateDefault() {
        return await gm.generate();
    },
    async generateType(typeGift) {
        return await gm.generate({ type: typeGift });
    },
    async generateCustom(type, amount) {
        return await gm.generate({ type, amount });
    }
};
