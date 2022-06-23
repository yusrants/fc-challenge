const express = require('express');
const app = express()
const cors = require('cors');

app.use(cors());

const builder = require("./api/main");

app.get('/', (request, response)=> {
    response.json({"message": "server is running"});
})

// returns all stored keys in the cache
app.get('/users', (request, response)=> {
    
    let key = request.params.key;

})

// returns cached data
app.get('/user/:key', (request, response)=> {
    
    let key = request.params.key;
    let res = builder.getUser(key);
    res.then( (data) => 
    {
        response.send(data);
    })
})

// creates and updates the data for a given key
app.post('/user/:key', (request, response)=> {
    
    let key = request.params.key;
    response.json(builder.getUser(key));

})

//removes a given key from the cache
app.delete('/remove/:key', (request, response)=> {
    
    let key = request.params.key;
    console.log(key)

    response.json(`The key is ${key}`);
})

//removes all keys from the cache
app.delete('/clear', (request, response)=> {
    
    let key = request.params.key;
    console.log(key)

    response.json(`The key is ${key}`);
})


app.listen(5000)