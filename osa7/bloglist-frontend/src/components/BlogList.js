import { useDispatch, useSelector } from 'react-redux'
import { updateBlogLikes } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { setSuccesNotification } from '../reducers/notificationReducer'

const Blogs = (user) => {
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

  const dispatch = useDispatch()

  const like = (blog) => {
    console.log('like', blog.id)
    dispatch(updateBlogLikes(blog.id))
    dispatch(setSuccesNotification(`you liked '${blog.title}'`, 5))
  }

  const remove = (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      console.log('delete', blog)
      dispatch(removeBlog(blog))
      dispatch(setSuccesNotification(`Blog ${blog.title} removed `, 5))
    }
  }

  return (
    <div>
      {blogsInOrder.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <div>
            {blog.title}
          </div>
          <div>
            {blog.author}
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
            <button onClick={() => like(blog)} placeholder='likeButton'>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <div>
            {blog.user.username === user.user.username && (
              <button onClick={() => remove(blog)}>remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blogs