const bcrypt = require('bcrypt')

module.exports = (Schema, model) => {
  const UserSchema = new Schema(
    {
      username: String,
      password: String
    }, 
    {
      timestamps: true
    }
  )

  UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()

    const SALT_ROUNDS = 10
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS)
      const hash = await bcrypt.hash(this.password, salt)
      this.password = hash
      next()
    }
    catch(err) {
      return next(err)
    }
  })

  UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password)
      return isMatch
    }
    catch(err) {
      return false
    }
  }
  
  const User = model('User', UserSchema)
  return User
}