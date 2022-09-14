import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const users = useSelector(state => state.user)

  console.log(users)

  const usersInOrder = [...users]
  usersInOrder.sort((a, b) => b.username > a.username)

  console.log(usersInOrder)
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>

          {usersInOrder.map(user => {
            return(
              <tr key = {user.id} >
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users