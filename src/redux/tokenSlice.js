import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'token',
  initialState: {
    token: ''
  },
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

export const selectUser = (state) => state.user

export default slice.reducer
