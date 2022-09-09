import { useState, useEffect, useRef } from 'react'
//import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setErrorNotification } from './reducers/notificationReducer'
//import { setSuccesNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //blogService.getAll().then(blogs =>setBlogs( blogs )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorNotification('wrong username or password', 5))
    }
  }

  /*const addBlog = (blogObject) => {
    const title = blogObject.title
    const author = blogObject.author
    const url = blogObject.url

    noteFormRef.current.toggleVisibility()
    try{
      blogService.create({ title, author, url })
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
      dispatch(setSuccesNotification(`a new blog ${title} by ${author} added`, 5))
    } catch (exception) {
      dispatch(setErrorNotification('wrong credentials', 5))
    }
  }*/

  function logOut () {
    console.log(window.localStorage.removeItem('loggedBlogappUser'))
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification />
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{user.name} logged in
          <button onClick={logOut}>logout</button></p>

        <Togglable buttonLabel='new blog' ref={noteFormRef}>
          <BlogForm />
        </Togglable>

        <BlogList user={user}/>
      </div>
    )}

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App
