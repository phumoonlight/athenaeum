import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import Title from '../src/components/Title'
import DailyStats from '../src/components/DailyStats'
import GenderStats from '../src/components/GenderStats'
import ProvinceTable from '../src/components/ProvinceTable'
import AppFooter from '../src/components/AppFooter'
import mapProvinceStats from '../src/libs/mapProvinceStats'
import * as config from '../src/config'

const Index = ({ dailyStats, summaryStats }) => (
  <div className="app-root">
    <Container maxWidth="lg">
      <Title />
      <DailyStats
        confirmed={dailyStats.Confirmed}
        newConfirmed={dailyStats.NewConfirmed}
        recovered={dailyStats.Recovered}
        hospitalized={dailyStats.Hospitalized}
        deaths={dailyStats.Deaths}
      />
      <GenderStats
        valueMale={summaryStats.Gender.Male}
        valueFemale={summaryStats.Gender.Female}
      />
      <ProvinceTable dataSet={mapProvinceStats(summaryStats.Province)} />
      <AppFooter updateDate={dailyStats.UpdateDate} />
    </Container>
  </div>
)

export const getServerSideProps = async () => {
  const responseDaily = await axios.get(config.API_TODAY)
  const responseSummary = await axios.get(config.API_CASES_SUMMARY)
  const dailyStats = responseDaily.data
  const summaryStats = responseSummary.data
  const props = { dailyStats, summaryStats }
  return { props }
}

Index.propTypes = {
  dailyStats: PropTypes.oneOfType([PropTypes.object]).isRequired,
  summaryStats: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

export default Index
