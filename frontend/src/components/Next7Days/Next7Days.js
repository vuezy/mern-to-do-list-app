import TasksContainer from '../TasksContainer/TasksContainer'

export default function Next7Days(props) {
  return (
    <TasksContainer
      title="Task(s) for Next 7 Days"
      noTask="You don't have any tasks for next 7 days!"
      param="date"
      taskType="next7days"
    />
  )
}