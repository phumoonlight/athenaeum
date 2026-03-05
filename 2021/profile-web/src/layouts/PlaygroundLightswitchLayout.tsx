import React from 'react'
import styled from 'styled-components'
import PlaygroundHeader from '../components/PlaygroundHeader'
import { PlaygroundNav } from '../components/PlaygroundDemoNav'

const StyledContainer = styled.div`
  text-align: center;
  border: solid #c4cfc9 1px;
  border-radius: 15px;
  padding-top: 200px;
  padding-bottom: 200px;
  margin: 40px;
`

const SwitchSlider = styled.div<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transition: .4s all;
  user-select: none;
  transform: ${(props) => (props.checked && 'translateX(50px)')};
`

const StyledSwitch = styled.div<{ checked: boolean }>`
  cursor: pointer;
  display: flex;
  width: 100px;
  background: ${(props) => (props.checked ? '#27ba6c' : '#7f9489')};
  border-radius: 25px;
  padding: 5px;
  transition: .4s all;
`

const HiddenSwitch = styled.input`
  display: none;
`

interface SwitchProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: boolean) => void
  initialValue?: boolean
}

const Switch: React.FC<SwitchProps> = ({ onChange, initialValue = false }) => {
  const [value, setValue] = React.useState(initialValue)

  const handleChange = () => {
    setValue((prev) => !prev)
    if (onChange) onChange(value)
  }
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label style={{ display: 'inline-block', borderRadius: '25px' }}>
      <StyledSwitch checked={value}>
        <SwitchSlider checked={value}>{value ? 'on' : 'off'}</SwitchSlider>
      </StyledSwitch>
      <HiddenSwitch type="checkbox" onChange={handleChange} />
    </label>
  )
}

const PlaygroundFunctionLightSwitch: React.FC = () => {
  const [islightOn, setIsLightOn] = React.useState(true)
  const toggleLight = () => {
    setIsLightOn((prevState) => !prevState)
  }
  const toggle = {
    background: islightOn ? 'white' : '#333945',
    textColor: islightOn ? 'black' : 'white',
    statusAsText: islightOn ? ' ON' : ' OFF',
  }
  return (
    <div>
      <StyledContainer style={{ background: toggle.background }}>
        <PlaygroundHeader
          title={`LIGHT SWITCH : ${toggle.statusAsText}`}
          color={toggle.textColor}
        />
        <Switch initialValue={islightOn} onChange={toggleLight} />
      </StyledContainer>
      <PlaygroundNav activatedLink="lightswitch" />
    </div>
  )
}

export default PlaygroundFunctionLightSwitch
