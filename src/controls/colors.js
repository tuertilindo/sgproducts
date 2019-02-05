import React from "react";
import { Button } from "antd";
import { SketchPicker, CirclePicker } from "react-color";
const popover = {
  position: "absolute",
  zIndex: "2"
};
const cover = {
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px"
};
export default class ButtonExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors || [],
      displayColorPicker: false,
      editable: props.editable
    };
    this.dataSource = props.dataSource || [];
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    const { colors } = this.state;
    const { onListChange } = this.props;
    let color = this.nexColor;
    if (color) {
      let ncolors = color ? [...colors, color] : colors;
      if (onListChange) onListChange(ncolors);
      this.nextColor = null;
      this.setState({
        displayColorPicker: false,
        colors: ncolors
      });
    }
  };
  handleDelete = (color, event) => {
    const { onListChange } = this.props;
    const colors = this.state.colors.filter(c => c.toLowerCase() !== color.hex);
    if (onListChange) onListChange(colors);
    this.setState({ colors });
  };

  handleChangeComplete = (color, event) => {
    this.nexColor = color.hex;
  };
  render() {
    const { colors, editable } = this.state;
    const size = editable ? 24 : 12;
    const spacing = editable ? 8 : 4;
    const count = colors.length;
    return (
      <div>
        <CirclePicker
          width={spacing + (size + spacing) * count}
          circleSpacing={spacing}
          circleSize={size}
          colors={colors}
          onChange={editable ? this.handleDelete : null}
        />
        {editable ? (
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            onClick={this.handleClick}
            shape="circle"
            icon="plus"
            size={"small"}
          />
        ) : null}
        {this.state.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose} />
            <SketchPicker
              disableAlpha
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
