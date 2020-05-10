import รีแอค from 'react'
import คลัง from '../src/useFirebaseApp'
import สุ่มตัวอักษร from '../src/getRandomString'
import useLocal from '../src/useLocalStorage'
import css from '../src/styles.module.css'

const พิ้มพ์ = console.log
const ใช้สถานะ = รีแอค.useState

พิ้มพ์('ทดสอบ')

export default () => {
  const [รูปภาพ, เซดรูปภาพ] = ใช้สถานะ([])
  const [ลากอยู่มั้ย, เซตค่าการลาก] = ใช้สถานะ(false)
  const [v, setv] = useLocal('test-key', 'init')

  const อัพโหลดรูป = async (ไฟล์) => {
    try {
      const ชื่อใหม่ไฟล์ = `${+new Date()}-${สุ่มตัวอักษร(10)}`
      const เมทาดาต้า = { contentType: ไฟล์.type }
      const ผลลัพธ์ = await คลัง.child(ชื่อใหม่ไฟล์).put(ไฟล์, เมทาดาต้า)
      const fileUrl = await ผลลัพธ์.ref.getDownloadURL()
    } catch (e) {
      console.error(e)
    }
  }

  const จัดการอินพุต = ({ target }) => {
    try {
      const { files } = target
      const ไฟล์รูปแบบอาเรย์ = Array.from(files)
      ไฟล์รูปแบบอาเรย์.map(ไฟล์ => อัพโหลดรูป(ไฟล์))
      const urlของไฟล์ = ไฟล์รูปแบบอาเรย์.map(ไฟล์ => URL.createObjectURL(ไฟล์))
      เซดรูปภาพ([...รูปภาพ, ...urlของไฟล์])
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
          onChange={จัดการอินพุต}
          onDragEnter={() => เซตค่าการลาก(true)}
          onDragLeave={() => เซตค่าการลาก(false)}
          onDragEnd={() => เซตค่าการลาก(false)}
          onDragExit={() => เซตค่าการลาก(false)}
          accept="image/*"
          multiple
        />
      </div>


      {รูปภาพ.map(image => <img key={image} src={image} width="50%" />)}
      <input onChange={({ target }) => setv(target.value)} value={v} />
    </div>
  )
}