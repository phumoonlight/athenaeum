import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
console.log(app)
const handle = app.getRequestHandler()

const serve = async () => {
	try {
		await app.prepare()
		const server = express()
		server.get('/api/wow', (req, res) => res.json({ message: 'Hello World!' }))
		server.get('/', (req, res) => app.render(req, res, '/', {}))
		server.all('*', (req, res) => handle(req, res))
		server.listen(port, () => {
			console.log('[server] ready on port', port)
			console.log('[server] env:', process.env.NODE_ENV)
		})
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

serve()
