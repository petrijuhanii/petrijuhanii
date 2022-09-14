import { connect } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import Notification from '../components/Notification'
import { Form, Button } from 'react-bootstrap'

const Login = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    event.target.username.value = ''
    console.log(username)
    const password = event.target.password.value
    event.target.password.value = ''
    console.log(password)
    props.loginUser({ username, password })
  }

  return(
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            name="password"
            type="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(Login)