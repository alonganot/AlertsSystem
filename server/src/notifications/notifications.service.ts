import { Injectable } from "@nestjs/common";
import { KafkaProducer } from "src/kafka/kafka.producer";

@Injectable()
export class NotificationsService {
  constructor(private readonly kafkaService: KafkaProducer) {}

  subscribeEvent() {
    return this.kafkaService.send("gf", {});
  }
}
