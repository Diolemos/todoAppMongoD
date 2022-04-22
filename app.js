const express = require('express');
const { MongoClient } = require("mongodb");


const app = express()
let db;
let connectionString = 'mongodb+srv://TodoAppUser:123654@cluster0.0nlte.mongodb.net/TodoApp?retryWrites=true&w=majority'
MongoClient.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    app.listen(3000)
})

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))

app.get("/", function(req, resp){
   db.collection('items').find().toArray(function(err, items){
       console.log(items)
   })
    
    resp.sendFile(__dirname + "/public/index.html")
})

app.post('/create-item', function(req, res){
    // console.log(req.body)
    db.collection("items").insertOne({text: req.body.item}, function(){
        res.send("Thank you for submitting the form")
    })
})




