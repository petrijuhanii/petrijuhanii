import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/user'
import { setErrorNotification } from './notificationReducer'
import { setSuccesNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    userLogin(state, action) {
      return action.payload
    },
    userLogout(state, action) {
      return action.payload
    }
  },
})

export const { userLogin, userLogout } = loginSlice.actions

export const loginUser = credentials => {
  return async dispatch => {
    try{
      console.log(credentials)
      const user = await loginService.login(credentials)
      dispatch(userLogin(user))
      dispatch(setSuccesNotification(`User ${user.name} logged in`, 5))
      userService.setUser(user)
    }catch(exception){
      dispatch(setErrorNotification('Wrong username or password', 5))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    userService.clearUser()
    dispatch(userLogout(null))
  }
}

export default loginSlice.reducer