

export default {
  async updateViewCount(ctx) {
    const { id } = ctx.params;
    const article = await strapi.documents('api::app-document.app-document').findOne({ documentId: id });
    if (!article) {
      return ctx.notFound('document not found');
    }
    console.log({ id, article, x: article.view ? article.view + 1 : 1 });
    await strapi.documents('api::app-document.app-document').update({
      documentId: id,
      data: {
        view: article.view ? article.view + 1 : 1,
      }
    })
    return ctx.send({ message: ' documentView count updated successfully' });
  },
}