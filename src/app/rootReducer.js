import { combineReducers } from "@reduxjs/toolkit"

import usersListReducer from "../features/usersList/usersListSlice"
import usersGridReducer from "../features/usersGrid/usersGridSlice"

export default combineReducers({
  usersList: usersListReducer,
  usersGrid: usersGridReducer,
})
