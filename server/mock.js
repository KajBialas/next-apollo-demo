const faker = require("faker");

module.exports = {
  users: Array.from(Array(2000)).map(() => ({
    name: faker.name.findName(),
    address: faker.address.streetAddress(),
    avatar: faker.image.avatar(),
    description: faker.lorem.paragraph(),
    id: faker.datatype.uuid(),
  })),
};
