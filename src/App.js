import React from "react"
import { Router } from "@reach/router"

import HomePage from "./pages/Home/Home.page"
import GridPage from "./pages/Grid/Grid.page"

import "./App.css"

function App() {
  return (
    <div className="app-container">
      <Router>
        <HomePage path="/" />
        <GridPage path="/grid" />
      </Router>
    </div>
  )
}

export default App
