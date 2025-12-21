const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())

const port = 3000

//Avaliable routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
