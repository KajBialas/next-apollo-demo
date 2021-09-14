const { gql } = require("apollo-server");

const typeDefs = gql`
  type Detail {
    name: String!
    address: String!
    avatar: String!
    description: String!
    id: String!
  }
  type Query {
    name: String!
    details(offset: Int, limit: Int, search: String): [Detail]
  }
`;

module.exports = {
  typeDefs,
};
