import React from "react";
import Tags from "./tags";
import { Input, Col, Row, Badge } from "antd";

const Search = Input.Search;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = props.onSearch ? props.onSearch : () => null;
    this.onFilter = props.onFilter ? props.onFilter : () => null;
    this.filter = {
      tags: [],
      text: props.textToSearch || ""
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.textToSearch !== prevProps.textToSearch) {
      this.onSearch({ ...this.filter, text: this.props.textToSearch });
      if (this.searchRef) {
        this.searchRef.input.state.value = this.props.textToSearch;
      }
    }
  }
  componentDidMount() {
    this.onSearch({ ...this.filter, text: this.props.textToSearch });
  }

  render() {
    const { count, textToSearch } = this.props;
    return (
      <div>
        <Row>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Badge count={count}>
              <Search
                ref={r => (this.searchRef = r)}
                placeholder="buscar por nombre"
                defaultValue={textToSearch}
                onChange={e => {
                  const text = e.target.value;
                  this.filter.text = text;
                  this.onSearch(this.filter);
                }}
                allowClear
              />
            </Badge>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Tags
              editable
              onTagAdded={t => {
                this.filter.tags.push(t);
                this.onSearch(this.filter);
              }}
              onTagRemoved={tag => {
                this.filter.tags = this.filter.tags.filter(t => t !== tag);
                this.onSearch(this.filter);
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
