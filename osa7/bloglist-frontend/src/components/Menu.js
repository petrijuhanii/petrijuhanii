import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import BlogList from './BlogList'
import UserList from './UserList'
import User from './User'
import Blog from './Blog'
import {
  Routes, Route, Link,
} from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <>{user.name} logged in
          <Button onClick={() => dispatch(logoutUser())}>
            logout
          </Button></>
      </div>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User users={users}/>} />
        <Route path="/blogs/:id" element={<Blog user={user}/>} />
      </Routes>
    </div>
  )
}

export default Menu