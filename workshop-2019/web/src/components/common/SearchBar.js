import React from 'react'
import Router from 'next/router'
import { Input } from 'antd'
import '../../styles/SearchBar.css'

const styles = { width: '20rem' }
const { Search } = Input

const search = (searchKey) => {
  Router.push(`/?searchkey=${searchKey}`)
}

const SearchBar = () => (
  <div className="search-bar">
    <Search
      size="small"
      placeholder="Search..."
      onSearch={search}
      style={styles}
    />
  </div>
)

export default SearchBar
