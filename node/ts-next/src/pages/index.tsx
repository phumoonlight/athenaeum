import { FC } from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  border-radius: 10px;
  .icon {
    width: 48px;
    height: 48px;
    background-color: #daeeff;
    margin: auto;
    margin-bottom: 20px;
  }
  .arrow {
    visibility: hidden;
  }
  /* > div {
    width: 70px;
    border-bottom: solid 2px rgba(0, 0, 0, 0.12);
    margin: auto;
    display: none;
  } */
  a {
    color: #0059a3;
    padding: 10px 50px;
    text-align: center;
    position: relative;
      min-height: 230px;
    :hover {
      color: white;
      border-radius: 8px;
      background-image: linear-gradient(135deg, #0f7edc 2%, #00437a 102%);
      ::after {
        display: none;
      }
      .arrow {
        visibility: visible;
      }
    }
    .border-wrapper {
      position:absolute;
      height:33%;
      width:33%;
      &.top {
      top:0;
      left: 50%;
      transform: translateX(-50%);
      /* background-color:red; */
      border-top: solid 2px rgba(0, 0, 0, 0.12);
    }
    &.left {
      border-left: solid 2px rgba(0, 0, 0, 0.12);
      transform: translateY(77px);
  top: 0;
  left: 0;
      /* background-color:green; */
    }
    &.right {
      border-right: solid 2px rgba(0, 0, 0, 0.12);
      transform: translateY(77px);
  top: 0;
  right: 0;
      /* background-color:blue; */
    }
    &.bottom {
      border-bottom: solid 2px rgba(0, 0, 0, 0.12);
      left: 50%;
      transform: translateX(-50%);
      bottom:0;
      /* background-color:yellow; */
    }
  }
  :first-child {
    .border-wrapper {
      &.top {
        display:none;
      }
      &.left {
        display: none;
      }
    }
  }
}
  /* @media ${({ theme }) => theme.screens.sm} {
    width: 250px;
    a {
      padding-top: 20px;
      padding-left: 50px;
      padding-right: 50px;
      min-height: 230px;
    }
    a::after {
      content: '';
      position: absolute;
      border-bottom: solid 2px rgba(0, 0, 0, 0.12);
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
    }
  }
  @media ${({ theme }) => theme.screens.md} {
    width: 680px;
    > div {
      display: block;
    }
    a::after {
      content: '';
      position: absolute;
      border-left: solid 2px rgba(0, 0, 0, 0.12);
      border-bottom: none;
      bottom: unset;
      left: unset;
      transform: unset;
      right: 0;
      top: 25%;
      width: unset;
      height: 70px;
    }
    a:nth-child(3n+0):after {
      display: none;
    }
  } */
`

const Playground = styled.div`
  border: solid black 2px;
  padding: 25px;
`

const Index: FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <header className="py-10 pl-10 bg-black text-white">
          <div className="uppercase font-bold">header</div>
        </header>
        <main className="p-10">
          <div className="font-bold text-5xl">Athenaeum NEXT</div>
          <Playground>
            <Grid className="grid md:grid-cols-3 lg:grid-cols-5 shadow-md">
              <a href="#">
                <div className="border-wrapper top"></div>
                <div className="border-wrapper left"></div>
                <div className="border-wrapper right"></div>
                <div className="border-wrapper bottom"></div>
                <div className="icon"></div>
                <div>ตรวจสอบ ความผิดปกติของ On-Load Tap Changer</div>
                <div className="arrow">{`>`}</div>
              </a>
              <a href="#">
              <div className="border-wrapper top"></div>
                <div className="border-wrapper left"></div>
                <div className="border-wrapper right"></div>
                <div className="border-wrapper bottom"></div>
                <div className="icon"></div>
                <div>ตรวจสอบ ความผิดปกติของ On-Load Tap Changer</div>
                <div className="arrow">{`>`}</div>
              </a>
              <a href="#">
              <div className="border-wrapper top"></div>
                <div className="border-wrapper left"></div>
                <div className="border-wrapper right"></div>
                <div className="border-wrapper bottom"></div>
                <div className="icon"></div>
                <div>ตรวจสอบ ความผิดปกติของ On-Load Tap Changer</div>
                <div className="arrow">{`>`}</div>
              </a>
              <a href="#">
              <div className="border-wrapper top"></div>
                <div className="border-wrapper left"></div>
                <div className="border-wrapper right"></div>
                <div className="border-wrapper bottom"></div>
                <div className="icon"></div>
                <div>ตรวจสอบ ความผิดปกติของ On-Load Tap Changer</div>
                <div className="arrow">{`>`}</div>
              </a>
              <a href="#">
              <div className="border-wrapper top"></div>
                <div className="border-wrapper left"></div>
                <div className="border-wrapper right"></div>
                <div className="border-wrapper bottom"></div>
                <div className="icon"></div>
                <div>ตรวจสอบ ความผิดปกติของ On-Load Tap Changer</div>
                <div className="arrow">{`>`}</div>
              </a>
            </Grid>
          </Playground>
        </main>
      </div>
      <footer className="p-10 bg-black text-white">
        <div className="uppercase font-bold">footer</div>
      </footer>
    </div>
  )
}

export default Index
