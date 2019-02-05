import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { Button } from "antd";

export default class extends React.Component {
  render() {
    const { product = {}, onClose } = this.props;
    const {
      id = 0,
      name = "NOMBRE DEL PRODUCTO",
      description = "DESCRIPCION DEL PRODUCTO",
      code = "",
      tags = [],
      images = [],
      colors = []
    } = product;
    return (
      <div>
        <Flippy
          flipOnHover={false} // default false
          flipOnClick={true} // default false
          flipDirection="horizontal" // horizontal or vertical
          ref={r => (this.flippy = r)} // to use toggle method like this.flippy.toggle()
          // if you pass isFlipped prop component will be controlled component.
          // and other props, which will go to div
        >
          <FrontSide
            style={{
              backgroundColor: "#41669d"
            }}
          >
            <div>{name}</div>
            <div>{description}</div>
          </FrontSide>
          <BackSide style={{ backgroundColor: "#175852" }} />
        </Flippy>
        <Button
          icon="close"
          size="small"
          onClick={() => onClose && onClose()}
        />
      </div>
    );
  }
}
