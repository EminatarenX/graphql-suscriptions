import { PrismaUserRepository } from "./prisma.repository";
import { UserRegister } from "../../application/user/userRegister.application";
import { UserRegisterController } from "./controllers/user.controller";
import { pubsubService } from "../services/pubsub.dependencies";

const userRepository = new PrismaUserRepository()
export const userRegisterUseCase = new UserRegister(userRepository, pubsubService)
export const userRegisterController = new UserRegisterController(userRegisterUseCase)