import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlogLikes } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { createComment } from '../reducers/blogReducer'
import { setSuccesNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const Blog = (user) => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(n => n.id === id)

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

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(createComment( id, comment ))
    dispatch(setSuccesNotification(`you created comment: '${comment}'`, 5))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <Notification />
      <h2>{blog.title} {blog.author}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <div>
            likes {blog.likes}
        <Button onClick={() => like(blog)} placeholder='likeButton'>
            like
        </Button>
      </div>
      <div>
        added by {blog.user.name} {blog.user.username === user.user.username && (
          <Button onClick={() => remove(blog)}>
            remove
          </Button>
        )}
      </div>
      <div>
        <h2>Create new</h2>
        <h3>Comments: </h3>
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              name="comment"
            />
            <Button variant="primary" type="submit">
              add comment
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div>
        {blog.comments.map((comment, index) => {
          return(
            <li key = {index}>{comment.comment}</li>
          )
        })
        }
      </div>
    </div>
  )
}

export default Blog