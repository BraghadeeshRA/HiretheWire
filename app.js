const express = require('express');
const app = express();
const path = require('path');


//DB Connectivity
require('./db/conn');


//Router 
app.use(express.json());
app.use(require('./router/auth'));

//Rendering Client
app.use(express.static("client/build"));
app.get("/",function(req,res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//PORT
const PORT = 4000;
app.listen(PORT,()=>console.log(`Server Running on Port ${PORT}`));