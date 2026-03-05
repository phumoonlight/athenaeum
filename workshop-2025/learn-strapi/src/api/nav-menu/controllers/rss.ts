
import RSS from 'rss'

export default {
  async generate(ctx) {
    console.log(JSON.stringify(ctx.query, null, 2));
    console.log('Generating RSS feed...');
    const articles = await strapi.entityService.findMany('api::nav-menu.nav-menu', {})
    const feed = new RSS({
      title: 'wow',
      feed_url: '',
      site_url: '',
    });

    feed.item({
      title: '',
      description: '',
      url: '',
      date: articles.publishedAt,
      guid: articles.documentId,
      custom_elements: [
        { titlex: articles.bgColor },
        { order: articles.bgColor },
      ]
    });

    ctx.set('Content-Type', 'application/rss+xml');
    ctx.body = feed.xml({ indent: true });
  },
}