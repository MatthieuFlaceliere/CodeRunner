import amqp, { Channel, AmqpConnectionManager } from 'amqp-connection-manager';
import Code from '../models/code.model';

export class RabbitMQService {
  private static instance: RabbitMQService;
  private channel: Channel;
  private connection: AmqpConnectionManager;
  private queue: string = process.env.RABBITMQ_QUEUE ?? 'code_queue';

  private constructor() {
    // Create connection
    this.connection = amqp.connect([process.env.RABBITMQ_URL], {
      connectionOptions: { clientProperties: { connection_name: 'server' } },
    });

    this.connection.on('connect', () => {
      console.log('Connected to RabbitMQ');
    });

    this.connection.on('disconnect', (err) => {
      console.log('Disconnected from RabbitMQ', err);
    });

    // Create channel
    this.channel = this.connection.createChannel({
      json: true,
      setup: async (channel: Channel) => {
        await channel.assertQueue(this.queue, { durable: true });
      },
    });
  }

  public static getInstance(): RabbitMQService {
    if (!RabbitMQService.instance) {
      RabbitMQService.instance = new RabbitMQService();
    }

    return RabbitMQService.instance;
  }

  public sendCodeToQueue(code: Code): void {
    this.channel.sendToQueue(this.queue, code);
  }

  private initConection(): void {
    this.connection = amqp.connect([process.env.RABBITMQ_URL]);
  }
}
