import fs from 'fs';
import { runCodeInDocker } from './docker.service';
import { ITestCase } from '../models/problem.model';

const BASE_PATH = './src/testcode';

export const testCode = async (src: string, lang: string, testCases: ITestCase[], callResult: string): Promise<string> => {

  const codeParsedForTest = parseCodeForTest(src, lang, testCases, callResult);
  
  return runCodeInDocker(codeParsedForTest, lang);
};

const parseCodeForTest = (src: string, lang: string, testCases: ITestCase[], callResult: string): string => {
  switch (lang) {
    case 'javascript':
      return parseForJavascript(src, testCases, callResult);
    case 'python':
      return parseForPython(src, testCases, callResult);
    default:
      return '';
  }
}

const parseForJavascript = (src: string, testCases: ITestCase[], callResult: string): string => {
  let code = '';
  try {
    const data = fs.readFileSync(`${BASE_PATH}/javascript.js`, 'utf8');

    code = data.replace('FUNCTION', src);
    code = code.replace('TEST_CASES', `testCases = ${JSON.stringify(testCases)};`);
    code = code.replace('CALL_FUNCTION', callResult);

  } catch (err) {
    console.error("Erreur de lecture du fichier d'entrée:", err);
  }
  
  return code;
}

const parseForPython = (src: string, testCases: ITestCase[], callResult: string): string => {
  let code = '';
  try {
    const data = fs.readFileSync(`${BASE_PATH}/python.py`, 'utf8');

    code = data.replace('FUNCTION', src);
    code = code.replace('TEST_CASES', `testCases = ${JSON.stringify(testCases)};`);
    code = code.replace('CALL_FUNCTION', callResult);

  } catch (err) {
    console.error("Erreur de lecture du fichier d'entrée:", err);
  }
  
  return code;
}
