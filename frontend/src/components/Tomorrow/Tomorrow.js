import TasksContainer from '../TasksContainer/TasksContainer'

export default function Tomorrow(props) {
  return (
    <TasksContainer
      title="Task(s) for Tomorrow"
      noTask="You don't have any tasks for tomorrow!"
      param="date"
      taskType="tomorrow"
    />
  )
}