import { WebhookRepository } from "./webhook.repository";
import { CreateWebhook } from "../../application/webhook/createWebhook.application";
import { CreateWebhookController } from "./controllers/createWebhook.controller";
import { JWTService } from "../services/jwt.service";
const repository = new WebhookRepository();
const jwtRepository = new JWTService();
// create use case
const createUseCase = new CreateWebhook(repository, jwtRepository);
export const createWebhookController = new CreateWebhookController(createUseCase);
// find 
import { FindWebhookByUserId } from "../../application/webhook/findByUserId.application";
import { FindWebhookByUserIdController } from "./controllers/findWebhookByUserId.controller";
const findUseCase = new FindWebhookByUserId(repository, jwtRepository);
export const findWebhookByUserIdController = new FindWebhookByUserIdController(findUseCase);

// delete
import { DeleteWebhook } from "../../application/webhook/DeleteWebhook";
import { DeleteWebhookController } from "./controllers/DeleteWebhookController";
const deletewebhookUseCase = new DeleteWebhook(repository, jwtRepository);
export const deleteWebhookController = new DeleteWebhookController(deletewebhookUseCase)

