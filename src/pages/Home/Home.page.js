import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDebouncedCallback } from "use-debounce"

import Container from "../../components/Container"
import ErrorMessage from "../../components/ErrorMessage"
import NoUsersFound from "../../components/NoUsersFound"
import Topbar from "../../components/Topbar/Topbar"
import UserItem from "../../components/UserItem/UserItem"
import Users from "../../components/Users"
import {
  fetchUsers,
  selectFilteredUsers,
} from "../../features/usersList/usersListSlice"

function HomePage() {
  const dispatch = useDispatch()
  const { query, isFetching, error } = useSelector(state => state.usersList)
  const filteredUsers = useSelector(selectFilteredUsers)
  const [_query, _setQuery] = useState(query)
  const debouncedFetchUsers = useDebouncedCallback(value => {
    dispatch(fetchUsers(value))
  }, 50)

  useEffect(() => {
    // if there's a query or users it means we are coming here from another page
    // so we already fetched the users for this query, no need to refetch
    if (query || filteredUsers.length) {
      return
    }
    dispatch(fetchUsers(""))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleQueryChange = evt => {
    debouncedFetchUsers.callback(evt.target.value)
    _setQuery(evt.target.value)
  }

  return (
    <div>
      <Topbar query={_query} onChange={handleQueryChange} />
      <Container>
        <h1>List</h1>
        <Users users={filteredUsers} cardStyle={{ marginBottom: 20 }} />
        <NoUsersFound
          error={error}
          users={filteredUsers}
          query={query}
          isFetching={isFetching}
        />
        <ErrorMessage error={error} />
      </Container>
    </div>
  )
}

export default HomePage
