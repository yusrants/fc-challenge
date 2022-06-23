const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = {

connectToDB : () => 
{
    client.connect((err,db) => {
        if (err) 
            console.log(err);
        else 
            {
                console.log("Connected to db");
            }
        client.close();
      })
},

getClient : () => client

}


