import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../../store'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { removeBearerToken } from '../../services/api'
import allNav from './allNav.json'
import './Sidebar.css'


export default function Sidebar() {
  const [ state, dispatch, ACTIONS ] = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  function logout() {
    removeBearerToken()
    dispatch({ type: ACTIONS.SET_USER, user: {} })
    dispatch({ type: ACTIONS.SET_TOKEN, token: null })
    navigate('/login')
  }

  const navElements = allNav.map(nav => {
    return (
      <div key={nav.key}>
        {
          (nav.key === 'all' || nav.key === 'today' || nav.key === 'add-task') && 
          <hr className="separator-line" />
        }
        <Nav.Item className={`nav-${nav.key}`}>
          <Nav.Link
            active={location.pathname === nav.path}
            eventKey={nav.key}
            onClick={() => navigate(nav.path)}
          >
            <i className={`fas fa-${nav.icon}`}></i>{nav.name}
          </Nav.Link>
        </Nav.Item>
      </div>
    )
  })

  return (
    <Col sm={3} className="tabs">
      <Nav variant="pills" className="flex-column">
        <Nav.Item className="username">
          <Nav.Link>
            <i className="fas fa-user"></i>{state.user.username}
            <i className="fas fa-right-from-bracket" title="Log Out" onClick={logout}></i>
          </Nav.Link>
        </Nav.Item>
        {navElements}
      </Nav>
    </Col>
  )
}