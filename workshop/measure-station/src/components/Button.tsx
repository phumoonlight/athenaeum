import styled from 'styled-components'
import { Button } from 'antd'

export const GreenButton = styled(Button)`
  border-radius: 4px;
  background-color: #4db3b2;
  padding: 12px 18px 12px 19px;
  width: 140px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.14;
  letter-spacing: 1.25px;
  text-align: center;
  color: #ffffff;
  :hover {
    background-color: #4db3b2;
    color: #ffffff;
  }
  :focus {
    background-color: #4db3b2;
    color: #ffffff;
  }
`