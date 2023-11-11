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

export const runCodeInDocker = (src: string, lang: string): string => {
  let keyResult = '';
  keyResult = createKeyResult();
  const createOptions = options(src, lang, keyResult);
  let stdoutData = '';

  DockerClient.createContainer(createOptions, (err, container) => {
    if (err || !container) {
      saveResultToRedis(`Erreur lors de la création du conteneur: ${err?.message}`, keyResult);
      return;
    }

    container.start((err) => {
      if (err) {
        saveResultToRedis(`Erreur lors du démarrage du conteneur: ${err?.message}`, keyResult);
        return;
      }

      container.attach({ stream: true, stdout: true, stderr: true }, (err, stream) => {
        if (err || !stream) {
          saveResultToRedis(`Erreur lors de l'attachement du conteneur: ${err?.message}`, keyResult);
          return;
        }

        stream?.on('data', (data) => {
          stdoutData += data.slice(8).toString().toString();
        });

        container.wait((err, data) => {
          if (err) {
            saveResultToRedis(`Erreur lors de l'attente du conteneur: ${err?.message}`, keyResult);
            return;
          }

          saveResultToRedis(
            {
              stderr: data?.StatusCode === 0 ? '' : stdoutData,
              stdout: data?.StatusCode === 0 ? stdoutData : '',
              code: data?.StatusCode,
            },
            keyResult,
          );

          container.remove((err) => {
            if (err) {
              saveResultToRedis(`Erreur lors de la suppression du conteneur: ${err?.message}`, keyResult);
              return;
            }
          });
        });
      });
    });
  });

  return keyResult;
};

const options = (src: string, lang: string, key: string): object => {
  switch (lang) {
    case 'python':
      return {
        Image: 'python:3.8',
        Cmd: ['python', '-c', src],
        HostConfig: HOST_CONFIG,
        name: key,
      };
    case 'javascript':
      return {
        Image: 'node:18',
        Cmd: ['node', '-e', src],
        HostConfig: HOST_CONFIG,
        name: key,
      };
    case 'c':
      return {
        Image: 'frolvlad/alpine-gxx',
        Cmd: ['sh', '-c', `echo "${src.replace(/"/g, '\\"')}" > main.c && gcc -o main main.c && ./main`],
        HostConfig: HOST_CONFIG,
        name: key,
      };
    case 'cpp':
      return {
        Image: 'frolvlad/alpine-gxx',
        Cmd: ['sh', '-c', `echo "${src.replace(/"/g, '\\"')}" > main.cpp && g++ -o main main.cpp && ./main`],
        HostConfig: HOST_CONFIG,
        name: key,
      };
    default:
      throw new Error('Langage non supporté');
  }
};

const saveResultToRedis = (value: ICodeResult | string, key: string): void => {
  if (typeof value === 'string') {
    value = {
      stdout: '',
      stderr: value,
      code: 1,
    };
  }
  RedisClient.setEx(key, 86400, JSON.stringify(value));
};

const createKeyResult = (): string => {
  return randomBytes(16).toString('hex');
};
