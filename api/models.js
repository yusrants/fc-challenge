var crypto = require("crypto");
var random = require('random-name')

// Let's assume our data has a list of users
// The key could be any string

class User {
    constructor(key) {
        this.key = key;
        this.fname = random.first();
        this.lname = random.last();
        this.city = random.place();
        this.time_created = new Date();
    }
}

class RandomString {
    constructor(key) {
        this.key = key;
        this.time_created = new Date();
        this.value = crypto.randomBytes(10).toString('hex');
    }

}

module.exports = { User, RandomString}