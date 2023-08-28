import { randomBytes } from 'crypto';
import Dockerode from 'dockerode';
import { RedisService } from './redis.service';
import { CodeResult } from '../models/code.model';
import { captureRejectionSymbol } from 'events';

const HOST_CONFIG = {
  Memory: 150 * 1024 * 1024, // Limite la mémoire à 512 Mo
  MemorySwap: -1, // Désactive le memory swap
  NanoCPUs: 1000000000, // Limite à 1 cœurs de CPU
  PidsLimit: 10, // Limite à 10 processus
};

export class CodeRunner {
  docker: Dockerode;
  keyResult: string;

  constructor(private readonly redisService = new RedisService()) {
    this.docker = new Dockerode();
    this.keyResult = this.createKeyResult();
  }

  /**
   * Run code in a docker container
   * @param src Code to run
   * @param lang Language of the code
   * @returns Key to get the result
   * @throws Error if language is not supported
   */
  public runCode(src: string, lang: string): string {
    const createOptions = this.options(src, lang);

    let stdoutData = '';

    this.docker.createContainer(createOptions, (err, container) => {
      if (err || !container) {
        this.saveResultToRedis('Erreur lors de la création du conteneur');
        return;
      }

      container.start((err) => {
        if (err) {
          this.saveResultToRedis('Erreur lors du démarrage du conteneur');
          return;
        }

        container.attach({ stream: true, stdout: true, stderr: true }, (err, stream) => {
          if (err || !stream) {
            this.saveResultToRedis("Erreur lors de l'attachement du conteneur");
            return;
          }

          stream?.on('data', (data) => {
            stdoutData = data && data.slice(8).toString();
          });

          container.wait((err, data) => {
            if (err) {
              this.saveResultToRedis("Erreur lors de l'exécution du conteneur");
              return;
            }

            this.saveResultToRedis({
              stderr: data?.StatusCode === 0 ? '' : stdoutData,
              stdout: data?.StatusCode === 0 ? stdoutData : '',
              code: data?.StatusCode,
            });

            container.remove((err) => {
              if (err) {
                this.saveResultToRedis('Erreur lors de la suppression du conteneur');
                return;
              }
            });
          });
        });
      });
    });

    return this.keyResult;
  }

  private saveResultToRedis(value: CodeResult | string): void {
    if (typeof value === 'string') {
      value = {
        stdout: '',
        stderr: value,
        code: 1,
      };
    }
    this.redisService.saveResult(this.keyResult, value);
  }

  private options(src: string, lang: string): object {
    switch (lang) {
      case 'python':
        return {
          Image: 'python:3.8',
          Cmd: ['python', '-c', src],
          HostConfig: HOST_CONFIG,
        };
      case 'javascript':
        return {
          Image: 'node:18',
          Cmd: ['node', '-e', src],
          HostConfig: HOST_CONFIG,
        };
      case 'c':
        return {
          Image: 'gcc:10',
          Cmd: ['bash', '-c', `echo "${src.replace(/"/g, '\\"')}" > main.c && gcc -o main main.c && ./main`],
          HostConfig: HOST_CONFIG,
        };
      case 'cpp':
        return {
          Image: 'gcc:10',
          Cmd: ['bash', '-c', `echo "${src.replace(/"/g, '\\"')}" > main.cpp && gcc -o main main.cpp && ./main`],
          HostConfig: HOST_CONFIG,
        };
      default:
        throw new Error('Langage non supporté');
    }
  }

  private createKeyResult(): string {
    return randomBytes(16).toString('hex');
  }
}
