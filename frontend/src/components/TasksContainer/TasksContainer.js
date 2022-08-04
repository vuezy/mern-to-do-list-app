import { useState, useEffect } from 'react'
import { useStore } from '../../store'
import ContentTitle from '../ContentTitle/ContentTitle'
import NoTask from '../NoTask/NoTask'
import Task from '../Task/Task'
import { compareDueDate, comparePriority } from './utils'
import taskService from '../../services/taskService'


export default function TasksContainer(props) {
  const [ state, dispatch, ACTIONS ] = useStore()
  const [ allTasks, setAllTasks ] = useState([])
  const [ order, setOrder ] = useState('dueDate')

  useEffect(() => {
    getAllTasks()
  }, [state.renderKey])

  function sortBy(value) {
    setOrder(value)
    setAllTasks(prevAllTasks => {
      if (value === 'dueDate') {
        return [...prevAllTasks].sort(compareDueDate)
      }
      else if (value === 'priority') {
        return [...prevAllTasks].sort(comparePriority)
      }
    })
  }

  async function getAllTasks() {
    try {
      const { tasks } = (await taskService.getAllTasks(props.param, props.taskType)).data
      setAllTasks(tasks)
      sortBy(order)
    }
    catch(err) {
      dispatch({ type: ACTIONS.SET_MODAL_MSG, message: err.response.data.error })
    }
  }

  const tasksElements = allTasks.map(task => {
    return (
      <Task
        key={task._id}
        {...task}
      />
    )
  })

  return (
    <div>
      <ContentTitle title={props.title} sortBy={sortBy} order={order} />
      {allTasks.length === 0 && <NoTask text={props.noTask} />}
      {tasksElements}
    </div>
  )
}