import { GraphQLServer } from "./src/infraestructure/server/server";

(async () => {
  const server = new GraphQLServer()
  await server.start()

})()

