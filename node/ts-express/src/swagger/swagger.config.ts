import { SwaggerMainConfig } from './swagger.type'

import { userSwagger } from '../core/user/user.swagger'

export const swaggerConfig: SwaggerMainConfig = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'TS-Express API',
    description: 'API for TS-Express',
  },
  tags: [
    {
      name: 'user',
    },
  ],
  paths: {
    ...userSwagger,
  },
  definitions: {
    // User: {
    //   type: 'object',
    //   properties: {
    //     id: {
    //       type: 'string',
    //     },
    //     name: {
    //       type: 'string',
    //     },
    //     age: {
    //       type: 'number',
    //       format: 'int64',
    //     },
    //   },
    // },
  },
}
