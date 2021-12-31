import fs from 'fs'
import express from 'express'
import multer from 'multer'
import { uploadFileToFirebase } from './firebase'

const multerHandler = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, './temp')
		},
		filename(req, file, callback) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
			const [, fileExtension] = file.mimetype.split('/')
			callback(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`)
		},
	}),
})

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('images'))

app.get('/favicon.ico', (req, res) => {
	res.status(204)
	res.end()
})

app.get('/', (req, res) => {
	res.send('OK')
})

app.post('/upload', multerHandler.single('avatar'), async (req, res) => {
	const responseData = {
		code: 1,
		message: 'uploaded',
		uploadedUrl: '',
	}
	const uploadedUrl = await uploadFileToFirebase(req.file?.filename || '')
	if (!uploadedUrl) {
		res.status(500)
		responseData.code = 0
		responseData.message = 'failed to upload'
		res.json(responseData)
		return
	}
	responseData.uploadedUrl = uploadedUrl
	// remove temp file after delay
	setTimeout(() => fs.unlinkSync(req.file?.path || ''), 5000)
	res.status(201)
	res.json(responseData)
})
