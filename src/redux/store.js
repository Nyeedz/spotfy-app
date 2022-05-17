import tokenReducer from '@redux/tokenSlice'
import { configureStore } from '@reduxjs/toolkit'

const preloadedState = JSON.parse(localStorage.getItem('reduxState'))

const store = configureStore({
  reducer: {
    token: tokenReducer
  },
  preloadedState
})

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
