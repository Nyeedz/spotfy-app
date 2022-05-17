import albumsReducer from '@redux/albumsSlice'
import tokenReducer from '@redux/tokenSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reduxState = JSON.parse(localStorage.getItem('reduxState'))

const preloadedState = reduxState ? reduxState : ''

const rootReducer = combineReducers({
  token: tokenReducer,
  albums: albumsReducer
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
