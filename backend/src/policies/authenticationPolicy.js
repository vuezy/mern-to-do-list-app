const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(5).max(12).required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.alphanum':
              err.message = 'Username must only contain alphanumeric characters!'
              break
            default:
              err.message = 'Username must have 5-12 characters!'
              break
          }
        })
        return errors
      }),
      
      password: Joi.string().alphanum().min(8).max(32).required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.alphanum':
              err.message = 'Password must only contain alphanumeric characters!'
              break
            default:
              err.message = 'Password must have 8-32 characters!'
              break
          }
        })
        return errors
      })
    })

    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      let errorsObject = {}
      error.details.forEach(err => {
        errorsObject = {
          ...errorsObject,
          [err.context.key]: err.message
        }
      })
      res.status(400).json({
        success: false,
        error: errorsObject
      })
    }
    else {
      next()
    }
  }
}