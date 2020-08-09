import express from 'express'
import bodyParser from 'body-parser'
import config from './config'
import router from './routes'

const app = express()

app.set('json spaces', 2)
app.use('/favicon.ico', (req, res) => res.sendStatus(204))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(config.PORT, () => {
  console.info(`ready on port ${config.PORT}`)
})
