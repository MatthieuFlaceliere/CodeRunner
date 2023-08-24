import amqp, { Channel, AmqpConnectionManager } from 'amqp-connection-manager';
import dotenv from 'dotenv';
import fs from 'fs';
import Code from './models/code.model';
import { exec } from 'child_process';

dotenv.config();

class RabbitMQService {
  private static instance: RabbitMQService;
  private channel: Channel;
  private connection: AmqpConnectionManager;
  private queue: string = process.env.RABBITMQ_QUEUE ?? 'code_queue';

  private constructor() {
    // Create connection
    this.connection = amqp.connect([process.env.RABBITMQ_URL], {
      connectionOptions: { clientProperties: { connection_name: 'python-runner' } },
    });

    this.connection.on('connect', () => {
      console.log('Connected to RabbitMQ');
    });

    this.connection.on('disconnect', (err) => {
      console.log('Disconnected from RabbitMQ', err);
    });

    // Create channel
    this.channel = this.connection.createChannel();
    this.channel.assertQueue(this.queue, { durable: true });
  }

  public static getInstance(): RabbitMQService {
    if (!RabbitMQService.instance) {
      RabbitMQService.instance = new RabbitMQService();
    }

    return RabbitMQService.instance;
  }

  public consume(): void {
    this.channel.consume(this.queue, async (msg: any) => {
      const data: Code = JSON.parse(msg.content.toString());

      // Create code file
      fs.writeFileSync('./code.py', data.src);

      // Run code
      exec('python code.py', (err, stdout, stderr) => {
        if (err) {
          console.log(err.message);
          console.log(stderr);
        } else {
          console.log(stdout);
        }
        fs.unlinkSync('./code.py');
      });

      this.channel.ack(msg);
    });
  }
}

const rabbitMQService = RabbitMQService.getInstance();
rabbitMQService.consume();
