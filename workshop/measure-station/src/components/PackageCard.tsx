import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

import { Package } from '../constants/data'
import { GreenButton } from './Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 378px;
  height: 560px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 70px;
  padding-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(61, 143, 142, 0.1);
  background-color: #ffffff;
  .description {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    text-align: center;
    font-family: Sarabun-Regular;
  }
  .text-34 {
    font-size: 34px;
  }
`

const Title = styled.div`
  font-family: 'Anuphan-Bold';
  text-align: center;
`

interface Props {
  packageType?: 'small' | 'mini-suite' | 'standard'
  isShowButton?: boolean
}

export const PackageCard: React.FC<Props> = ({
  packageType,
  isShowButton = true,
}) => {
  let iconFileName = ''
  let packageName = ''
  let packageDescription = null
  switch (packageType) {
    case 'small':
      iconFileName = 'icons-colors-ic-lab-1.svg'
      packageName = 'Small'
      packageDescription = (
        <React.Fragment>
          <div className="description">
            แพ็กเกจนี้เหมาะสำหรับติดตามดูแนวโน้มการเปลี่ยนแปลงของปริมาณแก๊สในหม้อแปลงไฟฟ้า
            หลังจากหม้อแปลงไฟฟ้าได้ผ่านการทดสอบด้วยแพ็กเกจ Standard
            เรียบร้อยแล้ว
          </div>
        </React.Fragment>
      )
      break
    case 'mini-suite':
      iconFileName = 'icons-colors-ic-lab-3.svg'
      packageName = 'Mini Suite'
      packageDescription = (
        <React.Fragment>
          <div className="description">
            แพ็กเกจนี้เหมาะสำหรับผู้ที่ต้องการรู้สภาพของหม้อแปลงไฟฟ้าผ่านการทดสอบคุณภาพของน้ำมัน
            (Oil Quality) และติดตามค่าแก๊สหลัก (Key Gas) จากการทดสอบ DGA
          </div>
          <div className="my-3"></div>
          <div className="description">
            แพ็กเกจนี้จะไม่รวม การตรวจหาอายุที่เหลืออยู่ของหม้อแปลงไฟฟ้า
          </div>
        </React.Fragment>
      )
      break
    case 'standard':
      iconFileName = 'icons-colors-ic-lab-2.svg'
      packageName = 'Standard'
      packageDescription = (
        <React.Fragment>
          <div className="description">
            แพ็กเกจที่จะช่วยให้เข้าใจถึงคุณภาพและความผิดปกติที่เกิดขึ้นภายในหม้อแปลงไฟฟ้ารวมไปถึงอายุการใช้งานที่เหลืออยู่ของหม้อแปลงไฟฟ้า
          </div>
          <div className="my-3"></div>
          <div className="description">
            ด้วยข้อมูลที่ได้มาทั้งหมดจากการทดสอบด้วยแพ็กเกจนี้ จะช่วยให้สามารถทำ
            Condition Based Maintenance
            เพื่อให้วางแผนและซ่อมบำรุงรักษาหม้อแปลงไฟฟ้าได้อย่างมีประสิทธิภาพ
          </div>
        </React.Fragment>
      )
      break
    default:
      iconFileName = 'icons-colors-ic-lab-2.svg'
      packageName = '{package}'
      packageDescription = <div className="description">{`{description}`}</div>
  }
  return (
    <Container>
      <div>
        <div className="flex justify-center">
          <Image
            src={`/icons/${iconFileName}`}
            alt="Picture of the author"
            width={92}
            height={92}
          />
        </div>
        <Title className="font-bold my-4 text-34">{packageName}</Title>
        {packageDescription}
        <div className="mb-9"></div>
      </div>
      {isShowButton && (
        <div className="flex justify-center">
          {/* <a href="#package"> */}
          <Link
            href="#package"
            children={<GreenButton>ดูรายละเอียด</GreenButton>}
          />
          {/* </a> */}
        </div>
      )}
    </Container>
  )
}
