const dbo = require("../db/config");
const user = require("../api/user");
const helper = require("../api/helpers");

const client = dbo.getClient();

async function getAllUsers() {
    const result = await client.db("fc-collection").collection("users_info").find().limit(30).toArray();

    if (result) {
        return result;
    } 
}

async function getUser(key) {
    let cached_user = await client.db("fc-collection").collection("users_info").findOne({key});

    if (cached_user ) {
        console.log(`Cache Hit`);

        if (!helper.isDataExpired(cached_user))
            {

            }

    } 
    else {
        console.log(`Cache miss`);

        /* If cache misses, create a new user with the added key and a random string and return 
         the secret i.e a random string */

        let add_user = new user.User(key);
        await createUser(add_user);
        cached_user = add_user;
    }

    return cached_user['secret'];

}

async function createUser(user) {
    const result = await client.db("fc-collection").collection("users_info").insertOne(user);
    console.log(`New data added`);
}

/* async function populateData(){
    let users = helper.createData();
    const result = await client.db("fc-collection").collection("users_info").insertMany(users);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
} */

module.exports = { getUser, createUser, getAllUsers}