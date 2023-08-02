const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Your GraphQL schema will go here
const schema = buildSchema(`
  # Define your types, queries, and mutations here
`);

// Your resolvers will go here
const root = {
  // Define your resolver functions here
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enables GraphiQL for testing your API in the browser
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
