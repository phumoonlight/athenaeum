/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import ReactDom from 'react-dom'

interface Options {
  rootClassName?: string
  containerClassName?: string
  maskClassName?: string
  closableMask?: boolean
}

interface ModalFC extends React.FC {
  toggle: () => void
}

type UseModalHook = (options?: Options) => ModalFC

export const useModal: UseModalHook = (options = {}) => {
  const {
    rootClassName = 'xc-modal',
    maskClassName = 'xc-modal-mask',
    containerClassName = 'xc-modal-container',
    closableMask = true,
  } = options
  const [display, setDisplay] = React.useState(false)
  const [root, setRoot] = React.useState<HTMLDivElement | null>(null)

  const toggleModalDisplay = () => {
    setDisplay((prev) => !prev)
  }

  React.useEffect(() => {
    const newRoot = document.createElement('div')
    newRoot.className = rootClassName
    document.body.appendChild(newRoot)
    setRoot(newRoot)
    return () => {
      document.body.removeChild(newRoot)
    }
  }, [])

  const ModalComponent: ModalFC = ({ children }) => {
    const onClickModalMask = () => {
      if (closableMask) {
        toggleModalDisplay()
      }
    }
    const render = display && (
      <>
        <div className={maskClassName} onClick={onClickModalMask} />
        <div className={containerClassName}>{children}</div>
      </>
    )
    return root && ReactDom.createPortal(render, root)
  }

  ModalComponent.toggle = toggleModalDisplay

  return ModalComponent
}

export default {}
