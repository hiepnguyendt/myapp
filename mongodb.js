const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
app.use(express.json())
var database
const options ={
    definition:{
        openapi: '3.0.0',
        info : {
            title: "Node JS API Project for mongoDB",
            version: '1.0.0'
        },
        servers:[
            {
                url: 'http://localhost:8080/'
            }
        ]
    },
    apis: ['./mongodb.js']

}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/** *
 * @swagger
 * /:
 *     get:
 *         summary: AA this api is used to check if get method is working or not  
 *         description: this api is used to check if get method is working or not
 *         responses:
 *             200:
 *                 description: To test Get method    
 */

app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb API')
})


/** 
 * @swagger 
 * components:
 *      schema:
 *          Book:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
*/

/** 
 * @swagger
 * /api/book:
 *  get:
 *      summary: To get all books from mongodb
 * f
*/

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