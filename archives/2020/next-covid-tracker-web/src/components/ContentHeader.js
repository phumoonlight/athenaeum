import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import css from './ContentHeader.module.css'

const contentHeader = ({ text }) => (
  <Typography
    align="center"
    variant="h4"
    className={css.text}
  >
    {text}
  </Typography>
)

contentHeader.propTypes = {
  text: PropTypes.string.isRequired,
}

export default contentHeader
