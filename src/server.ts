import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => 'HackerNews Clone',
    feed: (parent, args, context) => context.prisma.link.findMany(),
  },
  Mutation: {
    post: async (parent, args, context) => {
      const link = await context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      })
      return link
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('src/schema.graphql', 'utf8'),
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    prisma,
  }),
})

console.log(`Server is running on ${url}`)