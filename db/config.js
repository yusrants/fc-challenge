const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:adminpass@clusterfc.xbigfoo.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
    }
    catch(e) {
        console.log(e);
    }

    finally {
        await client.close(e);
    }