import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDebouncedCallback } from "use-debounce"

import Container from "../../components/Container"
import Topbar from "../../components/Topbar/Topbar"
import UserItem from "../../components/UserItem/UserItem"
import { fetchUsers } from "../../features/usersList/usersListSlice"

function HomePage() {
  const dispatch = useDispatch()
  const { query, users } = useSelector(state => state.usersList)
  const [_query, _setQuery] = useState(query)
  const debouncedFetchUsers = useDebouncedCallback(value => {
    dispatch(fetchUsers(value))
  }, 50)

  useEffect(() => {
    dispatch(fetchUsers(query))
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
        {users.map(u => (
          <div key={u.id} style={{ marginBottom: 20 }}>
            <UserItem {...u} />
          </div>
        ))}
      </Container>
    </div>
  )
}

export default HomePage
