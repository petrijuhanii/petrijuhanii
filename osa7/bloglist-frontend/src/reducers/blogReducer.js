import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setErrorNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    likeBlogs(state, action){
      const id = action.payload
      const blogToChange = state.find(blog => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    },
    updateBlog(state, action) {
      console.log(action.payload)
      const updatedBlog = action.payload
      const { id } = updatedBlog
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
  },
})

export const { appendBlog, setBlogs, deleteBlog, likeBlogs, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    try{
      console.log(content)
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
    }catch(exception){
      dispatch(setErrorNotification('wrong credentials', 5))
    }
  }
}

export const removeBlog = content => {
  return async dispatch => {
    try{
      await blogService.remove(content.id)
      dispatch(deleteBlog(content.id))
    }catch(exception){
      dispatch(setErrorNotification('Error! Blog not removed', 5))
    }
  }

}

export const updateBlogLikes = id => {
  return async dispatch => {
    await blogService.update(id)
    dispatch(likeBlogs(id))
  }
}

export const createComment = (id, comment) => {
  console.log(id)
  return async (dispatch) => {
    const commentedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(commentedBlog))
  }
}

export default blogSlice.reducer