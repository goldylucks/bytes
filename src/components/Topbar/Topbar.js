import React from "react"

import Container from "../Container"
import ToggleView from "./ToggleView"
import styles from "./Topbar.module.css"

function Topbar({ query, onChange }) {
  return (
    <div className={styles.topbar}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            value={query}
            onChange={onChange}
            placeholder="Search users"
            className={styles.input}
          />
          <ToggleView />
        </div>
      </Container>
    </div>
  )
}

export default Topbar
