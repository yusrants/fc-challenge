
const crypto = require('crypto');

let currentDate = new Date(0);
const TTL = 86400;

// Lets assume our cache has a limit of 30 entries
const limit = 30;

let isDataExpired = (user) => { return ((user['date_created'].getTime() / 1000) + TTL) < (currentDate.getTime() / 1000); }

module.exports = { isDataExpired}