import { useLocation } from 'react-router-dom'
import './ContentTitle.css'

export default function ContentTitle(props) {
  const location = useLocation()

  function handleChange(event) {
    props.sortBy(event.target.value)
  }

  return (
    <div className="content-title mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>{props.title}</h1>
        {location.pathname !== '/add-task' && location.pathname.slice(0, 12) !== '/update-task' && (
          <div>
            <h3>Sort By: </h3>
            <select className="sort-by" onChange={handleChange} value={props.order}>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        )}
      </div>
      <hr />
    </div>
  )
}