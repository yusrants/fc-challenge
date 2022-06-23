const express = require('express');
const app = express()
const cors = require('cors');
const bodyparser = require('body-parser');


app.use(express.json())
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));


const builder = require("./api/builder");
const { json } = require('body-parser');

// pouplates the db with random data of users
app.get('/populate', (request, response)=> {
    
    let result = builder.populateDB();
    result.then((data) => response.send(data));

})

// returns all stored keys data in the cache
app.get('/keys', (request, response)=> {
    
    let keys = builder.getAllKeys()
    keys.then((data) => response.send(data));

})

// returns cached data for the key
app.get('/key/:id', (request, response)=> {
    
    let key = request.params.id;
    let result = builder.getKey(key);

    result.then( (data) => 
    {
        response.send(data);
    })
})

// creates and updates the data for a given key
app.post('/key/:id', (request, response)=> {
    
    let key = request.params.id;
    let body = request.body;
    let result = builder.addOrUpdateData(key, body);

    result.then( (data) => 
    {
        response.send(data);
    })

})

//removes a given key from the cache
app.delete('/key/:id', (request, response)=> {
    
    let key = request.params.id;
    let deleted = builder.deleteKey(key);
    deleted.then( (data) => 
    {
        response.send(data);
    })
})

//removes all keys from the cache
app.delete('/keys', (request, response)=> {
    
    let deleted = builder.deleteAllKeys();
    deleted.then( (data) => 
    {
        response.send(data);
    })
})


app.listen(5000)