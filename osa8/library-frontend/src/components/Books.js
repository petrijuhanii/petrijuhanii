import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Genre = ({ genre }) => {
  if (!genre) {
    return null
  }
  return <div>in genre {genre}</div>
}


const Books = (props) => {
  const [genre, setGenre] = useState('')
  const allBooksResult = useQuery(ALL_BOOKS)
  const { data, loading } = useQuery(ALL_BOOKS, {variables: {genre: genre}},
    {fetchPolicy: "no-cache"})
  
  if ( allBooksResult.loading || loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  
  const books = allBooksResult.data.allBooks
  let genresFromBooks = []
  books.map((book) => {
    return(
      genresFromBooks = genresFromBooks.concat(book.genres)
    )

  })
  const allGenres = [...new Set(genresFromBooks)]

  let genreFilteredBooks = data.allBooks
  if (genre === ''){
    genreFilteredBooks = books
  }

  return (
    <div>
      <h2>books</h2>
      <div><Genre genre={genre}/></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreFilteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((g) => (
        <button key={g} onClick={() => {
          setGenre(g)
        }}>{g}</button>
      ))}
      <button onClick={() => {
        setGenre('')
        }}>all genres</button>
      
    </div>
  )
}

export default Books
