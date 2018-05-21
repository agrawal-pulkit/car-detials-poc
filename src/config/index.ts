let env = process.env.NODE_ENV || 'dev'
, appConfig = require('../config/config.'+env);

console.log("--------appConfig-----"+JSON.stringify(appConfig));
module.exports = appConfig;