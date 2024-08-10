import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import fs from 'fs'

const links = [
  {
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com',
  },
]

const resolvers = {
  Query: {
    info: () => 'HackerNews Clone',
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${links.length}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('src/schema.graphql', 'utf8'),
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀 Server ready at ${url}`)
