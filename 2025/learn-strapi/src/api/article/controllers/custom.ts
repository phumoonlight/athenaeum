

export default {
  async updateViewCount(ctx) {
    console.log(ctx);
    const { id } = ctx.params;
    console.log(`Updating view count for article with ID: ${id}`);
    if (!id) {
      return ctx.badRequest('Article ID is required');
    }
    const article = await strapi.documents('api::article.article').findOne({ documentId: id, populate: ['stat'] });
    if (!article || !article.stat) {
      return ctx.notFound('Article not found');
    }
    // Increment the view count
    await strapi.documents('api::article-stat.article-stat').update({
      documentId: article.stat.documentId,
      data: {
        view: article.stat.view + 1,
      }
    })
    // await strapi.documents('api::article.article').publish({ documentId: id, fields: ["viewCount"], })
    // Return the updated article
    return ctx.send({ message: 'View count updated successfully' });
  },
}