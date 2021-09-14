const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    return err;
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
