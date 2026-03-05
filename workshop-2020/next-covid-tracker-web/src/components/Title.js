import React from 'react'
import Typography from '@material-ui/core/Typography'
import css from './Title.module.css'

const Title = () => (
  <div>
    <Typography
      align="center"
      variant="h2"
      className={css.root}
    >
      <span className={css.highlight}>
        {'COVID19 '}
      </span>
      Tracker Thailand
    </Typography>
    <div className={css.bar} />
  </div>
)

export default Title
