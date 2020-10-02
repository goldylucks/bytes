import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDebouncedCallback } from "use-debounce"

import styles from "./Grid.module.css"
import Container from "../../components/Container"
import Topbar from "../../components/Topbar/Topbar"
import UserItem from "../../components/UserItem/UserItem"
import {
  fetchUsers,
  selectFilteredUsers,
} from "../../features/usersGrid/usersGridSlice"
import NoUsersFound from "../../components/NoUsersFound"
import ErrorMessage from "../../components/ErrorMessage"

function GridPage() {
  const dispatch = useDispatch()
  const { query, isFetching, error } = useSelector(state => state.usersGrid)
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
        <h1>Grid</h1>
        <div className={styles.grid}>
          {filteredUsers.map(u => (
            <div key={u.id} className={styles.card}>
              <UserItem {...u} isInGrid />
            </div>
          ))}
        </div>
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

export default GridPage
