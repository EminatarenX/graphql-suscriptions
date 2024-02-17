import { SchemaGraphql } from "../server/schema";
import { PubSubService } from "./pubsubService";
import { pubSub } from "../server/schema";

export const pubsubService = pubSub
export const schema = new SchemaGraphql(pubsubService)