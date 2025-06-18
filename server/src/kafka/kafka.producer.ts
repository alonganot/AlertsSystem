import { Injectable } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { appConfig } from "src/appConfig";

@Injectable()
export class KafkaProducer {
  private producer: Producer;
  constructor() {
    this.producer = new Kafka({
      brokers: [appConfig.KAFKA_BROKERS],
    }).producer(); //TODO: need to deploy kafka
    this.producer.connect();
  }

  send(topic: string, msg: any) {
    return this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(msg) }],
    });
  }
}
