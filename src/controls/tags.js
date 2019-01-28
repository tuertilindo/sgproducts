import React from "react";
import { Tag, AutoComplete, Tooltip, Icon } from "antd";

export default class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags || [],
      inputVisible: false,
      editable: props.editable
    };
    this.dataSource = props.dataSource || [];
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    const { onClose } = this.props;
    if (onClose) onClose(removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true });
  };

  handleInputConfirm = tag => {
    const state = this.state;
    const { onCreate } = this.props;

    let tags = state.tags;
    if (tag && tags.indexOf(tag) === -1) {
      if (onCreate) onCreate(tag);
      tags = [...tags, tag];
    }
    this.setState({
      tags,
      inputVisible: false
    });
  };

  render() {
    const { tags, inputVisible, inputValue, editable } = this.state;
    const dataSource = this.dataSource;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={editable}
              afterClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {editable && inputVisible && (
          <AutoComplete
            type="text"
            size="small"
            style={{ width: 78 }}
            onBlur={this.handleInputConfirm}
            onSelect={this.handleInputConfirm}
            dataSource={dataSource}
            autoFocus
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        )}
        {editable && !inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: "#fff", borderStyle: "dashed" }}
          >
            <Icon type="plus" /> Nuevo tag
          </Tag>
        )}
      </div>
    );
  }
}
