import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store'
import AuthForm from '../AuthForm/AuthForm'
import { addBearerToken } from '../../services/api'
import authenticationService from '../../services/authenticationService'
import taskService from '../../services/taskService'

export default function Login() {
  const [ dispatch, ACTIONS ] = useStore(0)
  const [ feedback, setFeedback ] = useState({
    username: null,
    password: null
  })
  const navigate = useNavigate()

  async function login(user) {
    try {
      const data = (await authenticationService.login(user)).data
      dispatch({ type: ACTIONS.SET_USER, user: data.user })
      dispatch({ type: ACTIONS.SET_TOKEN, token: data.token })
      addBearerToken(data.token)
      await taskService.updateTasksStatus()
      navigate('/all')
    }
    catch(err) {
      if (err.response.status === 403) {
        setFeedback({
          username: err.response.data.error,
          password: err.response.data.error
        })
      }
      else {
        dispatch({ type: ACTIONS.SET_MODAL_MSG, message: err.response.data.error })
      }
    }
  }

  return (
    <AuthForm
      title="Log In"
      handleSubmit={login}
      feedback={feedback}
      setFeedback={setFeedback}
      info="Don't have an account?"
      linkText="Create your account!"
      linkTo="/register"
    />
  )
}