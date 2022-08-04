const authenticationPolicy = require('../policies/authenticationPolicy')
const authenticationController = require('../controllers/authenticationController')

module.exports = (router) => {
  router.post('/register', authenticationPolicy.register, authenticationController.register)

  router.post('/login', authenticationController.login)
}