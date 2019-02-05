import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import { cardsData, tagsData, colorsData } from "./data/";
import ProdInput from "./inputs/product";
import View from "./views/products";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <View />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
