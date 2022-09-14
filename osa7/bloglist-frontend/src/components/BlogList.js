import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'


const Blogs = () => {
  const noteFormRef = useRef()
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogsInOrder = [...blogs]
  blogsInOrder.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <Togglable buttonLabel='new blog' ref={noteFormRef}>
        <BlogForm />
      </Togglable>
      {blogsInOrder.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default Blogs