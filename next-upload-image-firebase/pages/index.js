import React from 'react'
import useContent from '../src/useContent'
import ref from '../src/useFirebaseApp'
import getRandomString from '../src/getRandomString'

const mapObject = (obj) => {
  const keys = Object.keys(obj)
  return keys.map((key) => obj[key])
}

export default () => {
  const [imgs, setImg] = React.useState([])
  const [d, setd] = React.useState(false)
  const content = useContent();

  const handleUpload = async (file) => {
    try {
      console.info(file)
      const formattedFileName = `${+new Date()}-${getRandomString(10)}`
      const metadata = { contentType: file.type }
      const uploadResult = await ref.child(formattedFileName).put(file, metadata)
      console.log(uploadResult)
      const fileUrl = await uploadResult.ref.getDownloadURL()
      console.log(fileUrl)
    } catch (error) {
      console.error('error', error)
    }
  }

  const handleInput = ({ target }) => {
    const { files } = target
    try {
      console.log(files)
      const re = mapObject(files)
      console.log(re)
      console.log(Array.from(files))
      re.map(eachFile => handleUpload(eachFile))
      const reurl = re.map(eachFile => URL.createObjectURL(eachFile))
      setImg([...imgs, ...reurl])
    } catch (e) {
      console.error(e)
    }
  }
  console.log(imgs)
  return (
    <div>
      <input
        type="file"
        onChange={handleInput}
        style={{ background: d ? 'red': '#487EB0' }}
        onDragEnter={() => setd(true)}
        onDragLeave={() => setd(false)}
        onDragEnd={() => ''}
        accept="image/*"
        multiple
      />
      {imgs.map(image => <img key={image} src={image} width="50%" />)}
    </div>
  )
}