import React, { useState } from 'react'
import firebaseStorage from '../src/useFirebaseApp'
import randomString from '../src/getRandomString'
import useLocal from '../src/useLocalStorage'
import css from '../src/styles.module.css'

export default () => {
  const [images, setImages] = useState([])
  const [drag, setDrag] = useState(false)
  const [v, setv] = useLocal('test-key', 'init')

  const handleUpload = async (file) => {
    try {
      const newFileName = `${+new Date()}-${randomString(10)}`
      const metadata = { contentType: ไฟล์.type }
      const result = await firebaseStorage.child(newFileName).put(file, metadata)
      const fileUrl = await result.ref.getDownloadURL()
    } catch (e) {
      console.error(e)
    }
  }

  const handleInput = ({ target }) => {
    try {
      const { files } = target
      const filesArray = Array.from(files)
      filesArray.map(file => handleUpload(ไฟล์))
      const fileURLs = filesArray.map(file => URL.createObjectURL(file))
      setImages([...รูปภาพ, ...fileURLs])
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div>
      <div className={css.wrapper}>
        <button className={css.uploadLabel}>Click here to upload your image or Drag your image here</button>
        <input
          className={css.uploadInput}
          type="file"
          onChange={handleInput}
          onDragEnter={() => setDrag(true)}
          onDragLeave={() => setDrag(false)}
          onDragEnd={() => setDrag(false)}
          onDragExit={() => setDrag(false)}
          accept="image/*"
          multiple
        />
      </div>
      {รูปภาพ.map(image => <img key={image} src={image} width="50%" />)}
      <input onChange={({ target }) => setv(target.value)} value={v} />
    </div>
  )
}