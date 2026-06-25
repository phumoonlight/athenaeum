import { addSearchIndexContent } from "../../../search/client"

type AfterCreateEvent = {
  result: {
    id: number
    documentId: string
    name: string
    email: string
  }
}


export default {
  async afterCreate(event: AfterCreateEvent) {
    await addSearchIndexContent({
      documentType: 'author',
      documentId: event.result.documentId,
      attrs: {
        title: event.result.name,
      }
    })
  },
  async afterUpdate(event: AfterCreateEvent) {
    await addSearchIndexContent({
      documentType: 'author',
      documentId: event.result.documentId,
      attrs: {
        title: event.result.name,
      }
    })
  },
};