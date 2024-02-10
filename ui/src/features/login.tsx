import { Flex, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import usePinStore from '../stores/pin-store'

const OuterBox = styled.div`
  width: 1600px;
`
const FullWidthFlex = styled(Flex)`
  width: 100%;
`

const FlexBox = styled(Flex)`
  height: 100vh;
`

const PinInput = styled(Input)`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 24px;
`

const Title = styled.p`
  font-size: 48px;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`

const BACKSPACE_KEY = 'Backspace'

type LoginProps = {
  numberOfPins: number
}

const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate()

  const [pins, setPins] = useState(Array(props.numberOfPins).fill(''))
  const inputRefs = useRef<HTMLInputElement[]>([])

  const isLoggedIn = usePinStore((state) => state.isLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
  }, [isLoggedIn])
  const enterPin = usePinStore((state) => state.enterPin)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.length > 1 || !value) {
      return
    }
    const newPin = [...pins]
    newPin[index] = value

    setPins(newPin)
    if (index < inputRefs.current.length - 1) {
      changeFocus(index + 1)
    } else if (index === inputRefs.current.length - 1) {
      const success = enterPin(newPin.join(''))
      if (!success) {
        setPins(Array(props.numberOfPins).fill(''))
        changeFocus(0)
      }
    }
  }

  const changeFocus = (index: number) => {
    const ref = inputRefs.current[index]
    if (ref) {
      ref.focus()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.nativeEvent.code
    if (keyCode !== BACKSPACE_KEY) {
      return
    }

    setPins(Array(props.numberOfPins).fill(''))
    changeFocus(0)
  }

  return (
    <Flex justify="center" align="center">
      <OuterBox>
        <FlexBox justify="center" align={'center'} vertical>
          <Title>PIN</Title>
          <FullWidthFlex justify="space-around" align={'center'}>
            {pins.map((value, index) => (
              <PinInput
                key={index}
                value={value}
                onKeyDown={(e) => onKeyDown(e)}
                ref={(ref: unknown) => {
                  if (ref) {
                    inputRefs.current[index] = ref as HTMLInputElement
                  }
                }}
                onChange={(e) => {
                  onChange(e, index)
                }}
              />
            ))}
          </FullWidthFlex>
        </FlexBox>
      </OuterBox>
    </Flex>
  )
}

export default Login
