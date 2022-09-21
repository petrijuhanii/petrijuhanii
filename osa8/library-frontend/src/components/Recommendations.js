import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { USER } from '../queries'

const Genre = ({ genre }) => {
  if (!genre) {
    return null
  }
  return <div>books in your favourite genre {genre}</div>
}


const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const user = useQuery(USER)

  if ( result.loading || user.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  
  const books = result.data.allBooks
  const userGenre = user.data.me.favouriteGenre[0]
  console.log(userGenre)
  let booksGenreFilter = books.filter(book => book.genres.includes(userGenre))
  
  return (
    <div>
      <h2>recommendations</h2>
      <div><Genre genre={userGenre}/></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksGenreFilter.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
