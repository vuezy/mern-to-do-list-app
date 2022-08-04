import api from './api'

export default {
  addNewTask(task) {
    return api().post('/task', task)
  },

  getAllTasks(param=null, taskType=null, order) {
    if (!param || !taskType) {
      return api().get('/task')
    }
    return api().get('/task', {
      params: {
        [param]: taskType
      }
    })
  },

  updateTasksStatus() {
    return api().post('/update-status')
  },

  getTask(taskId) {
    return api().get(`/task/${taskId}`)
  },

  markAsCompleted(taskId) {
    return api().post(`/task/${taskId}`)
  },

  updateTask(taskId, task) {
    return api().put(`/task/${taskId}`, task)
  },

  deleteTask(taskId) {
    return api().delete(`/task/${taskId}`)
  }
}