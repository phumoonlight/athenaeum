import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.set('json spaces', 2)
app.use('/favicon.ico', (request, response) => response.sendStatus(204))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
  response.status(200).send('Athenaeum EXPRESS')
})

app.listen(3000, () => {
  console.info('ready on port 3000')
})
