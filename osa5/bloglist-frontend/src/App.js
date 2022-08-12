import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

const SuccesNotification = ({ succesMessage }) => {
  if (succesMessage === null) {
    return null
  }

  return (
    <div className="succes">
      {succesMessage}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newNote, setNewNote] = useState('')
  //const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title, author, url
      })
      setSuccesMessage(`a new blog ${title} by ${author} added`)
      
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setSuccesMessage(null)
      }, 5000)
      setCreateBlogVisible(false)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  function logOut () {
    console.log(window.localStorage.removeItem('loggedBlogappUser'))
    setUser(null);
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <ErrorNotification errorMessage={errorMessage}/>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogList = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    return (
    <div>
      <h2>Blogs</h2>
      <SuccesNotification succesMessage={succesMessage}/>
      <p>{user.name} logged in 
      <button onClick={logOut}>logout</button></p>

      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={handleAddBlog}
          />
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )}
  

  /*const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )*/

  //<Notification message={errorMessage} />
//{user !== null && blogForm()}
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
