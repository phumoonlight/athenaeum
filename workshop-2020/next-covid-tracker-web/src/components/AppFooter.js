import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'
import CodeIcon from '@material-ui/icons/Code'
import InfoIcon from '@material-ui/icons/Info'
import { API_HOME, GITHUB_URL } from '../config'
import css from './AppFooter.module.css'

const AppFooter = ({ updateDate }) => {
  const updateLatest = `ข้อมูล ณ วันที่ ${updateDate}`
  return (
    <div className={css.root}>
      <Card>
        <CardHeader title={updateLatest} />
        <CardContent>
          <Button
            variant="contained"
            size="large"
            target="_blank"
            color="secondary"
            href={API_HOME}
            className={css.button}
          >
            <InfoIcon className={css.icon} />
            API Source
          </Button>
          <Button
            variant="contained"
            size="large"
            target="_blank"
            href={GITHUB_URL}
            className={css.button}
          >
            <GitHubIcon className={css.icon} />
            GitHub
          </Button>
          <div className={css.credit}>
            <CodeIcon />
            <span>By @phumoonlight</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

AppFooter.propTypes = {
  updateDate: PropTypes.string.isRequired,
}

export default AppFooter
