import TasksContainer from '../TasksContainer/TasksContainer'

export default function Late(props) {
  return (
    <TasksContainer
      title="Late Task(s)"
      noTask="You don't have any late tasks!"
      param="status"
      taskType="Late"
    />
  )
}