module.exports = (Schema, model) => {
  const TaskSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      name: String,
      priority: String,
      dueDate: String,
      status: String,
      info: String
    },
    {
      timestamps: true
    }
  )

  const Task = model('Task', TaskSchema)
  return Task
}