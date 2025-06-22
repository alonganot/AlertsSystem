import { Kafka } from 'kafkajs'
import * as WebSocket from 'ws'

// Create Kafka client
const kafka = new Kafka({
  clientId: 'my-ts-consumer',
  brokers: ['localhost:9092'], // your Kafka broker
});

// Create a consumer instance
const consumer = kafka.consumer({ groupId: 'test-group' })

const wss = new WebSocket.Server({ port: 8080 })

async function run() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test', fromBeginning: true })

  console.log('✅ Kafka consumer connected and subscribed')

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })

      const data = message.value?.toString()
      console.log(wss.clients)
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && data) {
          client.send(data);
        }
      })
    }
  })
}

wss.on('connection', ws => {
    console.log('Client connected via WebSocket')
})

run().catch((e) => {
  console.error('❌ Error in consumer:', e)
  process.exit(1)
});