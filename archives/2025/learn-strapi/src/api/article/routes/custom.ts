export default {
  routes: [
    {
      method: 'PATCH',
      path: '/articles/:id/view',
      handler: 'custom.updateViewCount',
      config: {
        auth: false,
      },
    }
  ]
}