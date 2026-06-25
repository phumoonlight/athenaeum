import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import '../../styles/MovieCard.css'

const style = {
  container: { textAlign: 'center' },
  textHeader: {
    display: 'inline-block',
    fontSize: '2.5rem',
    paddingBottom: '2.5rem',
  },
}

class Menus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'now-showing',
    }
  }

  setSortType = async (e) => {
    const { get } = this.props
    await this.setState({
      type: e.key,
    })
    const { type } = this.state
    get(type)
  }

  render() {
    const { type } = this.state
    return (
      <div style={style.container}>
        <span style={style.textHeader}>Movies</span>
        <Menu
          onClick={this.setSortType}
          selectedKeys={[type]}
          mode="horizontal"
        >
          <Menu.Item key="now-showing">Now Showing</Menu.Item>
          <Menu.Item key="sort-date">Sort-Date</Menu.Item>
          <Menu.Item key="sort-price">Sort-Price</Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Menus

Menus.propTypes = {
  get: PropTypes.func.isRequired,
}
