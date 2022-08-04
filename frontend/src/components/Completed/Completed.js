import TasksContainer from '../TasksContainer/TasksContainer'

export default function Completed(props) {
  return (
    <TasksContainer
      title="Completed Task(s)"
      noTask="You don't have any completed tasks!"
      param="status"
      taskType="Completed"
    />
  )
}