
const crypto = require('crypto');

let getRandomString = () => { return crypto.randomBytes(20).toString('hex');}  

module.exports = { getRandomString }