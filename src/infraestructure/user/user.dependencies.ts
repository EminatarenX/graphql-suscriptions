import { PrismaUserRepository } from "./prisma.repository";
import { UserRegister } from "../../application/user/userRegister.application";
import { UserRegisterController } from "./controllers/user.controller";
import { pubsubService } from "../services/pubsub.dependencies";
import { AuthUser } from "../../application/user/auth.application";
import { AuthUserController } from "./controllers/auth.controller";
import { BcryptService } from "../services/bcrypt.service";
import { JWTService } from "../services/jwt.service";

const userRepository = new PrismaUserRepository()
const bcryptService = new BcryptService()
const jwtService = new JWTService()
export const userRegisterUseCase = new UserRegister(userRepository, pubsubService, bcryptService)
export const userRegisterController = new UserRegisterController(userRegisterUseCase)
//auth
const userAuthUseCase = new AuthUser(userRepository, bcryptService, jwtService)
export const authUserController = new AuthUserController(userAuthUseCase)

