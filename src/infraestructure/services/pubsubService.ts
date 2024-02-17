import { PubSub } from "graphql-subscriptions";
import { IPubsubService } from "../../domain/graphql/IPubsub.repository";
export class PubSubService implements IPubsubService {
    public pubsub: any

    constructor(){
        this.pubsub = new PubSub()
    }
    publish(event: string, args: any) {
        this.pubsub.publish(event, {...args})
    }   
    asyncIterator(event: string) {
        return this.pubsub.asyncIterator([event])
    }
}