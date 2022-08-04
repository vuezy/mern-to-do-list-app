const { User } = require('../models')
const { jwtSign } = require('../utils')

module.exports = {
  async register(req, res) {
    try {
      const candidateUser = req.body
      const isFound = await User.findOne({ username: candidateUser.username }).lean()
      if (isFound) {
        return res.status(400).json({
          success: false,
          error: {
            username: 'Username already in use!'
          }
        })
      }

      const user = await User.create(candidateUser)
      res.status(200).json({
        success: true,
        user: user
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        username: username
      })

      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'Invalid username or password!'
        })
      }

      const passwordIsValid = await user.comparePassword(password)
      if (!passwordIsValid) {
        return res.status(403).json({
          success: false,
          error: 'Invalid username or password!'
        })
      }

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          username: user.username
        },
        token: jwtSign(user)
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
}