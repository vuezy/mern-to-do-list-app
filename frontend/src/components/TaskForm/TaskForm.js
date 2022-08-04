import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useStore } from '../../store'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import ContentTitle from '../ContentTitle/ContentTitle'
import { formatDate, getTomorrow, taskNameIsValid, dateIsValid, timeIsValid, infoIsValid } from './utils'
import taskService from '../../services/taskService'
import './TaskForm.css'


export default function TaskForm(props) {
  const [ dispatch, ACTIONS ] = useStore(0)
  const [ charCount, setCharCount ] = useState(0)
  const [ taskData, setTaskData ] = useState({
    name: '',
    priority: '3-Low',
    dueDate: {
      type: 'today',
      date: formatDate(new Date()),
      time: '23:59'
    },
    info: ''
  })
  const [ isInvalid, setIsInvalid ] = useState({
    name: false,
    date: false,
    time: false,
    info: false
  })
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  
  useEffect(() => {
    async function getTask() {
      if (location.pathname.slice(0, 12) === '/update-task') {
        try {
          const { task } = (await taskService.getTask(params.taskId)).data
          const today = formatDate(new Date())
          const tomorrow = getTomorrow()
          let type = 'custom'
          if (task.dueDate.slice(0, 10) === today) {
            type = 'today'
          }
          else if (task.dueDate.slice(0, 10) === tomorrow) {
            type = 'tomorrow'
          }

          setTaskData({
            name: task.name,
            priority: task.priority,
            dueDate: {
              type: type,
              date: task.dueDate.slice(0, 10),
              time: task.dueDate.slice(11)
            },
            info: task.info
          })
          setCharCount(task.info.length)
        }
        catch(err) {
          dispatch({ type: ACTIONS.SET_MODAL_MSG, message: err.response.data.error })
        }
      }
    }
    getTask()
  }, [])

  async function submitTaskForm(event) {
    event.preventDefault()
    if (!isInvalid.name && !isInvalid.date && !isInvalid.time && !isInvalid.info) {
      const task = {
        ...taskData,
        dueDate: `${taskData.dueDate.date} ${taskData.dueDate.time}`
      }
      try {
        if (location.pathname === '/add-task') {
          await taskService.addNewTask(task)
        }
        else if (location.pathname.slice(0, 12) === '/update-task') {
          await taskService.updateTask(params.taskId, task)
        }

        navigate('/all')
      }
      catch(err) {
        const errors = err.response.data.error
        if (errors.constructor === Array) {
          setIsInvalid(prevState => {
            let newState = { ...prevState }
            errors.forEach(error => {
              if (error === 'dueDate') {
                newState = { ...newState, date: true, time: true }
              }
              else {
                newState = { ...newState, [error]: true }
              }
            })
            return newState
          })
        }
        else {
          dispatch({ type: ACTIONS.SET_MODAL_MSG, message: errors })
        }
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    if (name.indexOf('dueDate') === -1) {
      if (name === 'name') {
        setIsInvalid(prevState => ({ ...prevState, name: !taskNameIsValid(value) }))
      }
      else if (name === 'info') {
        if (!infoIsValid(value)) return
        setIsInvalid(prevState => ({ ...prevState, info: false }))
        setCharCount(value.length)
      }
      setTaskData(prevTaskData => ({ ...prevTaskData, [name]: value }))
    }

    else {
      const property = name.slice(8)
      if (property === 'date') {
        setIsInvalid(prevState => ({ ...prevState, date: !dateIsValid(value) }))
      }
      else if (property === 'time') {
        setIsInvalid(prevState => ({ ...prevState, time: !timeIsValid(value) }))
      }

      if (property === 'type' && value !== 'custom') {
        let date
        if (value === 'today') {
          date = formatDate(new Date())
        }
        else if (value === 'tomorrow') {
          date = getTomorrow()
        }
        
        setTaskData(prevTaskData => {
          return {
            ...prevTaskData,
            dueDate: {
              type: value,
              date: date,
              time: '23:59'
            }
          }
        })
        setIsInvalid(prevState => ({ ...prevState, date: false, time: false }))
      }
      else {
        setTaskData(prevTaskData => {
          return {
            ...prevTaskData,
            dueDate: {
              ...prevTaskData.dueDate,
              [property]: value
            }
          }
        })
      }
    }
  }


  return (
    <div>
      <ContentTitle title={location.pathname === '/add-task' ? 'Add New Task' : 'Update Task'} />
      <Form noValidate onSubmit={submitTaskForm} className="add-task">
        <Row className="mb-3">
          <Form.Group as={Col} md="10">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              required
              className={{ 'is-invalid': isInvalid.name }}
              name="name"
              type="text"
              placeholder="Task Name"
              value={taskData.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Task name should contain 3-50 characters!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} md="10">
            <Form.Label>Priority:</Form.Label>
            <select
              name="priority"
              value={taskData.priority}
              className="priority"
              onChange={handleChange}
            >
              <option value="3-Low">Low</option>
              <option value="2-Medium">Medium</option>
              <option value="1-High">High</option>
            </select>
          </Form.Group>
        </Row>

        <Row className="mb-4 align-items-center">
          <Form.Group as={Col} md="2">
            <Form.Label>Due Date</Form.Label>
            <select
              name="dueDate-type"
              className="due-date"
              value={taskData.dueDate.type}
              onChange={handleChange}
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="custom">Custom</option>
            </select>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <FloatingLabel label="Date (yyyy-mm-dd)">
              <Form.Control
                required
                className={{ 'is-invalid': isInvalid.date }}
                name="dueDate-date"
                type="text"
                disabled={taskData.dueDate.type === 'custom' ? false : true}
                value={taskData.dueDate.date}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid date (yyyy-mm-dd)!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <FloatingLabel label="24-Hour Time (00:00)">
              <Form.Control
                required
                className={{ 'is-invalid': isInvalid.time }}
                name="dueDate-time"
                type="text"
                value={taskData.dueDate.time}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid time (00:00)!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Additional Information About The Task</Form.Label>
            <Form.Control
              name="info"
              as="textarea"
              rows={3}
              placeholder="Additional Information..."
              className={['info', { 'is-invalid': isInvalid.info }]}
              value={taskData.info}
              onChange={handleChange}
            />
            <Form.Label className="char-counter">{charCount}/500</Form.Label>
            <Form.Control.Feedback type="invalid">
              The length of additional information that you provided must not exceed 500 characters!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">
          {location.pathname === '/add-task' ? 'Add' : 'Update'}
        </Button>
      </Form>
    </div>
  )
}