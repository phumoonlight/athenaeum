import React from 'react'
import styled from 'styled-components'
import { Table } from 'antd'

import { dataSource, Package } from '../constants/data'
import { GreenButton } from '../components/Button'

const Container = styled.div`
  border-radius: 8px;
  border: solid 1px rgba(61, 143, 142, 0.2);
  box-shadow: 0 4px 8px 0 rgba(61, 143, 142, 0.1);
  overflow: hidden;
  margin: 10px;
`

const CustomTable = styled(Table)`
  width: 1235px;
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
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: none;
  }
  .ant-table-tbody tr:nth-child(odd) {
    background-color: #f8fbfa;
  }
`

const IconChecked: React.FC = () => {
  return (
    <div className="flex justify-center">
      <img src="/icons/icons-black-ic-task-done.svg" />
    </div>
  )
}

export const PackageTable: React.FC = () => {
  return (
    <Container id="package">
      <CustomTable
        className="font-anuphan"
        dataSource={dataSource}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={0}>
              <GreenButton className="mx-7 my-4">เลือกแพ็กเกจนี้</GreenButton>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={0}>
              <GreenButton className="mx-7 my-4">เลือกแพ็กเกจนี้</GreenButton>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={0}>
              <GreenButton className="mx-7 my-4">เลือกแพ็กเกจนี้</GreenButton>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={0}>
              <GreenButton className="mx-7 my-4">เลือกแพ็กเกจนี้</GreenButton>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      >
        <Table.Column
          className="col-feature"
          title=""
          dataIndex="featureName"
          key="key"
        />
        <Table.Column
          className="col-package-standard"
          width="192px"
          title="Standard"
          dataIndex="packages"
          key="key"
          render={(value: Package[]) => {
            return value.includes(Package.Standard) && <IconChecked />
          }}
        />
        <Table.Column
          className="col-package-standard-oltc"
          width="192px"
          title={
            <div>
              <div>Standard</div>
              <div>(สำหรับ OLTC)</div>
            </div>
          }
          dataIndex="packages"
          key="key"
          render={(value: Package[]) => {
            return value.includes(Package.StandardOltc) && <IconChecked />
          }}
        />
        <Table.Column
          className="col-package-mini-suite"
          width="192px"
          title="Mini Suite"
          dataIndex="packages"
          key="key"
          render={(value: Package[]) => {
            return value.includes(Package.MiniSuite) && <IconChecked />
          }}
        />
        <Table.Column
          className="col-package-small"
          width="192px"
          title="Small"
          dataIndex="packages"
          key="key"
          render={(value: Package[]) => {
            return value.includes(Package.Small) && <IconChecked />
          }}
        />
      </CustomTable>
    </Container>
  )
}
