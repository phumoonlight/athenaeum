export default (plugin) => {
  // const originalBootstrap = plugin.bootstrap
  // console.log({originalBootstrap});
  // plugin.bootstrap = async (app: { strapi: Core.Strapi }) => {
  //   console.log('appbootstrap', app);
  //   await originalBootstrap(app)

  // }
  strapi.server.use(async (ctx, next) => {
    if (ctx.url === '/api/auth/local') {
      console.log('authhhhhhhhhhhh');
    }
    await next()
  })
  return plugin;
};