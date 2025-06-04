import { searchClient } from "../../../search/client"

type AfterCreateEvent = {
  action: 'afterCreate'
  model: {
    uid: string
    singularName: string
    tableName: string
    attributes: Record<string, any>;
    indexes: any[]
    foreignKeys: any[]
    lifecycles: {
      afterCreate: Function
      afterUpdate: Function
    }
    columnToAttribute: Record<string, string>
  }
  state: Record<string, unknown>
  params: {
    filters: Function;
    populate: {
      cover: Record<string, any>
      author: Record<string, any>
      category: Record<string, any>
      blocks: Record<string, any>
      createdBy: boolean
      updatedBy: boolean
      localizations: Record<string, unknown>
    };
    where: Record<string, unknown>
    data: {
      blocks: any[];
      documentId: string;
      title: string;
      description: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
      cover: Record<string, any>;
      author: Record<string, any>;
      category: Record<string, any>;
      createdBy: any;
      updatedBy: Record<string, any>;
    };
  };
  result: {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    cover: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: Record<string, any>;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      folderPath: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
      folder: any;
    };
    author: {
      count: number;
    };
    category: {
      count: number;
    };
    blocks: any[];
    createdBy: any;
    updatedBy: {
      id: number;
      documentId: string;
      firstname: string;
      lastname: string;
      username: string | null;
      email: string;
      password: string;
      resetPasswordToken: string | null;
      registrationToken: string | null;
      isActive: boolean;
      blocked: boolean;
      preferedLanguage: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
    };
    localizations: any[];
  };
};


export default {
  async afterCreate(event: AfterCreateEvent) {
    if (event?.result?.publishedAt) {
      console.log(event.result)
      const x = await searchClient.index('app-contents').addDocuments([
        {
          _meilisearch_id: `article-${event.result.documentId}`,
          documentType: 'article',
          documentId: event.result.documentId,
          title: event.result.title,
          desc: event.result.description,
          slug: event.result.slug,
          blocks: event.result.blocks,
        }
      ], {
        primaryKey: '_meilisearch_id'
      })
      console.log('Search index updated:', x)
    }
  },
  afterUpdate(event) {
  },
};