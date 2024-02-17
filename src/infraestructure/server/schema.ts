import { makeExecutableSchema } from "@graphql-tools/schema";
// import { PubSub } from 'graphql-subscriptions';
import { PubSubService } from "../services/pubsubService";
import { userRegisterController } from "../user/user.dependencies";
import { IPubsubService } from "../../domain/graphql/IPubsub.repository";
import { PubSub } from "graphql-subscriptions";

export const pubSub = new PubSub()

export class SchemaGraphql {
    constructor(
        private readonly pubsubService: any
    ){}

    schema(){
        
        return makeExecutableSchema({
            typeDefs: `
                type User {
                    email: String!
                    password: String!
                }
        
                type Mutation {
                    userRegister(email: String, password: String): User
                }
        
                type Query {
                    foo: String
                }
        
                type Subscription {
                    newUser: User
                }
            `,
            resolvers: [
                {
                    Query: {
                        foo: () => "hello world"
                    },
                    Mutation: {
                        userRegister: userRegisterController.run.bind(userRegisterController)
                    },
                    Subscription: {
                        newUser: {
                            subscribe: () => this.pubsubService.asyncIterator('NEW_USER'),
                            resolve: (payload) => payload
                        }
                    }
                }
            ]
        })
    }
}

