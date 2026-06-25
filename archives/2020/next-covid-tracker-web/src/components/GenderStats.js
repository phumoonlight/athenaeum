import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import ContentHeader from './ContentHeader'
import css from './GenderStats.module.css'

const GenderStats = (props) => {
  const {
    valueMale,
    valueFemale,
  } = props
  return (
    <div>
      <ContentHeader text="ผู้ติดเชื้อแยกตามเพศ" />
      <div className={css.container}>
        <Card className={css.card}>
          <CardHeader
            className={css.male}
            title="ชาย"
          />
          <CardContent className={css.value}>
            {valueMale}
          </CardContent>
        </Card>
        <Card className={css.card}>
          <CardHeader
            className={css.female}
            title="หญิง"
          />
          <CardContent className={css.value}>
            {valueFemale}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

GenderStats.propTypes = {
  valueMale: PropTypes.number.isRequired,
  valueFemale: PropTypes.number.isRequired,
}

export default GenderStats
