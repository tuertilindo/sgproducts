import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import Container from "./views/container";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
