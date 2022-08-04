import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store'
import AuthForm from '../AuthForm/AuthForm'
import authenticationService from '../../services/authenticationService'

export default function Register() {
  const [ dispatch, ACTIONS ] = useStore(0)
  const [ feedback, setFeedback ] = useState({
    username: null,
    password: null
  })
  const navigate = useNavigate()

  async function register(user) {
    try {
      await authenticationService.register(user)
      navigate('/login')
    }
    catch(err) {
      const error = err.response.data.error
      if (error.constructor === Object) {
        Object.keys(error).forEach(key => {
          setFeedback(prevFeedback => ({ ...prevFeedback, [key]: error[key] }))
        })
      }
      else {
        dispatch({ type: ACTIONS.SET_MODAL_MSG, message: err.response.data.error })
      }
    }
  }

  return (
    <AuthForm
      title="Register"
      handleSubmit={register}
      feedback={feedback}
      setFeedback={setFeedback}
      info="Already have an account?"
      linkText="Try to login!"
      linkTo="/login"
    />
  )
}