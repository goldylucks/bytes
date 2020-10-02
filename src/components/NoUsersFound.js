import React from "react"

function NoUsersFound({ users, query, isFetching, error }) {
  if (users.length || isFetching || error) {
    return null
  }
  return <p>No users found for search query "{query}"</p>
}

export default NoUsersFound
