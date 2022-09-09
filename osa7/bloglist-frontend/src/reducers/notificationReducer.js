import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    errorNotification(state, action) {
      const content = [action.payload, false]
      return( content )
    },
    succesNotification(state, action) {
      const content = [action.payload, true]
      return( content)
    },
    resetNotification() {
      return('')
    }
  },
})

export const { errorNotification, succesNotification, resetNotification } = notificationSlice.actions

let timeoutID

export const setSuccesNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(succesNotification(content))
    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export const setErrorNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(errorNotification(content))
    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer