
import RSS from 'rss'

export default {
  async generate(ctx) {
    console.log('Generating RSS feed...');
    const articles = await strapi.entityService.findMany('api::main-menu.main-menu', {})
    const feed = new RSS({
      title: 'wow',
      feed_url: '',
      site_url: '',
    });

    articles.forEach((article) => {
      feed.item({
        title: '',
        description: '',
        url: '',
        date: article.publishedAt,
        guid: article.documentId,
        custom_elements: [
          { titlex: article.title, orderxs: article.order },
          { order: article.order },
        ]
      });
    });
    ctx.set('Content-Type', 'application/rss+xml');
    ctx.body = feed.xml({ indent: true });
  },
}