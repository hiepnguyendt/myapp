const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(express.json())
var database

app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb API')
})

app.get('/api/book/',(req, resp) =>  {
    database.collection('books').find({}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })
})
app.get('/api/book/:id',(req, resp) =>  {
    database.collection('books').find({}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })
})

app.post('/api/book/addbook', (req, resp)=>{
    let res = database.collection('books').find({}).sort({id: -1}).limit(1)
    res.forEach(obj => {
        if(obj){
            let book ={
                id: obj.id +1,
                title: req.body.title
            }
            database.collection('books').insertOne(book, (err, result) => {
                if(err) resp.status(500).send(err)
                resp.send("Added Successfully")
            })
        }
    });
})

app.put('/api/book/:id',(req, resp) =>  {

    let book = {
        id: parseInt(req.params.id),
        title: req.body.title
    }
    database.collection('books').updateOne(
        {id: parseInt(req.params.id)}, 
       { $set: book},(err, result) =>{
        if(err) throw err
        resp.send(book)

    })
})

app.delete('/api/book/:id', (req, resp) => {
    database.collection('books').deleteOne({id: parseInt(req.params.id)}, (err, result) => {
        if(err) throw err
        resp.send('Book is deleted')
    } )
})

app.listen(8080, () => {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true},(error, result) => {
        if(error) throw error
        database = result.db('mydatabase') 
        console.log('Connection sucessful')
    })
})