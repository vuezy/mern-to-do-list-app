const isAuthenticated = require('../policies/isAuthenticated')
const taskPolicy = require('../policies/taskPolicy')
const taskController = require('../controllers/taskController')

module.exports = (router) => {
  router.use('/task', isAuthenticated)

  router
    .route('/task')
    .get(taskController.getAllTasks)
    .post(
      taskPolicy.submitTaskForm,
      taskController.addNewTask
    )

  router
    .route('/task/:taskId')
    .get(taskController.getTask)
    .post(taskController.markAsCompleted)
    .put(taskPolicy.submitTaskForm, taskController.updateTask)
    .delete(taskController.deleteTask)

  router.post('/update-status', isAuthenticated, taskController.updateTasksStatus)
}