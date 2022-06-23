const { MongoClient, ServerApiVersion } = require('mongodb');

// to be replaced
const uri = "mongodb+srv://admin:adminpass@clusterfc.xbigfoo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = {

connectToDB : () => 
{
    client.connect((err,db) => {
        if (err) 
            console.log(err);
        else 
            console.log("Connected to db")
        client.close();
      })
},

getClient : () => client

}


