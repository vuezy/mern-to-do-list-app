if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const Promise = require('bluebird')
const { db } = require('../src/config')
// Modify these two json files as you like
const users = require('./users.json')
const tasks = require('./tasks.json')

mongoose.connect(
  `mongodb://${db.host}:${db.port}/${db.name}`,
  {
    user: db.user,
    pass: db.pwd,
    authSource: db.auth
  }
)

function resetDB() {
  const connection = mongoose.connection
  connection.once('open', async () => {
    try {
      const collections = await connection.db.listCollections().toArray()
      await Promise.all(collections.map(collection => {
        return connection.db.dropCollection(collection.name)
      }))
      console.log('Successfully dropped all collections')

      const models = require('../src/models')
      console.log('Successfully created all collections')

      // The lines below this are just for testing purposes
      const newUsers = await Promise.all(users.map(user => models['User'].create(user)))
      console.log("Successfully inserted documents to 'users' collection")

      await Promise.all(tasks.map(task => {
        task.userId = newUsers[0]._id
        return models['Task'].create(task)
      }))
      console.log("Successfully inserted documents to 'tasks' collection")
    }
    catch(err) {
      console.log(err)
    }
    finally {
      mongoose.disconnect()
    }
  })
}

resetDB()