const dbo = require("../db/config");

const helper = require("../api/helpers");
const response = require("../api/responses");
const client = dbo.getClient();

// To be added to env
const database = "fc-collection";
const collection = "users_info";
const limit = 30;
const unset = {value: "", fname:"", lname: "", city: "" }

async function getAllKeys() {
    const result = await client.db(database).collection(collection).find().toArray();

    if (result) return result;
    else 
        return response.notFound;
}

async function getKey(key) {
    let cached_data = await client.db(database).collection(collection).findOne({key});
    
    if (cached_data) {
        console.log(`Cache Hit`);
        if (helper.isDataExpired(cached_data))
            { 
                // if the data is expired, replace its content with a random string and return the string
                return updateTime(key);
            }
        else {
            let updated_data = updateData(key, "Update TTL");
            return updated_data;
        }
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

    let new_data = data;
    let count = await client.db(database).collection(collection)
        .countDocuments();

    /* If the cache has reached its limit, replace the item with the earliest date i.e 
        oldest key in the collction */ 
    if (count > limit)
    {
        await client.db(database).collection(collection)
        .findOne(
            {},
            { sort: { datetime: -1 } },
            (err, data) => {
               key = data.key;
               updateData(key,new_data)
            },
          );
          return response.modified;
        }

    else {
        await client.db(database).collection(collection)
        .insertOne(new_data);

        return response.success;}

}

async function addOrUpdateData (key, data){
    let cached_data = await client.db(database).collection(collection).findOne({key});
    data["time_created"] = new Date();

    if (cached_data)
    {
        updateData(key, data);
        return({"Success": `One key was modified `});
    }
    else{
        data["key"] = key
        addData(data);
    }

}
async function updateData(key, data) {

    if (data)
    {
        let result = await client.db(database).collection(collection)
        .findOneAndUpdate({ key: key },
            { $unset: { fname: "", lname: "", value: "", city: "" } } , { $set: data});

        return result.value;
    }
        
    else {
        let random_string = helper.createRandomString(key);

        let result = await client.db(database).collection(collection)
            .findOneAndUpdate({ key: key }, { $set: random_string });
        
        // return the added string of random characters
        return result.value.value;}
    

}

async function updateTime (key)

    {
        let result = await client.db(database).collection(collection)
            .findOneAndUpdate({ key: key }, { $set: {time_created: new Date()} });
        
        return result.value;
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
        return {"Success": `${count} new keys(s) created`}

    else 
        return {"Error ": "Records not added"}
}

module.exports = { getKey, getAllKeys, addData, updateData, addOrUpdateData, deleteKey, deleteAllKeys, populateDB}