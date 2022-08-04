import TasksContainer from '../TasksContainer/TasksContainer'

export default function Today(props) {
  return (
    <TasksContainer
      title="Task(s) for Today"
      noTask="You don't have any tasks for today!"
      param="date"
      taskType="today"
    />
  )
}