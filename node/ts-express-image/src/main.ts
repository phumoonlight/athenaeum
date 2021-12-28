import { app } from './app'

const PORT = 4000

app.listen(PORT, () => {
	console.info(`[server] listening at port: ${PORT}`)
})
