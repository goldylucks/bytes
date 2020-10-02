import React from "react"
import { useLocation, useNavigate } from "@reach/router"
import ListIcon from "@material-ui/icons/List"
import AppsIcon from "@material-ui/icons/Apps"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"

function ToggleView() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleViewChange = (evt, newView) => {
    navigate(newView)
  }

  return (
    <ToggleButtonGroup
      size="small"
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
  )
}

export default ToggleView
