import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { appConfig } from 'src/appConfig';
import { LineEvent } from '@Entities/LineEvent';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { convetLineEventToMessage, getfilterClientsFunction } from './utils';
import { NotificationTypesService } from 'src/notificationTypes/notificationTypes.Service';

@Injectable()
export class ConsumerService implements OnModuleInit {
    private readonly kafka = new Kafka({
        clientId: 'websocket-service',
        brokers: [appConfig.KAFKA_BROKERS],
    })
    private readonly consumer = this.kafka.consumer({ groupId: 'test-group'})
    private websocketGateway: WebsocketGateway
    private notificationTypeService: NotificationTypesService
    
    async onModuleInit() {
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: appConfig.KAFKA_TOPICS, fromBeginning: true })
        console.log('✅ Kafka consumer connected and subscribed')

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message}) => {                
                console.log(`message arrived on topic <${topic}> with partition <${partition}> with value: <${message?.value?.toString()}>`)
          
                const data = message.value?.toString()
                
                if (data && message.key) {
                    const notificationTypeId = Number(message.key.toString)
                    const lineEvent = JSON.parse(data) as LineEvent
                    const notificationType = await this.notificationTypeService.getNotificationTypeById(notificationTypeId)

                    this.websocketGateway?.sendMessageToClients(
                        convetLineEventToMessage(lineEvent, notificationType),
                        getfilterClientsFunction(lineEvent, notificationType)
                    )
                }
            }
        })
    }

    setGateway(gateway: WebsocketGateway) {
        this.websocketGateway = gateway;
    }
}