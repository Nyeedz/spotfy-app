import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'tracks',
  initialState: [],
  reducers: {
    setTracks(state, { payload }) {
      return { ...state, tracks: payload }
    },
    getTracks(state, { payload }) {
      return { ...state, tracks: payload }
    }
  }
})

export const { setTracks, getTracks } = slice.actions

export const selectTracks = (state) => state.tracks

export default slice.reducer
