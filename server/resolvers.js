const faker = require("faker");
const { users } = require("./mock");

const resolvers = {
  Query: {
    name: () => faker.name.findName(),
    details: (_, { offset, limit, search }) =>
      users
        .filter((user) =>
          user.name?.toLowerCase().includes(search?.toLowerCase() || "")
        )
        .filter(
          (user, index) => index >= offset && index < offset + (limit || 10)
        ),
  },
};

module.exports = {
  resolvers,
};
