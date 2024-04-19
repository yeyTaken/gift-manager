const fs = require('fs');
const path = require('path');

module.exports = {
    GiftManager: require('../dist/index').GiftManager
};

fs.readdirSync(__dirname + '/code').forEach(file => {
    if (file.endsWith('.js') && file !== 'index.js') {
        const moduleName = path.basename(file, '.js');
        require(`./code/${moduleName}`);
    }
});