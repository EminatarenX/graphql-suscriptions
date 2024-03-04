import { PrismaUserRepository } from "./prisma.repository";
import { UserRegister } from "../../application/user/userRegister.application";
import { UserRegisterController } from "./controllers/user.controller";
import { pubsubService } from "../services/pubsub.dependencies";
import { AuthUser } from "../../application/user/auth.application";
import { AuthUserController } from "./controllers/auth.controller";
import { BcryptService } from "../services/bcrypt.service";
import { JWTService } from "../services/jwt.service";
import { GetUserProfile } from "../../application/user/get_user_profile.application";
import { AxiosService } from "../services/axios.service";
import { GetUserProfileController } from "./controllers/getProfile.controller";
import { WebhookRepository } from "../webhook/webhook.repository";
import { FindUsers } from "../../application/user/findUsers";
import { FindUsersController } from "./controllers/getUsers.controller";

const userRepository = new PrismaUserRepository()
const bcryptService = new BcryptService()
const jwtService = new JWTService()
const axiosService = new AxiosService()
const webhookRepository = new WebhookRepository()
export const userRegisterUseCase = new UserRegister(userRepository, pubsubService, bcryptService)
export const userRegisterController = new UserRegisterController(userRegisterUseCase)
//auth
const userAuthUseCase = new AuthUser(userRepository, bcryptService, jwtService)
export const authUserController = new AuthUserController(userAuthUseCase)
// Profile
const getUserProfileUseCase = new GetUserProfile(userRepository, jwtService, axiosService, webhookRepository)
export const getUserProfileController = new GetUserProfileController(getUserProfileUseCase)

const findUserLimitUseCase = new FindUsers(userRepository)
export const findUsersLimitController = new FindUsersController(findUserLimitUseCase)
