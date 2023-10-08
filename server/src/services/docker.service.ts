import { randomBytes } from 'crypto';
import { ICodeResult } from '../models/code.model';
import { DockerClient } from '../index';
import { RedisClient } from '../index';

const HOST_CONFIG = {
  Memory: 150 * 1024 * 1024, // Limite la mémoire à 512 Mo
  MemorySwap: -1, // Désactive le memory swap
  NanoCPUs: 1000000000, // Limite à 1 cœurs de CPU
  PidsLimit: 10, // Limite à 10 processus
};

let keyResult = '';

export const runCodeInDocker = (src: string, lang: string): string => {
  const createOptions = options(src, lang);
  let stdoutData = '';
  keyResult = createKeyResult();

  console.log(
    '========================================= Création du conteneur =========================================',
  );
  DockerClient.createContainer(createOptions, (err, container) => {
    if (err || !container) {
      saveResultToRedis('Erreur lors de la création du conteneur');
      return;
    }

    container.start((err) => {
      if (err) {
        saveResultToRedis('Erreur lors du démarrage du conteneur');
        return;
      }

      container.attach({ stream: true, stdout: true, stderr: true }, (err, stream) => {
        if (err || !stream) {
          saveResultToRedis("Erreur lors de l'attachement du conteneur");
          return;
        }

        // stream?.on('data', (data) => {
        //   stdoutData = data && data.slice(8).toString();
        // });
        // Add \n to stdout if multiple lines
        stream?.on('data', (data) => {
          stdoutData += data.slice(8).toString().toString();
        });

        container.wait((err, data) => {
          if (err) {
            saveResultToRedis("Erreur lors de l'exécution du conteneur");
            return;
          }

          saveResultToRedis({
            stderr: data?.StatusCode === 0 ? '' : stdoutData,
            stdout: data?.StatusCode === 0 ? stdoutData : '',
            code: data?.StatusCode,
          });

          container.remove((err) => {
            if (err) {
              saveResultToRedis('Erreur lors de la suppression du conteneur');
              return;
            }
          });
        });
      });
    });
  });

  return keyResult;
};

const options = (src: string, lang: string): object => {
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
        Image: 'frolvlad/alpine-gxx',
        Cmd: ['sh', '-c', `echo "${src.replace(/"/g, '\\"')}" > main.c && gcc -o main main.c && ./main`],
        HostConfig: HOST_CONFIG,
      };
    case 'cpp':
      return {
        Image: 'frolvlad/alpine-gxx',
        Cmd: ['sh', '-c', `echo "${src.replace(/"/g, '\\"')}" > main.cpp && g++ -o main main.cpp && ./main`],
        HostConfig: HOST_CONFIG,
      };
    default:
      throw new Error('Langage non supporté');
  }
};

const saveResultToRedis = (value: ICodeResult | string): void => {
  if (typeof value === 'string') {
    value = {
      stdout: '',
      stderr: value,
      code: 1,
    };
  }
  RedisClient.setEx(keyResult, 86400, JSON.stringify(value));
};

const createKeyResult = (): string => {
  return randomBytes(16).toString('hex');
};
