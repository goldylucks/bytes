import React from "react"

function Container({ children }) {
  return (
    <div
      style={{
        maxWidth: "100%",
        width: 600,
        margin: "0 auto",
        padding: "0 10px",
      }}
    >
      {children}
    </div>
  )
}

export default Container
