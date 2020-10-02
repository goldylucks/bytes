import React from "react"
import { useLocation, useNavigate } from "@reach/router"
import ListIcon from "@material-ui/icons/List"
import AppsIcon from "@material-ui/icons/Apps"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"

import Container from "../Container"
import styles from "./Topbar.module.css"

function Topbar({ query, onChange }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleViewChange = (evt, newView) => {
    navigate(newView)
  }

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
          <ToggleButtonGroup
            value={location.pathname}
            exclusive
            onChange={handleViewChange}
            aria-label="Toggle View"
          >
            <ToggleButton value="/" aria-label="List view">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="/grid" aria-label="Grid view">
              <AppsIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Container>
    </div>
  )
}

export default Topbar
