import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store'
import taskService from '../../services/taskService'
import './Task.css'

export default function Task(props) {
  const [ dispatch, ACTIONS ] = useStore(0)
  const navigate = useNavigate()

  async function markAsCompleted() {
    try {
      await taskService.markAsCompleted(props._id)
      dispatch({ type: ACTIONS.FORCE_UPDATE })
    }
    catch(err) {
      dispatch({ type: ACTIONS.SET_MODAL_MSG, message: err.response.data.error })
    }
  }

  async function deleteTask() {
    try {
      await taskService.deleteTask(props._id)
      dispatch({ type: ACTIONS.FORCE_UPDATE })
    }
    catch(err) {
      dispatch({ type: ACTIONS.SET_MODAL_MSG, message: err.response.data.error })
    }
  }


  let taskContainerClass = 'priority-low'
  if (props.priority === '1-High') {
    taskContainerClass = 'priority-high'
  }
  else if (props.priority === '2-Medium') {
    taskContainerClass = 'priority-medium'
  }

  const paragraphs = props.info.split(/\r?\n/)
  let notes
  if (paragraphs.length === 1 && paragraphs[0] === '') {
    notes = []
  }
  else {
    let count = 0
    notes = paragraphs.map(paragraph => {
      count++
      return <p key={count} className="mb-1">{paragraph}</p>
    })
  }

  return (
    <div className={`task-container ${taskContainerClass}`}>
      <h3 className="task-name">{props.name}</h3>
      <div className="task-detail d-flex justify-content-between align-items-center">
        <h4 className="task-priority">Priority: <span>{props.priority.slice(2)}</span></h4>
        <h4 className="task-due-date">
          {`${props.dueDate.slice(0, 10)}, ${props.dueDate.slice(11)}`}
        </h4>
      </div>
      <div className="task-notes">
        <h4>Notes: {notes.length === 0 && <span>-</span>}</h4>
        {notes}
      </div>
      <div className="task-actions mt-2">
        {props.status !== 'Completed' && (
          <>
            <span onClick={() => navigate(`/update-task/${props._id}`)}>
              <i className="fas fa-pen"></i> Update
            </span>
            &nbsp;|&nbsp;
            <span onClick={markAsCompleted}>
              <i className="fas fa-check"></i> Mark As Completed
            </span>
            &nbsp;|&nbsp;
          </>
        )}
        <span onClick={deleteTask}>
          <i className="fas fa-trash-can"></i> Delete
        </span>
      </div>
    </div>
  )
}