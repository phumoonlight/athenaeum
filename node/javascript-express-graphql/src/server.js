const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    xyz: String
    friends: String
  }
`);
 
// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  xyz: () => {
    return 'new xyz'
  },
  friends: () => {
    return ['wwaaa'] 
  }
};
 
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.info('Running a GraphQL API server at http://localhost:4000/graphql')
});
