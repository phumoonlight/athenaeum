
import { MeiliSearch } from 'meilisearch'

export const searchClient = new MeiliSearch({
  host: "https://ms-662365ab8755-24058.sgp.meilisearch.io",
  apiKey: "",
})

export const addSearchIndexContent = async (args: {
  documentType: string
  documentId: string
  attrs: Record<string, any>
}) => {
  return await searchClient.index('app-contents').addDocuments(
    [
      {
        _meilisearch_id: `${args.documentType}-${args.documentId}`,
        documentType: args.documentType,
        documentId: args.documentId,
        ...args.attrs
      }
    ],
    {
      primaryKey: '_meilisearch_id'
    }
  )
}