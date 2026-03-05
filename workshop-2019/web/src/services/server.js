const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.get('/redux', (req, res) => app.render(req, res, '/redux'))
  server.get('/index', (req, res) => app.render(req, res, '/index'))
  server.get('/detail/:id', (req, res) => app.render(req, res, '/detail', { id: req.params.id }))
  server.get('/ticket/:id', (req, res) => app.render(req, res, '/ticket', { id: req.params.id }))
  server.get('/recipe/:id', (req, res) => app.render(req, res, '/recipe', { id: req.params.id, total: req.query.total, sum: req.query.sum }))
  server.get('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
