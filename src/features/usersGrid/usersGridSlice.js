import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import camelCaseKeys from "camelcase-keys"

export const fetchUsers = createAsyncThunk(
  "usersGrid/fetchUsers",
  async (query = "") => {
    // query param doesn't do anything, I'm putting it here to show how I'd do it
    // if it was working
    const response = await fetch(`https://reqres.in/api/users?query=${query}`)
    const json = await response.json()
    return camelCaseKeys(json.data)
  }
)

const usersGridSlice = createSlice({
  name: "usersGrid",
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

export default usersGridSlice.reducer

const selectQuery = state => state.usersGrid.query
const selectUsers = state => state.usersGrid.users

export const selectFilteredUsers = createSelector(
  [selectQuery, selectUsers],
  (query, users) =>
    users.filter(
      user =>
        user.firstName.includes(query) ||
        user.lastName.includes(query) ||
        user.email.includes(query)
    )
)
