import React from "react";

export default class extends React.Component {
  render() {
    const { list } = this.props || [];
    let nlist = Array.isArray(list) ? list : [list];

    return (
      <div>
        {nlist.map((s, i) => (
          <div key={i} style={{ color: "red" }}>
            {s}
          </div>
        ))}
      </div>
    );
  }
}
