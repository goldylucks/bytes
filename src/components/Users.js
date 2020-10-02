import React from "react"
import UserItem from "./UserItem/UserItem"

function Users({ users, cardStyle, cardClassName, isInGrid = false }) {
  return users.map(u => (
    <div key={u.id} className={cardClassName} style={cardStyle}>
      <UserItem {...u} isInGrid={isInGrid} />
    </div>
  ))
}

export default Users
