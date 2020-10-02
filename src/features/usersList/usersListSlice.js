import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import camelCaseKeys from "camelcase-keys"

export const fetchUsers = createAsyncThunk(
  "usersList/fetchUsers",
  async query => {
    // query param doesn't do anything, I'm putting it here to show how I'd do it
    // if it was working
    const response = await fetch(`https://reqres.in/api/users?query=${query}`)
    const json = await response.json()
    return camelCaseKeys(json.data)
  }
)

const usersListSlice = createSlice({
  name: "usersList",
  initialState: {
    users: [],
    isFetching: false,
    error: "",
    query: "",
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.query = action.meta.arg
      state.error = ""
      state.isFetching = true
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      state.isFetching = false
    },
    [fetchUsers.rejected]: (state, action) => {
      state.error = action.error.message
      state.isFetching = false
    },
  },
})

export default usersListSlice.reducer
