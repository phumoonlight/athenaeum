import React from 'react'

import { PackageTable } from '../components/PackageTable'
import { PackageCard } from '../components/PackageCard'
import { CertifyCard } from '../components/CertifyCard'
import { Package } from '../constants/data'

const Index: React.FC = () => {
  return (
    <div className="pb-4">
      <div className="flex flex-wrap justify-center">
        <CertifyCard
          title="ISO 45001:2018"
          description="มาตรฐานระบบการจัดการอาชีวอนามัยและความปลอดภัย"
        />
        <CertifyCard
          title="ISO 14001:2015"
          description="มาตรฐานระบบการจัดการสิ่งแวดล้อม"
        />
        <CertifyCard
          title="ISO 9001:2015"
          description="มาตรฐานระบบบริหารงานคุณภาพ"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        <PackageCard />
        <PackageCard packageType='standard' />
        <PackageCard packageType='mini-suite' />
        <PackageCard packageType='small' />
      </div>
      <PackageTable />
    </div>
  )
}

export default Index
