import type { Schema, Struct } from '@strapi/strapi';

export interface NavmenuLevel1 extends Struct.ComponentSchema {
  collectionName: 'components_navmenu_level_1s';
  info: {
    description: '';
    displayName: 'level 1';
    icon: 'apps';
  };
  attributes: {
    children: Schema.Attribute.Component<'navmenu.level-2', true>;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavmenuLevel2 extends Struct.ComponentSchema {
  collectionName: 'components_navmenu_level_2s';
  info: {
    description: '';
    displayName: 'level 2';
    icon: 'apps';
  };
  attributes: {
    children: Schema.Attribute.Component<'navmenu.level-3', true>;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavmenuLevel3 extends Struct.ComponentSchema {
  collectionName: 'components_navmenu_level_3s';
  info: {
    description: '';
    displayName: 'level 3';
    icon: 'apps';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    wat: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'navmenu.level-1': NavmenuLevel1;
      'navmenu.level-2': NavmenuLevel2;
      'navmenu.level-3': NavmenuLevel3;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
