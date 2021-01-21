import React from 'react'
import styled from 'styled-components'

import { Package } from '../constants/data'

const Container = styled.div`
  width: 378px;
  height: 483px;
  padding: 72px 24px 50px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(61, 143, 142, 0.1);
  background-color: #ffffff;
`

const Icon: React.FC = () => {
  return (
    <div className="flex justify-center">
      <img src="/icons/icons-black-ic-task-done.svg" />
    </div>
  )
}

interface Props {
  packageType?: Package
}

export const PackageCard: React.FC<Props> = ({
  packageType = Package.Standard
}) => {
  let iconFileName = ''
  let packageName = ''
  switch (packageType) {
    case Package.Small:
      break
    case Package.MiniSuite:
      break
    case Package.Standard:
    case Package.StandardOltc:
    default:
      iconFileName = 'icons-colors-ic-lab-2.svg'
      packageName = 'Standard'
  }
  return (
    <Container>
      <div className="flex justify-center">
      <img src={`/icons/${iconFileName}`} />
      </div>
      <div className="text-xl font-bold">{packageName}</div>
    </Container>
  )
}