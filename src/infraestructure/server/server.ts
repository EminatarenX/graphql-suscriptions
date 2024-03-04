

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer } from 'http';
import express from 'express'
import { schema as schemaService } from '../services/pubsub.dependencies';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'

export class GraphQLServer {
  private httpServer: any
  private appExpress: any
  private apolloServer: any
  private wsServer: any

  constructor() {
    this.appExpress = express()
    this.httpServer = createServer(this.appExpress)

    this.wsServer = new WebSocketServer({
      server: this.httpServer,
      path: '/graphql'
    })

    const serverCleanup = useServer({ schema: schemaService.schema() }, this.wsServer)

    this.apolloServer = new ApolloServer({
      schema: schemaService.schema(),
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose()
              }
            }
          }
        }
      ]
    })
  }

  async start() {
    await this.apolloServer.start()
    this.appExpress.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(this.apolloServer, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    }))
    this.httpServer.listen(4000, () => {
      console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    })
  }
}

