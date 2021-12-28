import express from 'express'
import multer from 'multer'

const multerHandler = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, './images')
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

app.post('/upload', multerHandler.single('avatar'), (req, res) => {
	res.send('OK')
})
