
const crypto = require('crypto');
const models = require("./models");

const currentDate = new Date();
const TTL = 5;
const limit = 30;

let isDataExpired = (data) => { return ((data['time_created'].getTime() / 1000) + TTL) < (currentDate.getTime() / 1000); }

let createUser = (key) => new models.User(key)

let createRandomUsers = () => {
    let users = [];
    for (let i=0; i < limit; i++)
    {
        let user_key =  crypto.randomBytes(2).toString('hex');
        users.push(new models.User(user_key));
    }

    return users;
}

let createRandomString = (key) => new models.RandomString(key);


module.exports = { isDataExpired, createUser, createRandomUsers, createRandomString}