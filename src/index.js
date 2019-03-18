import React from "react"
import ReactDOM from "react-dom"
import "antd/dist/antd.css"
import "./index.css"
import "./jsonrpcbridge"
import Container from "./container"
const moment = require("moment")
moment.locale("es")

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById("root"))
