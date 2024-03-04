import { PrismaClient } from '@prisma/client';
import { Webhook } from '../../domain/webhook/Webhook';
import { IWebhook } from '../../domain/webhook/IWebhook';

export class WebhookRepository implements IWebhook {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }
  async create(events: string[], url: string, userId: string): Promise<Webhook | null> {
    const parsedEvents = JSON.stringify(events)
    const existingWebhook = await this.db.webhook.findFirst({
      where: {
        userId
      }
    })
    if (existingWebhook) {
      await this.db.webhook.update({
        where: {
          id: existingWebhook.id
        },
        data: {
          events: parsedEvents,
          url
        }
      })

      return new Webhook(
        existingWebhook.id,
        url,
        events,
        userId
      )
    }
    const webhook = await this.db.webhook.create({
      data: {
        events: parsedEvents,
        url,
        userId
      }
    })

    return new Webhook(
      webhook.id,
      webhook.url,
      JSON.parse(webhook.events),
      webhook.userId
    )
  }

  async findWebhookByUserId(userId: string): Promise<Webhook | null> {
    const webhook = await this.db.webhook.findFirst({
      where: {
        userId
      }
    })

    if (!webhook) {
      throw new Error('Webhook not found')
    }

    return new Webhook(
      webhook.id,
      webhook.url,
      JSON.parse(webhook.events),
      webhook.userId
    )
  }

  async deleteWebhooks(userId: string): Promise<boolean | null> {
    try {
      const exist = await this.db.webhook.findFirst({
        where: {
          userId
        }
      })
      if (!exist) throw new Error('this webhook does not exit')

      await this.db.webhook.delete({
        where: {
          id: exist.id
        }
      })


      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
