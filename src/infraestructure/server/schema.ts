import { makeExecutableSchema } from "@graphql-tools/schema";
// import { PubSub } from 'graphql-subscriptions';
import { PubSubService } from "../services/pubsubService";
import { authUserController, findUsersLimitController, getUserProfileController, userRegisterController } from "../user/user.dependencies";
import { IPubsubService } from "../../domain/graphql/IPubsub.repository";
import { PubSub } from "graphql-subscriptions";
import { createPostController, getFeedController, getPostByIdController } from "../post/post.dependencies";
import { getLikesByPostIdController, likePostController } from "../like/like.dependencies";
import { commentPostController, deleteCommentController, getCommentsByPostIdController } from "../comment/comment.dependencies";
import { createWebhookController, deleteWebhookController, findWebhookByUserIdController } from "../webhook/webhook.dependencies";

export const pubSub = new PubSub()

export class SchemaGraphql {
  constructor(
    private readonly pubsubService: any
  ) { }

  schema() {

    return makeExecutableSchema({
      typeDefs: `
                type User {
                    email: String!
                    password: String!
                    token: String
                    webhook: String
                    posts: [Post]
                }
                type Webhook {
                  id: String,
                  events: [String]
                  url: String
                  userId: String
                }

                type Post {
                    id: ID!
                    body: String!
                    userId: String!
                    createdAt: String!
                    updatedAt: String!
                    likes: [Like]
                    comments: [Comment]

}
                type Like {
                  id: ID!
                  userId: String! 
                  postId: String!
                  createdAt: String!
                  updatedAt: String!
}
                type Comment {
                id: ID!
                body: String!
                userId: String! 
                postId: String!
                createdAt: String!
}
                interface MutationResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  post: Post
                }

                interface MutationLikeResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  like: Like
                }

                interface MutationCreateCommentResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  comment: Comment
                }

                type commentPostMutationResponse implements MutationCreateCommentResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  comment: Comment
                }

                type createLikeMutationResponse implements MutationLikeResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  like: Like
                }
                

                type createPostMutationResponse implements MutationResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  post: Post
                }

                type UserRegisterResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  user: User
                }

                type WebhookResponse {
                  code: String!
                  success: Boolean!
                  message: String!
                  webhook: Webhook
                }

                
                
        
                type Mutation {
                    userRegister(email: String, password: String, webhook: String): UserRegisterResponse
                    auth(email: String, password: String): UserRegisterResponse
                    createPost(content: String): createPostMutationResponse
                    likePost(postId: String): createLikeMutationResponse
                    commentPost(body: String, postId: String): commentPostMutationResponse
                    createWebhook(events: [String], url: String): WebhookResponse
                    deleteWebhook: WebhookResponse
                    deleteComment(id: String): commentPostMutationResponse
                }
                type postWithLikesAndComments {
                  post: Post
                  likes: [Like]
                  comments: [Comment]
                }
                interface getFeedInterface{
                  code: String!
                  success: Boolean!
                  message: String!
                  feed: [postWithLikesAndComments]
                  
                }       
                type getFeedResponse implements getFeedInterface{
                  code: String!
                  success: Boolean!
                  message: String!
                  feed: [postWithLikesAndComments]
                }
                

                type getPost {
                  code: String!
                  success: Boolean!
                  message: String!
                  post: Post
                }
                
                type getCommentsResponse{
                  code: Int!
                  success: Boolean!
                  message: String!
                  comments: [Comment]
                }
                type GetUser {
                  code: String!
                  success: Boolean!
                  message: String!
                  user: User
                }

                type getLikesByPostIdResponse {
                  code: Int!
                  success: Boolean!
                  message: String!
                  likes: [Like]
}
                
                type Query {
                    getPosts: getFeedResponse
                    getPost(id: String): getPost
                    getUserProfile(userId: String): GetUser
                    getCommentsByPostId(postId: String): getCommentsResponse
                    getLikesByPostId(postId: String): getLikesByPostIdResponse
                    findWebhookByUserId: WebhookResponse
                    findUsersPage(page: Int): [User]
                    findLikesPage(postId: String, page: Int): [Like]
                }

              
        
                type Subscription {
                    newUser: User
                    newPost: Post
                }
            `,
      resolvers: [
        {
          Query: {
            getPosts: getFeedController.run.bind(getFeedController),
            getPost: getPostByIdController.run.bind(getPostByIdController),
            getUserProfile: getUserProfileController.run.bind(getUserProfileController),
            getCommentsByPostId: getCommentsByPostIdController.run.bind(getCommentsByPostIdController),
            getLikesByPostId: getLikesByPostIdController.run.bind(getLikesByPostIdController),
            findWebhookByUserId: findWebhookByUserIdController.run.bind(findWebhookByUserIdController),
            findUsersPage: findUsersLimitController.run.bind(findUsersLimitController),
            findLikesPage: getLikesByPostIdController.run.bind(getLikesByPostIdController)
          },
          Mutation: {
            userRegister: userRegisterController.run.bind(userRegisterController),
            auth: authUserController.run.bind(authUserController),
            createPost: createPostController.run.bind(createPostController),
            likePost: likePostController.run.bind(likePostController),
            commentPost: commentPostController.run.bind(commentPostController),
            createWebhook: createWebhookController.run.bind(createWebhookController),
            deleteWebhook: deleteWebhookController.run.bind(deleteWebhookController),
            deleteComment: deleteCommentController.run.bind(deleteCommentController),
          },

          Subscription: {
            newUser: {
              subscribe: () => this.pubsubService.asyncIterator('NEW_USER'),
              resolve: (payload: any) => payload
            },
            newPost: {
              subscribe: () => this.pubsubService.asyncIterator("NEW_POST"),
              resolve: (payload: any) => payload
            }


          }
        }
      ]
    })
  }
}

