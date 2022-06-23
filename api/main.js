const dbo = require("../db/config");
const helper = require("../api/helpers");

const client = dbo.getClient();

async function getAllUsers() {
    const result = await client.db("fc-collection").collection("users_info").find();

    if (result) {
        console.log(result);
    } else {
        console.log(`No listings found'`);
    }
}

async function getUser(key) {
    let result = await client.db("fc-collection").collection("users_info").findOne({key});

    if (result) {
        console.log(`Cache Hit`);
        return result;
    } else {
        console.log(`Cache miss`);
        let data = helper.getRandomString();

    }

    return result;
}

async function createUser() {
    const result = await client.db("fc-collection").collection("users_info").find();

    if (result) {
        console.log(result);
    } else {
        console.log(`No listings found'`);
    }
}


module.exports = { getUser }