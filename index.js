const express = require('express');
const app = express()
const cors = require('cors');
const bodyparser = require('body-parser');


app.use(express.json())
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));


const builder = require("./api/main");

// returns all stored keys in the cache
app.get('/populate', (request, response)=> {
    
    let result = builder.populateDB();
    result.then((data) => response.send(data));

})

// returns all stored keys data in the cache
app.get('/users', (request, response)=> {
    
    let users = builder.getAllKeys()
    users.then((data) => response.send(data));

})

// returns cached data for the key
app.get('/user/:key', (request, response)=> {
    
    let key = request.params.key;
    let result = builder.getKey(key);

    result.then( (data) => 
    {
        response.send(data);
    })
})

// creates and updates the data for a given key
app.post('/user/:key', (request, response)=> {
    
    let key = request.params.key;
    console.dir(request.body)  // <==== req.body will be a parsed JSON object

})

//removes a given key from the cache
app.delete('/user/:key', (request, response)=> {
    
    let key = request.params.key;
    let deleted = builder.deleteKey(key);
    deleted.then( (data) => 
    {
        response.send(data);
    })
})

//removes all keys from the cache
app.delete('/users', (request, response)=> {
    
    let deleted = builder.deleteAllKeys();
    deleted.then( (data) => 
    {
        response.send(data);
    })
})


app.listen(5000)