const express = require('express');
const app = express()

app.get('/home', (request, response)=> {
    response.json({"one": "1","two":"2","threez":"3"});
})

app.listen(5000,() => { console.log("server running")})