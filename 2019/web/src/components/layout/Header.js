import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import '../../styles/Header.css'

const { Header } = Layout;
const HeaderComponent = (props) => {
  const { children } = props
  return (
    <Header>
      <Link href="/index">
        <a className="header-link">Homepage</a>
      </Link>
      {children}
    </Header>
  )
}

HeaderComponent.propTypes = {
  children: PropTypes.element,
}

HeaderComponent.defaultProps = {
  children: '',
}

export default HeaderComponent;
