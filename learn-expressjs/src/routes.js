import express from 'express'

const router = express.Router()

router.get('/', (req, res) => res.send({
  request: {
    query: req.query,
    body: req.body,
    headers: req.headers,
    xhr: req.xhr,
    ip: req.ip,
    protocol: req.protocol,
    cookies: req.cookies,
  },
}))

router.get('/:id', (req, res) => res.send({
  request: {
    query: req.query,
    params: req.params,
  },
}))

router.post('/', (req, res) => res.send({
  request: {
    query: req.query,
    body: req.body,
    headers: req.headers,
    xhr: req.xhr,
    ip: req.ip,
    protocol: req.protocol,
    cookies: req.cookies,
  },
}))

export default router
