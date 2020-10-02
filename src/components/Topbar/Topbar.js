import React from "react"
import { Link } from "@reach/router"

import Container from "../Container"
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
          <div>
            <Link to="/" style={{ marginRight: 10 }}>
              List
            </Link>
            <Link to="/grid">Grid</Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Topbar
