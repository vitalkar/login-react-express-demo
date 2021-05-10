const path = require('path');

exports.getAppRoot = () => path.dirname(require.main.filename);
