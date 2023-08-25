import { randomBytes } from 'crypto';
import Dockerode from 'dockerode';

export class CodeRunner {
  docker: Dockerode;
  keyResult: string;

  constructor() {
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

            this.saveResultToRedis(stdoutData + '\n' + data.StatusCode + '\n' + data.Error);

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

  private saveResultToRedis(value: string): void {
    console.log('Save result to redis', value);
  }

  private options(src: string, lang: string): object {
    switch (lang) {
      case 'python':
        return {
          Image: 'python:3.8',
          Cmd: ['python', '-c', src],
        };
      case 'javascript':
        return {
          Image: 'node:14',
          Cmd: ['node', '-e', src],
        };
      default:
        throw new Error('Langage non supporté');
    }
  }

  private createKeyResult(): string {
    return randomBytes(16).toString('hex');
  }
}
