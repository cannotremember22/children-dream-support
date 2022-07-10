import React from 'react'
import App from './App'
import ReactDOM from "react-dom";
import { initContract } from './utils'

const rootElement = document.getElementById("root");

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <App />,
      rootElement
    )
  })
  .catch(console.error)
