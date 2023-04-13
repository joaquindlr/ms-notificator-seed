import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka = new Kafka({
    clientId: 'ecommerce-seed',
    brokers: ['localhost:9092'],
  });
  async subscribe(topic: string, callback: any) {
    const consumer = this.kafka.consumer({ groupId: 'ecommerce-seed' });
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({ topic, partition, message });
        callback(message.value.toString());
      },
    });
  }
}
