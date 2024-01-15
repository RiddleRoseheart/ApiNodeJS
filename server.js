// Express documentatie

const express = require('express')
const app = express()

app.get('/', (request, res)=>{
    res.send('Hello Node Api')
})
app.listen(3000, ()=>{
console.log('listening on port 3000')
}) // we hear port 3000

