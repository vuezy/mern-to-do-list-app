import { useState } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import './AuthForm.css'

export default function AuthForm(props) {
  const [ userData, setUserData ] = useState({
    username: '',
    password: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    if (props.setFeedback) {
      props.setFeedback(prevFeedback => ({ ...prevFeedback, [name]: null }))
    }
    setUserData(prevUserData => ({ ...prevUserData, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    props.handleSubmit(userData)
  }

  return (
    <div className="auth-form">
      <h1 className="mb-3">{props.title}</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <FloatingLabel label="Username">
              <Form.Control
                required
                className={{ 'is-invalid': props.feedback.username !== null }}
                name="username"
                type="text"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {props.feedback.username}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <FloatingLabel label="Password">
              <Form.Control
                required
                className={{ 'is-invalid': props.feedback.password !== null }}
                name="password"
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {props.feedback.password}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        
        <p className="mb-3">
          {props.info} <Link to={props.linkTo}>{props.linkText}</Link>
        </p>
        <Button type="submit" variant="success">
          {props.title}
        </Button>
      </Form>
    </div>
  )
}