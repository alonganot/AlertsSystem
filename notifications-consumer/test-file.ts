import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-ts-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function run() {
  await producer.connect();

  // Send a message to the 'test' topic
  const result = await producer.send({
    topic: 'test',
    messages: [
      { key: 'key2', value: 'Hello hello Kafka from TypeScript!' },
    ],
  });

  console.log('Message sent successfully:', result);

  await producer.disconnect();
}

run().catch((e) => {
  console.error('Error producing message', e);
  process.exit(1);
});