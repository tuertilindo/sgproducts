import React from "react"
import Tags from "./tags"
import {Input, Col, Row, Select} from "antd"
const Search = Input.Search

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.onSearch = props.onSearch ? props.onSearch : () => null
    this.filter = props.filter || {}
  }
  componentDidUpdate(prevProps) {
    const {text, type} = this.props.filter || {}
    if (text !== prevProps.filter.text || type !== prevProps.filter.type) {
      this.filter = this.props.filter || {}
      this.onSearch(this.filter)
      if (this.searchRef) {
        this.searchRef.input.state.value = this.props.filter.text
      }
    }
  }
  componentDidMount() {
    this.onSearch(this.props.filter)
  }

  render() {
    const {placeholder = "buscar", showTags, types, hideType} = this.props
    const {text, type} = this.filter
    return (
      <div>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Search
              ref={r => (this.searchRef = r)}
              placeholder={placeholder}
              defaultValue={text}
              onChange={e => {
                const text = e.target.value
                console.log(this.filter)
                this.filter.text = text
                this.onSearch(this.filter)
              }}
              allowClear
            />
          </Col>
          {showTags ? (
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Tags
                editable
                onTagAdded={t => {
                  this.filter.tags.push(t)
                  this.onSearch(this.filter)
                }}
                onTagRemoved={tag => {
                  this.filter.tags = this.filter.tags.filter(t => t !== tag)
                  this.onSearch(this.filter)
                }}
              />
            </Col>
          ) : null}
          {types && !hideType ? (
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Select
                value={type || "all"}
                style={{width: 150}}
                onChange={i => {
                  this.filter.type = i
                  this.onSearch(this.filter)
                }}
              >
                {Object.keys(types).map((key, index) => (
                  <Select.Option key={key} value={key}>
                    {types[key]}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          ) : null}
        </Row>
      </div>
    )
  }
}
