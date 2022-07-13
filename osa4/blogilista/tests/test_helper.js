const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,  
}