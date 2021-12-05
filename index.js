const express = require('express')

const app = express()

app.use(express.json())

const myapp = [
    {title:  'Name', id: 1},
    {title:  'Birthday', id: 2},
    {title:  'Job', id: 3},
]

app.get('/', (req, resp)=> {
    resp.send('Welcome to First Cloud Journey')
})

app.get('/api/info', (req, resp)=>{
    resp.send(myapp)
})

app.listen(8080)