![GitHub package.json version](https://img.shields.io/github/package-json/v/yeyTaken/gift-manager)
![GitHub](https://img.shields.io/github/license/yeyTaken/gift-manager)
![npm](https://img.shields.io/npm/v/gifts-manager) 

 <h1 align="center">
🎁

Gift Manager
 </h1>
 
Gift Manager é uma biblioteca Node.js abrangente projetada para simplificar o gerenciamento de presentes. Seja para construir um sistema de recompensas, organizar eventos especiais ou implementar campanhas promocionais, o Gift Manager garante um manuseio eficiente e organizado de presentes.

## 📑 Índice

- [Instalação](#instalação)
- [Uso](#uso)
  - [Inicialização](#inicialização)
  - [Integração com Discord.js](#integração-com-discordjs)
- [Estrutura do gifts.json](#estrutura-do-giftsjson)
- [Tratamento de Erros](#tratamento-de-erros)
- [Documentação](#documentação)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Status do Projeto](#status-do-projeto)
- [Contato](#contato)

## 🚀 Instalação <a name="instalação"></a>

Instale o Gift Manager via npm:

```bash
npm install gifts-manager
```

## 📦 Uso <a name="uso"></a>

### Inicialização <a name="inicialização"></a>

Comece importando a classe `GiftManager`:

```javascript
const { GiftManager } = require('gifts-manager');
```

Em seguida, instancie o `GiftManager`:

```javascript
const gm = new GiftManager();
```

#### Resgatar um Presente

```javascript
(
    async () => {
        const giftId = 'seu_id_de_presente_aqui';
        const redeemResult = await gm.redeem(giftId);
        if (redeemResult.success) {
            console.log(`Presente resgatado com sucesso! Prêmio: ${redeemResult.amount} ${redeemResult.type}`);
        } else {
            console.log('Presente já foi resgatado ou é inválido.');
        }
    }
)();
```

#### Visualizar um Presente

```javascript
(
    async () => {
        const giftId = 'seu_id_de_presente_aqui';
        const viewResult = await gm.view(giftId);
        if (viewResult.valid) {
            console.log(`Prêmio: ${viewResult.amount} ${viewResult.type}`);
        } else {
            console.log('ID de presente inválido.');
        }
    }
)();
```

#### Gerar um Presente <a name="gerar-presente"></a>

Para gerar um presente, você pode optar por valores predefinidos ou definidos pelo usuário:

```javascript
// Gerar um presente com valores predefinidos
const giftId1 = await gm.generate();
console.log(`Gift ID gerado: ${giftId1}`);

// Gerar um presente com valores definidos pelo usuário
const giftId3 = await gm.generate({
    type: 'diamonds',
    amount: 100,
});
console.log(`Gift ID gerado: ${giftId3}`); 
```

### Integração com Discord.js <a name="integração-com-discordjs"></a>

Aqui está um exemplo simplificado demonstrando a integração do `GiftManager` com um bot Discord.js:

```javascript
const Discord = require('discord.js');
const client = new Discord.Client();
const { GiftManager } = require('gifts-manager');
const gm = new GiftManager();
const { prefix } = require('./config.json') || '-';

client.once('ready', () => {
    console.log('Bot está operacional.');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix+'generate')) {
        const amount = Math.floor(
            Math.random() * (10000 - 1000 + 1)
            ) + 1000;
        const giftId = await gm.generate({
            type: 'daily',
            amount: amount,
        });
        message.channel.send(`Presente gerado! ID: ${giftId}`);
    }

    if (message.content.startsWith(prefix+'redeem')) {
        const giftId = message.content.split(' ')[1];
        const result = await gm.redeem(giftId);
        result.success ? message.channel.send(`Presente resgatado! Prêmio: ${result.amount} ${result.type}`) : message.channel.send('Presente já foi resgatado ou é inválido.');
    }

    if (message.content.startsWith(prefix+'view')) {
        const giftId = message.content.split(' ')[1];
        const result = await gm.view(giftId);
        result.valid ? message.channel.send(`Prêmio: ${result.amount} ${result.type}`) : message.channel.send('ID de presente inválido.');
    }
});

client.login('SEU_TOKEN_DO_DISCORD_BOT');
```

## 📜 Documentação <a name="documentação"></a>

Para documentação detalhada, visite [link_para_documentação](#).

## 🤝 Contribuições <a name="contribuições"></a>

Contribuições são bem-vindas! Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes.

## 📝 Licença <a name="licença"></a>

Este projeto está licenciado sob a Licença [ISC](LICENSE).

## 📊 Status do Projeto <a name="status-do-projeto"></a>

- **Status**: Ativo
- **Última Atualização**: Abril de 2024

---

<h1 align="center">
<img src="./src/assets/img/takenstudios.png" alt="takenstudios" width="290"/>
</h1>

Para perguntas, suporte ou feedback:

- Email: [takenstudios.contact@gmail.com](mailto:takenstudios.contact@gmail.com)
- GitHub: [yeyTaken](https://github.com/yeyTaken)

---
<h2 align="center">
© 2020-2024 TakenStudios & Israel R. Jatobá
 </h2>