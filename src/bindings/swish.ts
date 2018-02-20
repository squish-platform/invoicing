const { makeExecutableSchema } = require("graphql-tools")
const { Binding } = require("graphql-binding")

const users = [
  {
    name: "Alice"
  },
  {
    name: "Bob"
  }
]

const typeDefs = `
  type Query {
    findUser(name: String!): User
  }
  type User {
    name: String!
  }
`

const resolvers = {
  Query: {
    findUser: (parent, { name }) => users.find(u => u.name === name)
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const findUserBinding = new Binding({
  schema,
  fragmentReplacements: {}
})

console.log(findUserBinding)

findUserBinding.findUser({ name: "Bob" }).then(result => console.log(result))
