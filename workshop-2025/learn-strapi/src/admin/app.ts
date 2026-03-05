import type { StrapiApp } from '@strapi/strapi/admin'

export default {
  config: {
    locales: [
      'th',
      'en',
    ],
    translations: {
      th: {
        "Auth.form.welcome.title": "{Auth.form.welcome.title}",
         "Auth.form.welcome.subtitle": "{Auth.form.welcome.subtitle}",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log('appbootstrap');
  },
};
