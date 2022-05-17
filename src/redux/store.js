import albumsReducer from '@redux/albumsSlice'
import tokenReducer from '@redux/tokenSlice'
import tracksReducer from '@redux/tracksSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const preloadedState = JSON.parse(localStorage.getItem('reduxState'))
  ? JSON.parse(localStorage.getItem('reduxState'))
  : ''

const rootReducer = combineReducers({
  token: tokenReducer,
  albums: albumsReducer,
  tracks: tracksReducer
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
