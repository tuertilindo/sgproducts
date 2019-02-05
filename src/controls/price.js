import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { final = 0, cost = 0, dolar = 0, gain = 100, iva = 21 } = props;
    this.state = {
      final,
      cost,
      dolar,
      gain,
      iva
    };
  }

  render() {
    return <div />;
  }
}
