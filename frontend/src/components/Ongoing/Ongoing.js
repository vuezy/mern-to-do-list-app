import TasksContainer from '../TasksContainer/TasksContainer'

export default function Ongoing(props) {
  return (
    <TasksContainer
      title="Ongoing Task(s)"
      noTask="You don't have any ongoing tasks!"
      param="status"
      taskType="Ongoing"
    />
  )
}