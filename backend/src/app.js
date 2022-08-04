if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes')
const { port } = require('./config')
require('./models')
require('./passport')


const app = express()
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(router)


app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})