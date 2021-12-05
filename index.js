const express = require('express')

const app = express()

app.use(express.json())

const books = [
    {title:  'GCP', id: 1},
    {title:  'AWS', id: 2},
    {title:  'Azure', id: 3},
]

app.get('/', (req, resp)=> {
    resp.send('Welcome to First Cloud Journey')
})

app.get('/api/book', (req, resp)=>{
    resp.send(books)
})

app.get('/api/book/:id', (req, resp) =>{
    const book =  books.find(version => version.id === parseInt(req.params.id))
    if(!book) resp.status(404).send('Book not found')
    resp.send(book)
})


app.post('/api/book/addbook', (req, resp)=>{
    const book = {
        id: books.length+1,
        title: req.body.title
    }
    books.push(book)
    resp.send(book)
})

app.put('/api/book/:id',(req, resp) => {
    const book =  books.find(version => version.id === parseInt(req.params.id))
    if(!book) resp.status(404).send('Book not found')

    book.title=req.body.title
    resp.send(book)
})

app.delete('/api/book/:id',(req, resp)=> {
    const book =  books.find(version => version.id === parseInt(req.params.id))
    if(!book) resp.status(404).send('Book not found')

    const index = books.indexOf(book)
    books.splice(index, 1)
    resp.send(book)
})
app.listen(8080)