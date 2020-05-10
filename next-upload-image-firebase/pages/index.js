import รีแอค from 'react'
import คลัง from '../src/useFirebaseApp'
import สุ่มตัวอักษร from '../src/getRandomString'

const พิ้มพ์ = console.log
const ใช้สถานะ = รีแอค.useState

พิ้มพ์('ทดสอบ')

export default () => {
  const [รูปภาพ, เซดรูปภาพ] = ใช้สถานะ([])
  const [ลากอยู่มั้ย, เซตค่าการลาก] = ใช้สถานะ(false)

  const อัพโหลดรูป = async (ไฟล์) => {
    try {
      const ชื่อใหม่ไฟล์ = `${+new Date()}-${สุ่มตัวอักษร(10)}`
      const เมทาดาต้า = { contentType: ไฟล์.type }
      const ผลลัพธ์ = await คลัง.child(ชื่อใหม่ไฟล์).put(ไฟล์, เมทาดาต้า)
      const fileUrl = await ผลลัพธ์.คลัง.getDownloadURL()
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
      <input
        type="file"
        onChange={จัดการอินพุต}
        style={{ background: ลากอยู่มั้ย ? 'red': '#487EB0' }}
        onDragEnter={() => เซตค่าการลาก(true)}
        onDragLeave={() => เซตค่าการลาก(false)}
        onDragEnd={() => เซตค่าการลาก(false)}
        accept="image/*"
        multiple
      />
      {รูปภาพ.map(image => <img key={image} src={image} width="50%" />)}
    </div>
  )
}