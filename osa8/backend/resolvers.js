const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author")
      }
      if(!args.author && args.genre){
        return Book.find({genres: args.genre}).populate("author")
      }
      const author = await Author.findOne({ name: args.author })
      if(!author){
        throw new UserInputError("Author not found", {
          invalidArgs: args,
        })
      }
      if(args.author && !args.genre){
        return Book.find({author: author._id.toString()}).populate("author")
      }
      return Book.find({$and: [{author: author._id.toString()}, {genres: args.genre}]}).populate("author")
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return books.filter(book => book.author._id.toString() === root.id).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new UserInputError("Author not found", {
          invalidArgs: args,
        })
      }

      let author = await Author.findOne({ name: args.author })
  
      if (author) {
        const book = new Book({ ...args })
        book.author = author
        
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }
      author = new Author({ name:args.author })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const book = new Book({ ...args })
      book.author = author
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser)

      if (!currentUser) {
        throw new UserInputError("Author not found", {
          invalidArgs: args,
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born=args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username,
        favouriteGenre: args.favouriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        favouriteGenre: user.favouriteGenre,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}
module.exports = resolvers