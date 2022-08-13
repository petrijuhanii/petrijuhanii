import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const addLike = async () => {
    console.log(blog.user.id)
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await blogService.update(blog.id, updatedBlog)
  }

  const remove = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(!blogVisible){
    return (
      <div>
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>show</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {blog.user.username === username && (
            <button onClick={remove}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog