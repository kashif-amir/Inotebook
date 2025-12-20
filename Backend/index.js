const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()

var cors = require('cors')
const port = 3000

app.use(express.json());
app.use(cors())


//Avaliable routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
