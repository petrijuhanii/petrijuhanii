import {
  useParams
} from 'react-router-dom'

const User = (users) => {
  console.log(users.users)
  const id = useParams().id
  console.log(id)
  const user = users.users.find(n => n.id === id)
  console.log(user)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <div>
        {user.blogs.map(blog => {
          return(
            <li key = {blog.id}>{blog.title}</li>
          )
        })
        }
      </div>

    </div>
  )
}

export default User