import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { appConfig } from "src/appConfig";
import { LineEvent } from "@Entities/LineEvent";

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka
  private producer: Producer

  constructor() {
    this.kafka = new Kafka({
      clientId: 'server-producer',
      brokers: [appConfig.KAFKA_BROKERS]
    })

    this.producer = this.kafka.producer()
  }
  
  async onModuleInit() {
    await this.producer.connect()
    console.log('Kafka Producer Connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect()
    console.log('Kafka Producer Disconnected')
  }

  async sendMessage(topic: string, message: LineEvent) {
    await this.producer.send({
      topic,
      messages: [
        {
          key: message.status,
          value: JSON.stringify(message)
        }
      ]
    })
  }
}
