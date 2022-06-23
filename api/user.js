var crypto = require("crypto");

// Let's assume our data has a list of users and we have to cache their secrets
// The key for each user could be any 3 characters string, and the secret is a random set of characters

class User {
    constructor(key) {
        this.secret = crypto.randomBytes(20).toString('hex');
        this.key = key;
        this.time_created = new Date(0).getTime();
    }
}

module.exports = { User }