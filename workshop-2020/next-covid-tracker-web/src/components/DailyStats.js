import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import css from './DailyStats.module.css'

const mapLabel = (number) => {
  if (number > 0) return `(เพิ่มขึ้น ${number})`
  if (number < 0) return `(ลดลง ${number})`
  return '(คงที่)'
}

const DailyStats = (props) => {
  const {
    confirmed,
    hospitalized,
    recovered,
    deaths,
    newConfirmed,
    newHospitalized,
    newRecovered,
    newDeaths,
  } = props
  const classes = {
    confirmed: `${css.number} ${css.orange}`,
    hospitalized: `${css.number} ${css.blue}`,
    recovered: `${css.number} ${css.green}`,
    deaths: `${css.number} ${css.red}`,
  }
  return (
    <>
      <div className={css.center}>
        <Card className={css.card}>
          <CardHeader title="ผู้ติดเชื้อ" />
          <CardContent className={classes.confirmed}>
            <div>{confirmed}</div>
            <div className={css.diff}>
              {mapLabel(newConfirmed)}
            </div>
          </CardContent>
        </Card>
        <Card className={css.card}>
          <CardHeader title="รักษาอยู่ในโรงพยาบาล" />
          <CardContent className={classes.hospitalized}>
            <div>{hospitalized}</div>
            <div className={css.diff}>
              {mapLabel(newHospitalized)}
            </div>
          </CardContent>
        </Card>
        <Card className={css.card}>
          <CardHeader title="รักษาแล้ว" />
          <CardContent className={classes.recovered}>
            <div>{recovered}</div>
            <div className={css.diff}>
              {mapLabel(newRecovered)}
            </div>
          </CardContent>
        </Card>
        <Card className={css.card}>
          <CardHeader title="เสียชีวิต" />
          <CardContent className={classes.deaths}>
            <div>{deaths}</div>
            <div className={css.diff}>
              {mapLabel(newDeaths)}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

DailyStats.propTypes = {
  confirmed: PropTypes.number.isRequired,
  hospitalized: PropTypes.number.isRequired,
  recovered: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  newConfirmed: PropTypes.number.isRequired,
  newHospitalized: PropTypes.number.isRequired,
  newRecovered: PropTypes.number.isRequired,
  newDeaths: PropTypes.number.isRequired,
}

export default DailyStats
