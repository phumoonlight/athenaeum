import React from 'react'
import styled from 'styled-components'
import { Table } from 'antd'

import { PackageTable } from '../components/PackageTable'
import { PackageCard } from '../components/PackageCard'

const Red = styled.div`
  color: red;
`

const Green = styled.div`
  color: green;
`

const Blue = styled.div`
  color: blue;
`

const CustomCorrectIcon: React.FC = () => {
  return (
    <div className="flex justify-center">
      <img src="/icons/icons-black-ic-task-done.svg" />
    </div>
  )
}

const CustomButton = styled.button`
  border-radius: 4px;
  background-color: #4db3b2;
  padding: 12px 18px 12px 19px;
  width: 140px;
  height: 40px;
  font-family: Anuphan;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 1.25px;
  text-align: center;
  color: #ffffff;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 32px;
  margin-bottom: 32px;
`

const PackageContainer = styled.div`
  border: solid 1px rgba(61, 143, 142, 0.2);
  box-shadow: 0 4px 8px 0 rgba(61, 143, 142, 0.1);
`

const CustomTable = styled(Table)`
  width: 1235px;
  
  overflow: hidden;
  border-radius: 8px;
  .col-feature {
    font-weight: 500;
    font-size: 16px;
  }
  th.col-package-standard {
    background-color: rgba(255, 208, 128, 0.3);
  }
  th.col-package-standard-oltc {
    background-color: rgba(255, 208, 128, 0.5);
  }
  th.col-package-mini-suite {
    background-color: rgba(255, 208, 128, 0.7);
  }
  th.col-package-small {
    background-color: rgba(255, 208, 128, 0.9);
  }
  .ant-table-thead > tr > th {
    text-align: center;
    vertical-align: baseline;
    font-weight: bold;
    border-bottom: none;
    font-size: 20px;
  }
  .ant-table-tbody > tr > td {
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: none;
  }
  tr:nth-child(odd) {
    background-color: #f8fbfa;
  }
`

const Index: React.FC = () => {
  return (
    <div className="pb-4">
      {/* <Red>Custom</Red>
      <Green>G</Green>
      <Blue className="">B</Blue>
      <div className="text-5xl">TWST</div> */}
      {/* <span className="custom-me font-anuphan">ได้รับการยอมรับ</span> */}
      <PackageTable />
      <PackageCard />
    </div>
  )
}

export default Index
