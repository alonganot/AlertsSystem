import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { appConfig } from "src/appConfig";
import { LineEvent } from "@Entities/LineEvent";

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private isProducerConnected: boolean;
  private reconnectInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.kafka = new Kafka({
      clientId: "server-producer",
      brokers: [appConfig.KAFKA_BROKERS],
    });

    this.producer = this.kafka.producer();
  }

  private async connectProducer() {
    try {
      await this.producer.connect();
      this.isProducerConnected = true;
      console.log("✅ Kafka Producer Connected");

      if (this.reconnectInterval) {
        clearInterval(this.reconnectInterval);
        this.reconnectInterval = null;
      }
    } catch (_) {
      this.isProducerConnected = false;
      console.error("❌ Kafka Producer connection failed");

      if (!this.reconnectInterval) {
        this.reconnectInterval = setInterval(() => {
          console.log("🔁 Retrying Kafka connection...");
          this.connectProducer();
        }, 60000);
      }
    }
  }

  async onModuleInit() {
    this.connectProducer();
  }

  async onModuleDestroy() {
    if (this.isProducerConnected) {
      await this.producer.disconnect();
      console.log("Kafka Producer Disconnected");
    }
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
    }
  }

  async sendMessage(topic: string, message: LineEvent) {
    if (this.isProducerConnected) {
      try {
        await this.producer.send({
          topic,
          messages: [
            {
              key: message.status,
              value: JSON.stringify(message),
            },
          ],
        });
      } catch (_) {
        console.error("❌ Failed to send Kafka message");
        this.isProducerConnected = false;
        this.connectProducer();
      }
    }
  }
}
