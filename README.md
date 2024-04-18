# 🎁 Gift Manager

![GitHub package.json version](https://img.shields.io/github/package-json/v/yeyTaken/gift-manager)
![GitHub](https://img.shields.io/github/license/yeyTaken/gift-manager)
![npm](https://img.shields.io/npm/v/gift-manager)

Gift Manager is a robust and efficient Node.js library designed to streamline the management of gifts. Whether you're building a reward system, organizing special events, or implementing promotional campaigns, Gift Manager has got you covered!

## 🚀 Installation

To install Gift Manager, simply run:

```bash
npm install gift-manager
```

## 📦 Usage

### Initialization

Begin by importing the `GiftManager` class:

```javascript
const { GiftManager } = require('gift-manager');
```

Then instantiate the `GiftManager`:

```javascript
const giftManager = new GiftManager();
```

### Generate a Gift

```javascript
(
    async () => {
        const giftId = await giftManager.generateGift();
        console.log(`Gift generated successfully! ID: ${giftId}`);
    }
)();
```

### Redeem a Gift

```javascript
(
    async () => {
        const giftId = 'your_gift_id_here';

        const redeemResult = await giftManager.redeemGift(giftId);

        if (redeemResult.success) {
            console.log(`Gift redeemed successfully! Prize: ${redeemResult.prizeAmount} ${redeemResult.prizeType}`);
        } else {
            console.log('The gift has already been redeemed or does not exist.');
        }
    }
)();
```

### View a Gift

```javascript
(
    async () => {
        const giftId = 'your_gift_id_here';

        const viewResult = await giftManager.viewGift(giftId);

        if (viewResult.valid) {
            console.log(`Prize: ${viewResult.prizeAmount} ${viewResult.prizeType}`);
        } else {
            console.log('The gift is not valid or does not exist.');
        }
    }
)();
```

### Check Gift Validity

```javascript
(
    async () => {
        const giftId = 'your_gift_id_here';

        const viewResult = await giftManager.viewGift(giftId);

        if (viewResult.valid) {
            console.log('The gift is valid!');
        } else {
            console.log('The gift is not valid or does not exist.');
        }
    }
)();
```

## 📝 General Example

```javascript
const { GiftManager } = require('gift-manager');
const giftManager = new GiftManager();

(
    async () => {

        const giftId = await giftManager.generateGift();
        // const giftId = 'your_gift_id_here';

        const viewResult = await giftManager.viewGift(giftId);
        const giftIdIsValid = viewResult.valid;

        if (giftIdIsValid) {
            console.log({
                GiftID: giftId,
                PrizeAmount: viewResult.prizeAmount,
                PrizeType: viewResult.prizeType,
            });
        } else {
            console.log({
                GiftID: giftId,
                Error: 'The gift is not valid or does not exist.',
            });
        }

    }
)();

```

## ❗ Error Handling

- **Async/Await Usage**: Ensure all calls to Gift Manager methods are within an `async` function and that `await` is used before each method call.

    ```javascript
    // Incorrect
    const giftId = giftManager.generateGift();

    // Correct
    const giftId = await giftManager.generateGift();
    ```

- **Invalid Gift ID**: If an invalid or non-existent gift ID is provided, `viewGift` and `redeemGift` methods will return an object with `valid: false`.

    ```javascript
    const viewResult = await giftManager.viewGift('invalid_gift_id');
    
    if (!viewResult.valid) {
        console.log('The gift is invalid or does not exist.');
    }
    ```

## 📜 Documentation

Comprehensive documentation can be found at [link_to_documentation](#).

## 🤝 Contributing

Contributions are always welcome! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## 📝 License

This project is licensed under the [ISC](LICENSE) License. See the [LICENSE](LICENSE) file for more information.

## 📊 Project Status

- **Status**: Active
- **Last Updated**: April 2024

## 📧 Contact

For inquiries, support, or feedback, please feel free to contact:

- Email: [takenstudios.contact@gmail.com](mailto:takenstudios.contact@gmail.com)
- GitHub: [yeyTaken](https://github.com/yeyTaken)
