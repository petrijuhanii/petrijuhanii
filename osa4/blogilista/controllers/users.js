const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const usernameRequired = username  === '' ? false : true;
  if(!usernameRequired){
    return response.status(400).json({
        error: 'username must exist'
      })
  }
  const shortUsername = username.length  < 3 ? false : true;
  if(!shortUsername){
    return response.status(400).json({
        error: 'username length must contain at least 3 character'
      })
  }

  const passwordRequired = password  === '' ? false : true;
  if(!passwordRequired){
    return response.status(400).json({
        error: 'password must exist'
      })
  }
  const shortPassword = password.length  < 3 ? false : true;
  if(!shortPassword){
    return response.status(400).json({
        error: 'password length must contain at least 3 character'
      })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{title:1,author:1,url:1})
    response.json(users)
  })
  
module.exports = usersRouter