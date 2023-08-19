require('dotenv').config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const cors = require('cors');


// Import other type definitions and resolvers as needed
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs, // Remove the Food type from the typeDefs array
  resolvers,
  context: authMiddleware, // Use the predefined authMiddleware for user authentication
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// This will allow any domain to make requests. 
// You might want to restrict this in production using corsOptions as described previously.
app.use(cors());


// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Call the async function to start the server
startApolloServer();
