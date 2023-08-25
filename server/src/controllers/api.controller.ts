import { Request, Response } from 'express';
import Dockernode from 'dockerode';
import { successResponse } from '../services/response.service';

export const runCode = (req: Request, res: Response): void => {
  const { src, lang } = req.body;

  const docker = new Dockernode();

  const createOptions = {
    Image: 'python:3.8',
    Cmd: ['python', '-c', src],
  };

  let stdoutData = '';
  let error = '';

  docker.createContainer(createOptions, (err, container) => {
    if (err || !container) {
      error = 'Erreur lors de la création du conteneur';
      // CALL REDIS TO SAVE ERROR
      return;
    }

    container.start((err) => {
      if (err) {
        error = 'Erreur lors du démarrage du conteneur';
        return;
      }

      container.attach({ stream: true, stdout: true, stderr: true }, function (err, stream) {
        stream?.on('data', (data) => {
          stdoutData = data && data.slice(8).toString();
        });

        container.wait((err, data) => {
          if (err) {
            error = "Erreur lors de l'attente du conteneur";
            return;
          }

          console.log('Conteneur terminé :', data);
          console.log('Conteneur terminé :', stdoutData);

          container.remove((err) => {
            if (err) {
              error = 'Erreur lors de la suppression du conteneur';
              return;
            }
          });
        });
      });
    });
  });

  const url = `${req.protocol}://${req.get('host')}/api/code/result`;
  res.status(202).send(successResponse(url));
};

export const getCodeResult = async (req: Request, res: Response): Promise<void> => {
  res.send('Code result...');
};

export default {
  runCode,
  getCodeResult,
};
