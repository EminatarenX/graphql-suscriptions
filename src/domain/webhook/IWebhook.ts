import { Webhook } from "./Webhook.ts";

export interface IWebhook {
  create(events: string[], url: string, userId: string): Promise<Webhook | null>;
  findWebhookByUserId(userId: string): Promise<Webhook | null>;
  deleteWebhooks(webhookId: string): Promise<boolean | null>;

}
