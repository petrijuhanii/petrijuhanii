import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { userLogin } from './reducers/loginReducer'
import userService from './services/user'

const App = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(userLogin(userFromStorage))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  console.log(user)

  return (
    <div className="container">
      {user === null ?
        <LoginForm /> :
        <Menu />
      }
    </div>
  )
}

export default App
