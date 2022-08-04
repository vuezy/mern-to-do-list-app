import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../store'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from './Modal/Modal'
import Sidebar from './Sidebar/Sidebar'
import Register from './Register/Register'
import Login from './Login/Login'
import All from './All/All'
import Ongoing from './Ongoing/Ongoing'
import Completed from './Completed/Completed'
import Late from './Late/Late'
import Today from './Today/Today'
import Tomorrow from './Tomorrow/Tomorrow'
import Next7Days from './Next7Days/Next7Days'
import TaskForm from './TaskForm/TaskForm'
import taskService from '../services/taskService'
import './App.css'


export default function App() {
  const [ state, dispatch, ACTIONS ] = useStore()
  const [ showModal, setShowModal ] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (state.modalMessage) {
      setShowModal(true)
    }
  }, [state.modalMessage])

  useEffect(() => {
    let timer
    if (state.isLoggedIn) {
      timer = setInterval(async () => {
        try {
          await taskService.updateTasksStatus()
          dispatch({ type: ACTIONS.FORCE_UPDATE })
        }
        catch(err) {
          dispatch({ type: ACTIONS.SET_MODAL_MSG, message: err.response.data.error })
        }
      }, 60000)
    }
    else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [state.isLoggedIn])


  function closeModal() {
    setShowModal(false)
    dispatch({ type: ACTIONS.SET_MODAL_MSG, message: null })
  }

  return (
    <Tab.Container>
      <Row>
        {location.pathname !== '/register' && location.pathname !== '/login' && <Sidebar />}
        <Col className="main">
          <Modal show={showModal} closeModal={closeModal} title="ERROR" text={state.modalMessage} />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/all" element={<All />} />
            <Route path="/ongoing" element={<Ongoing />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/late" element={<Late />} />
            <Route path="/today" element={<Today />} />
            <Route path="/tomorrow" element={<Tomorrow />} />
            <Route path="/next-7-days" element={<Next7Days />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/update-task/:taskId" element={<TaskForm />} />
            <Route path="*" element={<Navigate to='/login' replace />} />
          </Routes>
        </Col>
      </Row>
    </Tab.Container>
  )
}
