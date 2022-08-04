const { Task } = require('../models')
const { getFormattedDate } = require('../utils') 

module.exports = {
  async addNewTask(req, res) {
    try {
      const userId = req.user._id
      const task = await Task.create({
        ...req.body,
        userId: userId,
        status: 'Ongoing'
      })

      res.status(200).json({
        success: true,
        task: task
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },

  async getAllTasks(req, res) {
    try {
      const userId = req.user._id
      let tasks = []
      
      if (req.query.status) {
        const status = req.query.status
        tasks = await Task.find({
          userId: userId,
          status: status
        }, {
          name: 1,
          priority: 1,
          dueDate: 1,
          status: 1,
          info: 1
        }).lean()
      }

      else if (req.query.date) {
        const currentDate = new Date()
        if (req.query.date === 'today') {
          const today = getFormattedDate(currentDate)
          tasks = await Task.find({
            userId: userId,
            dueDate: { $regex: today + '.*' },
            status: 'Ongoing'
          }, {
            name: 1,
            priority: 1,
            dueDate: 1,
            status: 1,
            info: 1
          }).lean()
        }

        else if (req.query.date === 'tomorrow') {
          let tomorrow = new Date()
          tomorrow.setDate(currentDate.getDate() + 1)
          tomorrow = getFormattedDate(tomorrow)

          tasks = await Task.find({
            userId: userId,
            dueDate: { $regex: tomorrow + '.*' },
            status: 'Ongoing'
          }, {
            name: 1,
            priority: 1,
            dueDate: 1,
            status: 1,
            info: 1
          }).lean()
        }

        else if (req.query.date === 'next7days') {
          const today = getFormattedDate(currentDate) + ' 00:00'
          let next7Days = new Date()
          next7Days.setDate(currentDate.getDate() + 7)
          next7Days = getFormattedDate(next7Days) + ' 00:00'

          tasks = await Task.find({
            userId: userId,
            dueDate: { $gte: today, $lt: next7Days },
            status: 'Ongoing'
          }, {
            name: 1,
            priority: 1,
            dueDate: 1,
            status: 1,
            info: 1
          }).lean()
        }
        
        else {
          tasks = []
        }
      }

      else {
        tasks = []
      }

      res.status(200).json({
        success: true,
        tasks: tasks
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },

  async getTask(req, res) {
    try {
      const userId = req.user._id
      const task = await Task.findOne({
        userId: userId,
        _id: req.params.taskId
      }, {
        name: 1,
        priority: 1,
        dueDate: 1,
        info: 1
      }).lean()

      res.status(200).json({
        success: true,
        task: task
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },

  async markAsCompleted(req, res) {
    try {
      const userId = req.user._id
      await Task.updateOne({
        userId: userId,
        _id: req.params.taskId
      }, {
        $set: { status: 'Completed' }
      }).lean()

      res.status(200).json({
        success: true
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },

  async updateTask(req, res) {
    try {
      const userId = req.user._id
      await Task.updateOne({
        userId: userId,
        _id: req.params.taskId
      }, {
        $set: {
          ...req.body,
          status: 'Ongoing'
        }
      }).lean()

      res.status(200).json({
        success: true
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },

  async deleteTask(req, res) {
    try {
      const userId = req.user._id
      await Task.deleteOne({
        userId: userId,
        _id: req.params.taskId
      }).lean()

      res.status(200).json({
        success: true
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },

  async updateTasksStatus(req, res) {
    try {
      const userId = req.user._id
      const currentDateTime = getFormattedDate(new Date(), includeTime=true)
      await Task.updateMany({
        userId: userId,
        dueDate: { $lt: currentDateTime }
      }, {
        $set: { status: 'Late' }
      }).lean()

      res.status(200).json({
        success: true
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  }
}