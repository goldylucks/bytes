import React from "react"
import cx from "classnames"

import styles from "./UserItem.module.css"

function UserItem({ firstName, lastName, email, avatar, isInGrid }) {
  return (
    <div className={cx(styles.userItem, { [styles.isInGrid]: isInGrid })}>
      <img src={avatar} alt={`${firstName} avatar`} className={styles.avatar} />
      <div className={styles.nameAndEmail}>
        <div className="ellipsis" style={{ fontWeight: "bold" }}>
          {firstName} {lastName}
        </div>
        <div className="ellipsis" style={{ color: "#7b7777" }}>
          {email}
        </div>
      </div>
    </div>
  )
}

export default UserItem
