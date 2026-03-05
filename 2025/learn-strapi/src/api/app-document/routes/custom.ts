export default {
  routes: [
    {
      method: 'PATCH',
      path: '/app-documents/:id/view',
      handler: 'custom.updateViewCount',
      config: {
        auth: false,
      },
    }
  ]
}