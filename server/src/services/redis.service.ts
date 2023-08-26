import { createClient } from 'redis';

export class RedisService {
  private readonly client = createClient();
  private readonly TTL = 86400;

  constructor() {
    this.client.connect();
  }

  public saveResult(key: string, value: string): void {
    this.client.setEx(key, this.TTL, JSON.stringify(value));
  }

  public getResult(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}
