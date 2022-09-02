import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      createNotification(state, action) {
        const content = action.payload
        return("you created anecdote: '"+ content +"'")
      },
      voteNotification(state, action) {
        const content = action.payload
        return("you voted '"+ content +"'")   
      },
      resetNotification(state, action) {
        return('')
      }
    },
  })
  
  export const {createNotification, voteNotification, resetNotification} = notificationSlice.actions
  export default notificationSlice.reducer