const dbo = require("../db/config");
const helper = require("../api/helpers");
const client = dbo.getClient();

// To be added to env
const database = "fc-collection";
const collection = "users_info";
const limit = 30;

async function getAllKeys() {
    const result = await client.db(database).collection(collection).find().limit(30).toArray();

    if (result) {
        return result;
    } 
    else return {"Error 404": "No data found"}
}

async function getKey(key) {
    let cached_data = await client.db(database).collection(collection).findOne({key});
    
    if (cached_data) {
        console.log(`Cache Hit`);

        if (helper.isDataExpired(cached_data))
            {
                // if the data is expired, replace its content with a random string and return the string
                let updated_data = updateData(key, null);
                return updated_data;
            }
        else return cached_data; 
    } 
    else {
        console.log(`Cache miss`);
        /* If cache misses, insert the key with a random string */
        let random_string = helper.createRandomString(key);

        // Add the new object to the cache
        await addData(random_string);
        return random_string['value'];
    }
}

async function addData(data) {
    const result = await client.db(database).collection(collection).insertOne(data);
}

async function updateData(key, new_data) {


    if (new_data)
    {   
        let result = await client.db(database).collection(collection)
            .findOneAndUpdate({ key: key }, { $set: new_data });
        
        return result.value;
    }
    else
    {
        let random_string = helper.createRandomString(key);

        let result = await client.db(database).collection(collection)
            .findOneAndUpdate({ key: key }, { $set: random_string });
        
        return result.value.value;

    }

}

async function deleteKey(key) {

    const result = await client.db(database).collection(collection)
            .deleteOne({ key });

        if (result.deletedCount === 1)
        {
            return {"Success": `Data with key ${key} not found`}
        }

        else return {"Error 404": `Data with key ${key} not found`}
}

async function deleteAllKeys(key) {

    const result = await client.db(database).collection(collection)
            .deleteMany();
    
        if (result.deletedCount > 0)
            return({"Success": `${result.deletedCount} document(s) was/were deleted.`});
        else
        return({"Error": "Not deleted"});

}

async function populateDB(){

    let users = helper.createRandomUsers();
    const result = await client.db(database).collection(collection)
                   .insertMany(users);
    const count = result.insertedCount

    if (count > 0)
        return {"Success": `${count} new users(s) created`}

    else 
        return {"Error ": "Records not added"}
}

module.exports = { getKey, getAllKeys, addData, deleteKey, deleteAllKeys, populateDB}