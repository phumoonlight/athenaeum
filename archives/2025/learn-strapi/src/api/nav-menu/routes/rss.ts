export default {
  routes: [
    {
      method: 'GET',
      path: '/rssx',
      handler: 'rss.generate',
      config: {
        auth: false,
      },
    }
  ]
}