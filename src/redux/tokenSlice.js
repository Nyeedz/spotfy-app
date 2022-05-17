import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    setToken(state, { payload }) {
      return { ...state, token: payload }
    },
    getToken(state, { payload }) {
      return { ...state, token: payload }
    }
  }
})

export const { setToken, getToken } = slice.actions

export const selectToken = (state) => state.token

export default slice.reducer
