const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "How to Java",
        author: "Petti",
        url: "www.jeejjee.xyz",
        likes: 5
    },
    {
        title: "How to Python",
        author: "Jetijetson",
        url: "www.xd.xyz",
        likes: 666
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "How to C#",
                          author: "Jugi",
                          url: "www.favebook.com",
                          likes: 0 })
  await blog.save()
  await blog.remove()  
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb, 
  usersInDb, 
}