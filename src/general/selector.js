import React from "react"
import {List as Lista, compareFilter, showError} from "../general"
import SidePanel from "./sidepanel"
import Filter from "./filter"
import {isEmptyFilter} from "./util"
import {Button, Avatar, Icon, List} from "antd"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.targetList = props.target
    this.state = {
      filter: props.filter || {},
      showSide: false
    }
  }

  componentDidMount() {
    window.sgapi
      .getEntities(this.targetList)
      .then(l => this.setState({data: l}))
      .catch(showError)
  }
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (!prevState.showSide && this.state.showSide) {
      window.sgapi
        .getEntities(this.targetList)
        .then(l => this.setState({data: l}))
        .catch(showError)
    }
    if (!compareFilter(prevProps.filter, this.props.filter)) {
      this.setState({filter: this.props.filter})
    }
  }
  select(p) {
    const {onSelect} = this.props
    onSelect(p)
    this.setState({showSide: false, selected: p})
  }

  render() {
    const {
      children,
      icon,
      title,
      placeholder,
      types,
      emptyText,
      emptyIcon,
      typeStyler,
      search,
      placement,
      hideType,
      extraList,
      avatar
    } = this.props

    const {filter, showAll, data = [], showSide} = this.state
    const searched = isEmptyFilter(filter) ? data : search(data, filter)

    return (
      <div>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            showSide: (v, f) => {
              this.setState({showSide: v, filter: f || filter})
            },
            data,
            filter
          })
        )}
        <SidePanel
          placement={placement}
          title={
            <List.Item.Meta
              avatar={
                <Avatar>
                  <Icon type={icon || "search"} />
                </Avatar>
              }
              title={title || "buscar"}
              description={
                <Filter
                  filter={filter}
                  hideType={hideType}
                  placeholder={placeholder || "texto a buscar"}
                  types={types}
                  onSearch={filter => this.setState({filter, showAll: false})}
                />
              }
            />
          }
          onSelect={i => this.select(i)}
          onClose={() => this.setState({showSide: false})}
          visible={showSide}
        >
          <Lista
            emptyText={emptyText || "No se encontro nada"}
            emptyIcon={emptyIcon || "frown"}
            typeStyler={typeStyler}
            items={showAll ? searched : searched.slice(0, 10)}
            extraList={extraList}
            avatar={avatar}
          />
          {searched.length > 10 && !showAll ? (
            <div
              style={{
                width: "20%",
                margin: "0 auto"
              }}
            >
              <Button
                icon="bars"
                style={{marginLeft: "auto"}}
                onClick={() => this.setState({showAll: true})}
              >
                Ver todo
              </Button>
            </div>
          ) : (
            <div />
          )}
        </SidePanel>
      </div>
    )
  }
}
