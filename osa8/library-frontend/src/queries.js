import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors { 
      name 
      born
      bookCount 
    }
  }
`
export const ALL_BOOKS = gql`
  query getBooks($genre: String){
    allBooks (genre: $genre){ 
      title 
      author{
        name
      }
      published 
      genres
    }
  }
`

export const NEW_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      id
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
mutation changeAuthorBornYear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
    born
    id
    bookCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title 
      author{
        name
      }
      published 
      genres
    }
  }
`