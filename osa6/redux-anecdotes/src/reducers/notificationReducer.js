import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      createNotification(state, action) {
        const content = action.payload
        return( content)
      },
      resetNotification() {
        return('')
      }
    },
  })
  
  export const {createNotification, resetNotification} = notificationSlice.actions
  
  export const setNotification = (content, time) => {
    return async dispatch => {
      dispatch(createNotification(content))
      setTimeout(() => {
        dispatch(resetNotification())
      }, time * 1000)
    }
  }
  
  export default notificationSlice.reducer