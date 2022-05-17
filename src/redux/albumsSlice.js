import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'albums',
  initialState: '',
  reducers: {
    setAlbums(state, { payload }) {
      return { ...state, albums: payload }
    },
    getAlbums(state, { payload }) {
      return { ...state, albums: payload }
    }
  }
})

export const { setAlbums, getAlbums } = slice.actions

export const selectAlbums = (state) => state.albums

export default slice.reducer
