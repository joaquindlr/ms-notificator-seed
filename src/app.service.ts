import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class AppService {
  constructor(private readonly kafkaService: KafkaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    await this.kafkaService.subscribe('notificator', (msg) => {
      console.log('Msg: ', msg);
    });
  }
}
