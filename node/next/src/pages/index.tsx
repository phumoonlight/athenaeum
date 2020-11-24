import React from 'react'
import 'tailwindcss/tailwind.css'

import { Title } from '../components/title'
import { RepoLink } from '../components/link'

const PageIndex: React.FC = () => {
  const [bb, setbb] = React.useState('')

  React.useEffect(() => {
    const buffer = new ArrayBuffer(8)
    const view = new Int32Array(buffer)
    let byteArray = new Uint8Array(buffer);
    console.log(view)
    // const b = new Blob([byteArray.buffer], { type: 'application/pdf' })
    const b = new Blob([byteArray.buffer])
    const aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // an array consisting of a single DOMString
    const oMyBlob = new Blob(aFileParts, {type : 'application/pdf'})
    const durl = URL.createObjectURL(oMyBlob)
    setbb(durl)
  }, [])
  
  return (
    <div>
      <Title />
      <a href={bb} download="wow.txt">{bb}</a>
      <div className="flex justify-center">
        <button
          className="bg-black text-white"
          onClick={() => {
            window.print()
          }}
          children="print"
        />
      </div>
    </div>
  )
}

export default PageIndex
