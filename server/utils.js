const path = require('path');

const getAppRoot = () => path.dirname(require.main.filename);

module.exports = {
    getAppRoot
}