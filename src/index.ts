import { join } from "path"
import { GraphQLServer, PubSub } from "graphql-yoga"

import resolvers from "./resolvers"
;(async () => {
  const db = require("knex")(require("../knexfile"))

  await db.migrate.latest({ directory: join(__dirname, "../migrations") })

  const pubsub = new PubSub()
  const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: req => ({
      ...req,
      pubsub,
      db
    })
  })

  server.start(() => console.log(`Server is running on http://localhost:4000`))
})()
