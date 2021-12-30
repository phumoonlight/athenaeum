import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import serviceAccount from '../service-account.json'

initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
	storageBucket: 'phumo-athenaeum.appspot.com',
})

export const firebaseStorage = getStorage()

export const firebaseBucket = firebaseStorage.bucket()

export const uploadFileToFirebase = async (fileName: string) => {
	try {
		await firebaseBucket.upload(`./temp/${fileName}`, {
			destination: `express-image/${fileName}`,
		})
		return true
	} catch (error) {
    console.error(error)
		return false
	}
}
