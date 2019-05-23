import React from "react"
import {PageHeader, Button, Icon} from "antd"
import {VictoryPie, VictoryLabel} from "victory"

export default class extends React.Component {
  render() {
    const {title, data} = this.props

    return (
      <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          width={400}
          height={400}
          data={data}
          innerRadius={68}
          labelRadius={100}
          style={{labels: {fontSize: 20, fill: "white"}}}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{fontSize: 20}}
          x={200}
          y={200}
          text={title}
        />
      </svg>
    )
  }
}
