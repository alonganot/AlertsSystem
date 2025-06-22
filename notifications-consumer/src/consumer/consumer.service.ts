import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class ConsumerService implements OnModuleInit {
    private readonly kafka = new Kafka({
        clientId: 'websocket-service',
        brokers: ['localhost:9092'],
    })
    private readonly consumer = this.kafka.consumer({ groupId: 'test-group'})
    private websocketGateway: WebsocketGateway;
    
    async onModuleInit() {
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: 'test', fromBeginning: true })
        console.log('✅ Kafka consumer connected and subscribed')

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    value: message.value?.toString(),
                })
          
                const data = message.value?.toString()
                if (data) {
                    this.websocketGateway?.sendMessageToClients(data)
                }
            }
        })
    }

    setGateway(gateway: WebsocketGateway) {
        this.websocketGateway = gateway;
    }
}