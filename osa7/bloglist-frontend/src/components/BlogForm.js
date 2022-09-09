import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setSuccesNotification } from '../reducers/notificationReducer'

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
      <form onSubmit={addBlog}>
        <div>Title: <input name="title"/></div>
        <div>Author: <input name="author"/></div>
        <div>URL: <input name="url"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setSuccesNotification
}

export default connect(null, mapDispatchToProps)(NewBlog)