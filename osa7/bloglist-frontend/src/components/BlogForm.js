import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setSuccesNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    event.target.title.value = ''
    const author = event.target.author.value
    event.target.author.value = ''
    const url = event.target.url.value
    event.target.url.value = ''
    props.createBlog({ title, author, url })
    props.setSuccesNotification(`you created blog: '${title}'`, 5)
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            name="author"
            type="text"
          />
          <Form.Label>Url:</Form.Label>
          <Form.Control
            name="url"
            type="text"
          />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setSuccesNotification
}

export default connect(null, mapDispatchToProps)(NewBlog)