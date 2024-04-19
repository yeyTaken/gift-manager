# 🎁 Gift Manager

![GitHub package.json version](https://img.shields.io/github/package-json/v/yeyTaken/gift-manager)
![GitHub](https://img.shields.io/github/license/yeyTaken/gift-manager)
![npm](https://img.shields.io/npm/v/gift-manager)

Gift Manager is a comprehensive Node.js library designed to simplify gift management. Whether you're building a reward system, organizing special events, or implementing promotional campaigns, Gift Manager ensures efficient and organized gift handling.

## 📑 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialization](#initialization)
  - [Integration with Discord.js](#integration-with-discordjs)
- [Error Handling](#error-handling)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Project Status](#project-status)
- [Contact](#contact)

## 🚀 Installation <a name="installation"></a>

Install Gift Manager via npm:

```bash
npm install gift-manager
```

## 📦 Usage <a name="usage"></a>

### Initialization <a name="initialization"></a>

Begin by importing the `GiftManager` class:

```javascript
const { GiftManager } = require('gift-manager');
```

Then instantiate the `GiftManager`:

```javascript
const giftManager = new GiftManager();
```

#### Redeem a Gift

```javascript
(
    async () => {
        const giftId = 'your_gift_id_here';
        const redeemResult = await giftManager.redeem(giftId);
        if (redeemResult.success) {
            console.log(`Gift redeemed successfully! Prize: ${redeemResult.prizeAmount} ${redeemResult.prizeType}`);
        } else {
            console.log('Gift already redeemed or invalid.');
        }
    }
)();
```

#### View a Gift

```javascript
(
    async () => {
        const giftId = 'your_gift_id_here';
        const viewResult = await giftManager.view(giftId);
        if (viewResult.valid) {
            console.log(`Prize: ${viewResult.prizeAmount} ${viewResult.prizeType}`);
        } else {
            console.log('Invalid gift ID.');
        }
    }
)();
```

#### Check Gift Validity

```javascript
(
    async () => {
        const giftId = 'your_gift_id_here';
        const viewResult = await giftManager.view(giftId);
        if (viewResult.valid) {
            console.log('Gift is valid.');
        } else {
            console.log('Invalid gift ID.');
        }
    }
)();
```

### Integration with Discord.js <a name="integration-with-discordjs"></a>

Here's a streamlined example demonstrating the integration of `GiftManager` with a Discord.js bot:

```javascript
const Discord = require('discord.js');
const { GiftManager } = require('gift-manager');

const client = new Discord.Client();
const giftManager = new GiftManager();

client.once('ready', () => {
    console.log('Bot is operational.');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!generate')) {
        const giftId = await giftManager.generate();
        message.channel.send(`Gift generated! ID: ${giftId}`);
    }

    if (message.content.startsWith('!redeem')) {
        const giftId = message.content.split(' ')[1];
        const result = await giftManager.redeem(giftId);
        result.success ? message.channel.send(`Gift redeemed! Prize: ${result.prizeAmount} ${result.prizeType}`) : message.channel.send('Gift already redeemed or invalid.');
        await giftManager.save();
    }

    if (message.content.startsWith('!view')) {
        const giftId = message.content.split(' ')[1];
        const result = await giftManager.view(giftId);
        result.valid ? message.channel.send(`Prize: ${result.prizeAmount} ${result.prizeType}`) : message.channel.send('Invalid gift ID.');
    }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
```

## ❗ Error Handling <a name="error-handling"></a>

Ensure all calls to Gift Manager methods are within an `async` function and that `await` is used:

```javascript
// Incorrect
const giftId = giftManager.generate();

// Correct
const giftId = await giftManager.generate();
```

For invalid or non-existent gift IDs, `view` and `redeem` will return `valid: false`:

```javascript
const result = await giftManager.view('invalid_gift_id');
if (!result.valid) {
    console.log('Invalid gift ID.');
}
```

## 📜 Documentation <a name="documentation"></a>

For detailed documentation, visit [link_to_documentation](#).

## 🤝 Contributing <a name="contributing"></a>

Contributions are welcome! Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License <a name="license"></a>

This project is licensed under the [ISC](LICENSE) License.

## 📊 Project Status <a name="project-status"></a>

- **Status**: Active
- **Last Updated**: April 2024

## 📧 Contact <a name="contact"></a>

For inquiries, support, or feedback:

- Email: [takenstudios.contact@gmail.com](mailto:takenstudios.contact@gmail.com)
- GitHub: [yeyTaken](https://github.com/yeyTaken)