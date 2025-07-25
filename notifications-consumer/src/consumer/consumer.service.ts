import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { appConfig } from 'src/appConfig';
import { LineEvent } from '@Entities/LineEvent';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { convetLineEventToMessage } from './utils';

@Injectable()
export class ConsumerService implements OnModuleInit {
    private readonly kafka = new Kafka({
        clientId: 'websocket-service',
        brokers: [appConfig.KAFKA_BROKERS],
    })
    private readonly consumer = this.kafka.consumer({ groupId: 'test-group'})
    private websocketGateway: WebsocketGateway;
    
    async onModuleInit() {
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: appConfig.KAFKA_TOPICS, fromBeginning: true })
        console.log('✅ Kafka consumer connected and subscribed')

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message}) => {                
                console.log(`message arrived on topic <${topic}> with partition <${partition}> with value: <${message?.value?.toString()}>`)
          
                const data = message.value?.toString()
                
                if (data) {
                    const lineEvent = JSON.parse(data) as LineEvent
                    this.websocketGateway?.sendMessageToClients(convetLineEventToMessage(lineEvent))
                }
            }
        })
    }

    setGateway(gateway: WebsocketGateway) {
        this.websocketGateway = gateway;
    }
}