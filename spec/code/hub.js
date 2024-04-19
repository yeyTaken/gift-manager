const viewFunctions = require('./func/view');
const generateFunctions = require('./func/generate');
const redeemFunctions = require('./func/redeem');

(async () => {
    // Gerar um presente com o método default
    const defaultGift = await generateFunctions.generateDefault();
    const defaultView = await viewFunctions.viewDefault(defaultGift);
    const defaultRedeem = await redeemFunctions.redeemDefault(defaultGift);

    // Gerar um presente com valores predefinidos
    const typeGift = '980809889';
    const typeView = await viewFunctions.viewType(typeGift);
    const typeRedeem = await redeemFunctions.redeemType(typeGift);

    // Gerar um presente com valores predefinidos
    const customGift = await generateFunctions.generateCustom('diamonds', 500);
    const customView = await viewFunctions.viewCustom(customGift);
    const customRedeem = await redeemFunctions.redeemCustom(customGift);

    console.log({
        default: {
            giftId: defaultGift,
            type: defaultView.type,
            amount: defaultView.amount,
            isRedeemed: defaultRedeem.success
        },
        type: {
            giftId: typeGift,
            type: typeView.type || 'O gift não existe ou já foi resgatado',
            amount: typeView.amount || 'O gift não existe ou já foi resgatado',
            isRedeemed: typeRedeem.success
        },
        custom: {
            giftId: customGift,
            type: customView.type,
            amount: customView.amount,
            isRedeemed: customRedeem.success
        }
    });
})();
