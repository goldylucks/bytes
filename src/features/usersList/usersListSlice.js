import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import camelCaseKeys from "camelcase-keys"

export const fetchUsers = createAsyncThunk(
  "usersList/fetchUsers",
  async (query = "") => {
    // simulate error
    if (query === "error") {
      throw new Error("There was an error, please try again")
    }
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
      state.users = []
      state.error = action.error.message
      state.isFetching = false
    },
  },
})

export default usersListSlice.reducer

const selectQuery = state => state.usersList.query
const selectUsers = state => state.usersList.users

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
