import { initializeApp, cert, ServiceAccount,  } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import serviceAccount from '../service-account.json'

const BUCKET = 'phumo-athenaeum.appspot.com'
const FOLDER = 'express-image'

initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
	storageBucket: BUCKET,
})

const getUploadedUrl = (fileName: string) => {
	return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${FOLDER}%2F${fileName}?alt=media`
}

export const firebaseStorage = getStorage()

export const firebaseBucket = firebaseStorage.bucket()

export const uploadFileToFirebase = async (fileName: string): Promise<string> => {
	try {
		if (!fileName) throw new Error('local file name cannot be empty')
		await firebaseBucket.upload(`./temp/${fileName}`, {
			destination: `express-image/${fileName}`,
		})
		return getUploadedUrl(fileName)
	} catch (error) {
    console.error(error)
		return ''
	}
}
