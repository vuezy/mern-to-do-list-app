const Joi = require('joi').extend(require('@joi/date'))

module.exports = {
  submitTaskForm(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      priority: Joi.string().valid('3-Low', '2-Medium', '1-High').required(),
      dueDate: Joi.date().format('YYYY-MM-DD HH:mm').greater('now').required(),
      info: Joi.string().min(0).max(500)
    })

    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const errorsArray = error.details.map(err => err.context.key)
      res.status(400).json({
        success: false,
        error: errorsArray
      })
    }
    else {
      next()
    }
  }
}