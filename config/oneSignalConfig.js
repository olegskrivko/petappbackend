// onesignalClient.js
const OneSignal = require("onesignal-node");

const client = new OneSignal.Client({
  userAuthKey: process.env.oneSignal_YOUR_USER_AUTH_KEY, // Replace with your OneSignal User Auth Key
  app: {
    appAuthKey: process.env.oneSignal_YOUR_APP_AUTH_KEY,
    appId: process.env.oneSignal_YOUR_APP_ID,
  }, // Replace with your OneSignal App Auth Key and App ID
});

module.exports = client;
