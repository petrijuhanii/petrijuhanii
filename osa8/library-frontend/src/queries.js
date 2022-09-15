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
  query {
    allBooks { 
      title 
      author
      published 
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
      author
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