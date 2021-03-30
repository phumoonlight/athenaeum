export const userSwagger = {
  '/users': {
    get: {
      tags: ['user'],
      summary: 'get users',
      responses: {
        '200': {
          description: 'OK',
        },
      },
    },
    post: {
      tags: ['user'],
      summary: 'create users',
      responses: {
        '200': {
          description: 'OK',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'create user',
          required: true,
        },
      ],
    },
  },
  '/users/{id}': {
    get: {
      tags: ['user'],
      summary: 'get users by id',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'user id',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'OK',
        },
      },
    },
  }
}
