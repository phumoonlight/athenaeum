import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ContentHeader from './ContentHeader'

import css from './ProvinceTable.module.css'

const ProvinceTable = ({ dataSet }) => (
  <div className={css.root}>
    <ContentHeader text="ผู้ติดเชื้อในแต่ละจังหวัด" />
    <TableContainer component={Paper} className={css.scrollable}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell className={css.bold}>
              จังหวัด
            </TableCell>
            <TableCell align="right" className={css.bold}>
              จำนวนผู้ติดเชื้อ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSet.map((eachCase) => (
            <TableRow key={eachCase.province}>
              <TableCell align="left">
                {eachCase.province}
              </TableCell>
              <TableCell align="right">
                {eachCase.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

ProvinceTable.propTypes = {
  dataSet: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

export default ProvinceTable
